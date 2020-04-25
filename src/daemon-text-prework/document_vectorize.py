import numpy as np
import konlpy
import time
import pymongo
from pymongo import InsertOne, DeleteMany, ReplaceOne, UpdateOne
from mongodb import db
from bson import ObjectId

words = db.document_frequency.find().sort([("count", pymongo.DESCENDING)]).limit(20000)
base_key = []
base_vector = []
for x in words:
    base_key.append(x['word'])
    base_vector.append(x['count'])
base_vector = np.array(base_vector)

while True:
    data_set = db.text_dataset.find({"is_idf": True, "is_vectorized": {"$ne": True}}, {"_id": 1, "words": 1}).limit(1000)
    update = []
    for row in data_set:
        text_vector = [row['words'].get(x, 0) for x in base_key]
        text_vector = np.array(text_vector)
        vector = text_vector / np.log(base_vector)
        vector = list(vector)
        update.append(
            UpdateOne({"_id": row['_id']}, {"$set": {"is_vectorized": True, "vector": vector}})
        )
    if len(update) == 0:
        print("Sleep...")
        time.sleep(10)
    else:
        db.text_dataset.bulk_write(update)
