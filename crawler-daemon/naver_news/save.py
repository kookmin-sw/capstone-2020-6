import json
from pymongo import MongoClient

import sys
import os
import json
import pymongo

server = MongoClient('mongodb://14.50.245.63:27017/tsan?authSource=tsan')
client = MongoClient()
server_db = server.tsan
db = client.miggularge
rows = db.articles.find()

print(server_db.text_dataset.find())

for i in range(0, db.articles.count(), 1000):
    data = []
    for row in db.articles.find().skip(i).limit(1000):
        data.append({
            "category": "1",
            "text": row['title'] + "\n\n" + row['content']
        })
    server_db.text_dataset.insert_many(data)
