from Tsan import Tsan

files = []

def text_select(tsan, request):
    global files
    pass

def image_choice(tsan, request):
    global files
    pass

def image_capture_validator(tsan, request):
    global files
    pass

def image_select(tsan, request):
    global files
    pass

def main():
    global files

    tsan = Tsan()
    tsan.login(username="robot", password="robot")
    if not tsan.token:
        print("Login Fail")
        return

    tsan.get_end_requests()
    for request in tsan.requests:
        try:
            files = tsan.download(request)

            if request['category']['idx'] == 1: # 텍스트 객관식
                text_select(tsan, request)
            elif request['category']['idx'] == 2: # 이미지 선택형
                image_choice(tsan, request)
            elif request['category']['idx'] == 3: # 이미지 영역지정
                image_capture_validator(tsan, request)
            elif request['category']['idx'] == 4: # 이미지 객관식
                image_select(tsan, request)
        except Exception as e:
            print("Error: ", e)
            pass

if __name__ == "__main__":
    main()