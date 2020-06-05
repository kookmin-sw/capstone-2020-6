from Tsan import Tsan

def main():
    tsan = Tsan()
    tsan.login(username="robot", password="robot")
    if not tsan.token:
        print("Login Fail")
        return

if __name__ == "__main__":
    main()