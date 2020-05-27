import requests
import os
import urllib.parse

queries= "침실,강아지,버스,택시,공원,주방"
for query in queries.split(","):
    query = query.strip()
    output_dir = "./download/%s/"%(query)
    try:
        os.makedirs(output_dir)
    except:
        pass
    urls = []
    for i in range(0, 1500, 200):
        start = i
        display = i+200
        start = str(start)
        display = str(display)
        url = "https://s.search.naver.com/imagesearch/instant/search.naver?where=image&section=image&rev=31&res_fr=0&res_to=0&face=0&color=0&ccl=0&ac=0&aq=0&spq=0&query=" + query + "&nx_search_query=" + query + "&nx_and_query=&nx_sub_query=&nx_search_hlquery=&nx_search_fasquery=&datetype=0&startdate=0&enddate=0&json_type=6&nlu_query=&nqx_theme=%7B\"theme\"%3A%7B\"main\"%3A%7B\"name\"%3A\"living\"%2C\"score\"%3A\"0.870982\"%7D%7D%7D&start=" + start + "&display=" + display + "&_callback=alert"
        res = requests.get(url=url)
        urls_ = [x.split('\\"')[0] for x in res.text.split('\\"originalUrl\\":\\"')[1:]]
        urls += [urllib.parse.unquote(x) for x in urls_]
        urls = list(set(urls))
        print("[%s] %d"%(query, len(urls)))
    for i, url in enumerate(urls):
        print("\r[%s] %d / %d"%(query, i, len(urls)), end="")
        try:
            ext = url.split(".")[-1].split("#")[0].split("?")[0]
            output = os.path.join(output_dir, "%d.%s"%(i, ext))
            f = open(output, "wb")
            res = requests.get(url=url, stream=True)
            f.write(res.raw.read())
            f.close()
        except:
            continue
    print()

