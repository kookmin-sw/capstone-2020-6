import random
from mongodb import db

rows = db.image_dataset.find({"dataset": 4}, {"_id": 1}).limit(100)
for row in rows:
    print(row['_id'])

# dataset = []
# print(">> 1")
# rows = db.text_dataset.aggregate(
#     [{
#         "$sample": {
#             "size": 1000
#         }
#     }, {
#         "$project": {
#             "_id": True
#         }
#     }]
# )
# print(">> 2")
# rows = [x['_id'] for x in rows]
# print(">> 3")
# print(len(rows))
# print(">> 4")

# # dataset.extend(rows)

# # print(dataset)


# # rows = db.text_dataset.find(skip=random.rand)

