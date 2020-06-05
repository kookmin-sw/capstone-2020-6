from Tsan import Tsan

def main():
    tsan = Tsan()
    tsan.login(username="robot", password="robot")
    if not tsan.token:
        print("Login Fail")
        return

    tsan.get_end_requests()    
    for request in tsan.requests:
        if request['category']['idx'] == 1: # 텍스트 객관식
            pass
        elif request['category']['idx'] == 2: # 이미지 선택형
            pass
        elif request['category']['idx'] == 3: # 이미지 영역지정
            pass
        elif request['category']['idx'] == 4: # 이미지 객관식
            pass

if __name__ == "__main__":
    main()