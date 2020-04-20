import requests
import datetime
import json
import time
import re
import sys
import datetime
from bs4 import BeautifulSoup
from threading import Thread

total = 0
urls = []
articles = []

flag = False

# 날짜별 페이지 개수 크롤링
def dateCrawl(date):
    print(date, ": Start")
    max = 1000
    url = "https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&listType=title&sid1=001&date=%s&page=%d"%(date, max)
    max_page = 0
    while True:
        try:
            max_page = requests.get(url=url).text.split('page=')[-1].split("\"")[0]
            max_page = int(max_page)
            print("max: %d"%(max_page))
            break
        except Exception as e:
            max = int(max / 0.66)
            print(url)
            print(e)
            pass
    for i in range(1, max_page+1):
        try:
            url = "https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&listType=title&sid1=001&date=%s&page=%d"%(date, i)
            list_text = requests.get(url=url).text.split('<div class="list_body newsflash_body">')[1]
            for link in list_text.split('<a href="')[1:51]:
                urls.append(link.split("\"")[0])
            print("Urls: %d"%(len(urls)))
        except Exception as e:
            print(url)
            print(e)
    print(date, ": Finish")

# 페이지별 URL 크롤링
def get_urls(d):
    threads = []
    for i in range(0, d):
        date = datetime.datetime.now() - datetime.timedelta(days=i)
        date = str(date.date()).replace("-", "")
        threads.append(Thread(target=dateCrawl, args=(date,)))
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    f = open("urls.json", "w")
    json.dump(urls, f)
    f.close()
    print("Count of urls: ", len(urls))

# URL 크롤링 쓰레드
def crawl():
    while True:
        if len(urls) == 0: break
        url = urls.pop()
        html = requests.get(url=url).text
        html = html.replace("// flash 오류를 우회하기 위한 함수 추가", "")
        html = html.replace("function _flash_removeCallback() {}", "")
        html = re.sub("<a.*>.*</a>", "", html)
        soup = BeautifulSoup(html, "lxml")
        title = soup.find("h3", attrs={"id": "articleTitle"}).text
        date = soup.find(attrs={"class": "t11"}).text
        # 2019.11.18. 오전 2:12 -> 2019.11.18. AM 2:12 -> 2019.11.18. 14:12
        date = int(time.mktime(datetime.datetime.strptime(date.replace("오전", "AM").replace("오후", "PM"), "%Y.%m.%d. %p %I:%M").timetuple()))
        content = soup.find(attrs={"id": "articleBodyContents"}).text.strip()
        articles.append({
            "url": url,
            "title": title,
            "date": date,
            "content": content
        })

# 저장 쓰레드
def saver():
    global flag
    while True:
        if flag: break
        if len(sys.argv) == 2:
            f = open("output_%s.json"%(sys.argv[1]), "w")
            json.dump(articles, f)
            f.close()
        else:
            f = open("output.json", "w")
            json.dump(articles, f)
            f.close()
        time.sleep(10)
        print(total - len(urls), "/", total)

# 크롤링 지시 스레드
def crawls():
    global urls
    global flag
    global total
    f = open("urls.json", "r")
    urls = json.load(f)
    if len(sys.argv) == 2:
        i = int(sys.argv[1])
        l = len(urls)
        urls = urls[int(i*1/5*l):int((i+1)*(1/5)*l)]
    f.close()
    print("Urls: ", len(urls))
    total = len(urls)
    threads = []
    saveThread = Thread(target=saver)
    saveThread.start()
    for _ in range(120): threads.append(Thread(target = crawl))
    for t in threads: t.start()
    for t in threads: t.join()
    flag = True
    saveThread.join()

def main():
    get_urls(1)
    crawls()
    pass

if __name__ == "__main__":
    main()