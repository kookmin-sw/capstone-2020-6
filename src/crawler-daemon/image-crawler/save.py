import os
from mongodb import db

path = "./download/Cats"
images = [os.path.join(path, x.name) for x in os.scandir(path)]
data = []
for image in images:
    print(image)
    if 16000000 <= os.path.getsize(image):
        continue
    f = open(image, "rb")
    data.append({
        "dataset": 8,
        "filename": image.split("/")[-1],
        "data": f.read()
    })
    f.close()
db.image_dataset.insert_many(data)
