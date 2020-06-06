from Tsan import Tsan
import json
from numpy import dot
from numpy.linalg import norm
import numpy as np
from PIL import Image
from bson import ObjectId
import cv2

def cos_sim(A, B):
    return dot(A, B)/(norm(A)*norm(B))

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

def text_select(request):
    pass

def image_choice(request):
    pass

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

                
        try:
            print([x, y, width, height])
            img = Image.open(filename)
            print(img.size)
            cropped = img.crop((x, y, x+width, y+height))
            cropped.save(filename)
            with open(filename, "rb") as f:
                answers[data_key] = f.read()
            print("\n".join(["%s: %.2f"%(label['username'], label['reliability']) for label in labels]))
        except Exception as e:
            print("Error")

    for label in labels:
        tsan.updateLabel(request=label['request'], username=label['username'], data=label)
        tsan.update_reliability(label['username'], label['reliability'])
    tsan.verifiedRequest(request=request['idx'])
    tsan.save(request=request['idx'], answers=answers)

def image_select(request):
    pass

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
        files = tsan.download(request)
        labels = tsan.getLabels(request)
        idx = int(request['category']['idx'])
        if idx == 1: # 텍스트 객관식
            text_select(request)
        elif idx == 2: # 이미지 선택형
            image_choice(request)
        elif idx == 3: # 이미지 영역지정
            image_capture_validator(request)
        elif idx == 4: # 이미지 객관식
            image_select(request)
        break

if __name__ == "__main__":
    main()