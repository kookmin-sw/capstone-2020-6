from Tsan import Tsan

def main():
    tsan = Tsan()
    tsan.login(username="robot", password="robot")
    if not tsan.token:
        print("Login Fail")
        return
    tsan.get_end_requests()
    print(tsan.requests)

if __name__ == "__main__":
    main()