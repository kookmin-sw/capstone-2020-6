from Tsan import Tsan

tsan = Tsan()
files = []

def text_select(request):
    pass

def image_choice(request):
    pass

def image_capture_validator(request):
    print("HI")
    users = tsan.getLabelPerUser(request)
    for username, values in users.items():
        print(username)
        print(values['dataset'])

def image_select(request):
    pass

def main():
    global files
    global tsan

    tsan.login(username="robot", password="robot")
    if not tsan.token:
        print("Login Fail")
        return

    tsan.get_end_requests()
    for request in tsan.requests:
        try:
            files = tsan.download(request)
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