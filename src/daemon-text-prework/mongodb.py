from pymongo import MongoClient
server = MongoClient('mongodb:///tsan?authSource=tsan')
db = server.tsan
