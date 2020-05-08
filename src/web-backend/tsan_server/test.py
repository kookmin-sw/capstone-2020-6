import random
from mongodb import db

cnt = db.text_dataset.estimated_document_count()
dataset = []
rows = db.text_dataset.aggregate(
    [
        { "$sample": { "size": 1000 } },
        # {
        #     "$project": {
        #         "_id": 1
        #     }
        # }
    ]
)
rows = [x['_id'] for x in rows]
print(len(rows))
dataset.extend(rows)
print(dataset)


# rows = db.text_dataset.find(skip=random.rand)

