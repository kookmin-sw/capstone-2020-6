import numpy as np
import konlpy
import time
import pymongo
from pymongo import InsertOne, DeleteMany, ReplaceOne, UpdateOne
from mongodb import db
from bson import ObjectId

while True:
    data_set = db.text_dataset.find({"is_extracted": True, "is_idf": {"$ne": True}}, {"_id": 1, "words": 1}).limit(1000)
    bulk = []
    update = []
    for row in data_set:
        words = row['words'].keys()
        for word in words:
            bulk.append(
                UpdateOne(
                    {
                        "word": word
                    }, 
                    {
                        "$inc": {
                            "count": 1
                        }
                    },
                    upsert=True
                )
            )
        update.append(UpdateOne({"_id": row['_id']}, {"$set": {"is_idf": True}}))

    if 0 < len(bulk):
        print("Update df...")
        db.document_frequency.bulk_write(bulk)
        print("Update writes...")
        db.text_dataset.bulk_write(update)
    else:
        print("Sleep...")
        time.sleep(10)
    break