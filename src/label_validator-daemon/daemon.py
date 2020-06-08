from Tsan import Tsan
import json
from pprint import pprint
import copy
from numpy import dot
from numpy.linalg import norm
import numpy as np
from PIL import Image
from bson import ObjectId
import pandas as pd
import cv2
import psi_daemon

def cos_sim(A, B):
    return dot(A, B)/(norm(A)*norm(B))

def softmax(a) :
    exp_a = np.exp(a)
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y

def mean(dddd):
    removed = []
    lst = []
    mean_x = np.mean(dddd)
    for idx, x in enumerate(dddd):
        if abs((mean_x - x)/mean_x) >= 0.3:
            removed.append(idx)
        else:
            lst.append(x)
    return np.mean(dddd), removed

tsan = Tsan()
files = []
labels = []

def toDF(inp):
    keys = inp[0].keys()
    oup = {}
    for k in keys:
        oup[k] = []
    for row in inp:
        for k in keys:
            oup[k].append(row[k])
    return pd.DataFrame.from_dict(oup)


def text_select(request):
    pass

def image_choice(request):
    global labels
    # request['category']
    # request['idx']
    # request['state']
    # request['isRewarded']
    print(request)
    assigned = tsan.assigned_dataset(request)
    dataset = [str(x) for x in assigned['dataset']]

    users = [x['username'] for x in labels]
    rels_user = [x['reliability'] for x in labels]
    rels = softmax(np.array(rels_user))

    answers = {}
    for prob in dataset:
        print(prob)
        user_labels = []
        users_data = [label['dataset'] for label in labels]
        for user_data in users_data:
            for user_label in user_data:
                if user_label['data'] == ObjectId(prob):
                    user_labels.append(user_label.get("label", None))
        user_labels = np.array(user_labels)
        cand0 = rels[user_labels == '0']
        cand1 = rels[user_labels == '1']
        none = user_labels == None

        cr0 = sum(cand0)
        cr1 = sum(cand1)

        win = '0'
        loose = '1'
        wr = cr0
        if cr0 < cr1:
            wr = cr1
            win, loose = loose, win
        for u_idx, u in enumerate(user_labels == win):
            if u: rels_user[u_idx] *= 1.001 * wr
        for u_idx, u in enumerate(user_labels == loose):
            if u: rels_user[u_idx] *= 0.999 * wr
        for u_idx, u in enumerate(user_labels == None):
            if u: rels_user[u_idx] *= 0.99
        answers[prob] = win

        for user_data in users_data:
            for user_label in user_data:
                if user_label['data'] == ObjectId(prob):
                    user_label['is_answer'] = (win == user_label['label'])


    for idx, label in enumerate(labels):
        tsan.updateLabel(request=label['request'], username=label['username'], data=label)
        tsan.update_reliability(label['username'], rels_user[idx])
    tsan.verifiedRequest(request=request['idx'])
    tsan.save(request=request['idx'], answers=answers)

def image_capture_validator(request):
    global labels
    answers = {}
    for data_key, filename in files.items():
        dddd = {
            "users": [],
            "x": [],
            "y": [],
            "width": [],
            "height": []
        }

        removed = []
        
        for user in labels:
            label = [x for x in user['dataset'] if x['data'] == ObjectId(data_key)][0]

            label['is_answer'] = True
            if label['label'] == None:
                user['reliability'] *= 0.999
                label['is_answer'] = False
                continue
            res = json.loads(label['label'])
            dddd['users'].append(user)
            dddd['x'].append(res.get("x"))
            dddd['y'].append(res.get("y"))
            dddd['width'].append(res.get("width"))
            dddd['height'].append(res.get("height"))
        
        x, r = mean(dddd['x'])
        removed += r
        y, r = mean(dddd['y'])
        removed += r
        width, r = mean(dddd['width'])
        removed += r
        height, r = mean(dddd['height'])
        removed += r

        for i in range(len(dddd['users'])):
            dddd['users'][i]['reliability'] *= 0.999 if i in removed else 1.001
            if i in removed:
                label = [x for x in user['dataset'] if x['data'] == ObjectId(data_key)][0]
                label['is_answer'] = False
                
        try:
            print([x, y, width, height])
            img = Image.open(filename)
            print(img.size)
            cropped = img.crop((x, y, x+width, y+height))
            cropped.save(filename)
            with open(filename, "rb") as f:
                answers[data_key] = (json.dumps({
                    "x": x,
                    "y": y,
                    "width": width,
                    "height": height
                }), f.read())
            print("\n".join(["%s: %.2f"%(label['username'], label['reliability']) for label in labels]))
        except Exception as e:
            print("Error")

    for label in labels:
        tsan.updateLabel(request=label['request'], username=label['username'], data=label)
        tsan.update_reliability(label['username'], label['reliability'])
    tsan.verifiedRequest(request=request['idx'])
    tsan.save(request=request['idx'], answers=answers)

def image_select(request):
    dataset = request
    print(dataset)
    i = 0
    data = []
    for prob_key, prob_file in files.items():
        for label in labels:
            if prob_file == './tmp/66/.DS_Store': ###
                continue
            data.append({
                "project_id": request['idx'],
                "data_index": i,
                "data": prob_file,
                "label_user": label['dataset'][i]['label'],
                "user_id": label['username'],
                "user_credibility": label['reliability']
            })
        i += 1
    inp = toDF(data)
    
    inp.to_csv('inp.csv', mode='w')###
    
    res = psi_daemon.image_selection_label(inp)
    print(res)

def main():
    global files
    global labels
    global tsan

    tsan.login(username="robot", password="robot")
    if not tsan.token:
        print("Login Fail")
        return
    print("Login Success")

    tsan.get_end_requests()
    for request in tsan.requests:
        idx = int(request['category']['idx'])
        print(request['idx'], idx)
        labels = tsan.getLabels(request)
        if idx == 1: # 텍스트 객관식
            files = tsan.download(request)
            text_select(request)
        elif idx == 2: # 이미지 선택형
            idx = int(request['category']['idx'])
            image_choice(request)
        elif idx == 3: # 이미지 영역지정
            files = tsan.download(request)
            image_capture_validator(request)
        elif idx == 4: # 이미지 객관식
            files = tsan.download(request)
            image_select(request)
        break

if __name__ == "__main__":
    main()