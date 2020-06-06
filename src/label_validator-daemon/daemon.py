from Tsan import Tsan
import json
from numpy import dot
from numpy.linalg import norm
import numpy as np

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
users = []

def text_select(request):
    pass

def image_choice(request):
    pass

def image_capture_validator(request):
    global users
    for data_key, filename in files.items():
        dddd = {
            "users": [],
            "x": [],
            "y": [],
            "width": [],
            "height": []
        }
        for username, data in users.items():
            if data['dataset'][data_key] == None:
                continue
            res = json.loads(data['dataset'][data_key])
            dddd['users'].append(username)
            dddd['x'].append(res.get("x"))
            dddd['y'].append(res.get("y"))
            dddd['width'].append(res.get("width"))
            dddd['height'].append(res.get("height"))
        
        removed = []
        x, r = mean(dddd['x'])
        removed += r
        y, r = mean(dddd['y'])
        removed += r
        width, r = mean(dddd['width'])
        removed += r
        height, r = mean(dddd['height'])
        removed += r

        for i, in enumerate(users):
            users[dddd['users'][i]]['reliability'] *= 0.99 if i in removed else 1.01
        
        print([x, y, width, height])        

def image_select(request):
    pass

def main():
    global files
    global users
    global tsan

    tsan.login(username="robot", password="robot")
    if not tsan.token:
        print("Login Fail")
        return
    print("Login Success")

    tsan.get_end_requests()
    for request in tsan.requests:
        try:
            files = tsan.download(request)
            users = tsan.getLabelPerUser(request)
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
        except Exception as e:
            print("Error: ", e)
            pass

if __name__ == "__main__":
    main()