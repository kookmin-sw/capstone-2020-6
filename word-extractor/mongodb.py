from pymongo import MongoClient
server = MongoClient('mongodb://mongo:password123@14.50.245.63:27017/tsan?authSource=tsan')
db = server.tsan
