from google_images_download import google_images_download   #importing the library

response = google_images_download.googleimagesdownload()   #class instantiation

arguments = {"keywords":"bedroom", "limit":20, "print_urls":True}
paths = response.download(arguments)
print(paths)