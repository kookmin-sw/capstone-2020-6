import konlpy
import time
from pymongo import InsertOne, DeleteMany, ReplaceOne, UpdateOne
from mongodb import db
from bson import ObjectId

print("Loading...", end="")
komoran = konlpy.tag.Komoran()
print("Loaded....!")

while True:
    update = []
    bulk = []
    for row in db.text_dataset.find({"is_extracted": {"$ne": True}}).limit(1000):
        if row.get("text", None) == None:
            print("[!] Wrong type.. removed")
            continue
        try:
            nouns = komoran.nouns(row['text'])
            keys = list(set(nouns))
            nouns = dict([(x, nouns.count(x)) for x in keys])
            for key, value in nouns.items():
                bulk.append(
                    UpdateOne(
                        {
                            "word": key
                        }, 
                        {
                            "$inc": {
                                "count": value
                            }
                        },
                        upsert=True
                    )
                )
            update.append(UpdateOne({"_id": row['_id']}, {"$set": {"words": nouns, "is_extracted": True}}))
            print("\r%d"%(len(update)), end="")
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(e)
            continue        
    print()
    if 0 < len(bulk):
        print("Update writes...")
        db.text_dataset.bulk_write(update)
        print("Update words...")
        db.words.bulk_write(bulk)
    else:
        print("Sleep...")
        time.sleep(10)

