import json
from mongodb import db

f = open("./movies.txt", "r")
rows = json.loads(f.read())
f.close()

data = []
for row in rows:
    data.append({
        "category": "10",
        "text": row
    })
db.text_dataset.insert_many(data)

