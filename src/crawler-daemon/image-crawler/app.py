from icrawler.builtin import GoogleImageCrawler

query = "침실"
output = "./bedroom"

google_crawler = GoogleImageCrawler(
    feeder_threads=1,
    parser_threads=1,
    downloader_threads=4,
    storage={'root_dir': output})

google_crawler.crawl(keyword=query, offset=0, max_num=1000, min_size=(200,200), max_size=None, file_idx_offset=0)
