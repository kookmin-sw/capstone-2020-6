import requests
import json
import os
from bson import ObjectId
from mongodb import db
from graphqlclient import GraphQLClient

client = GraphQLClient('http://localhost:8000/v1/graphql')

class Tsan:

    def __init__(self):
        self.token = ""
        self.requests = []

    def login(self, username, password):
        res = client.execute('''
            mutation ($username: String!, $password: String!){
                loginAccount(username: $username, password: $password) {
                    jwt
                }
            }
        ''',
        variables={
            "username": username,
            "password": password
        })
        data = json.loads(res)
        self.token = data['data']['loginAccount']['jwt']
    
    def get_reliability(self, username):
        res = client.execute('''
            mutation ($username: String!, $token: String!){
                test(
                    username: $username,
                    token: $token
                ) {
                    message{
                        status
                        message
                    }
                    reliability
                }
            }
        ''',
        variables={
            "username": username,
            "token": self.token
        })
        data = json.loads(res)
        return data['data']['test']['reliability']
    
    def get_end_requests(self):
        res = client.execute('''
            query {
                getAllRequest(state: "END") {
                    message {
                        status
                        message
                    }
                    requests {
                        idx
                        category {
                            idx
                            type
                            name
                        }
                        keywordSet {
                            idx
                            name
                        }
                        state
                        isRewarded
                    }
                }
            }
        ''')
        data = json.loads(res)
        self.requests = data['data']['getAllRequest']['requests']
        return self.requests
    
    def getLabelPerUser(self, request):
        labeled = {}
        for label in db.user_assigned.find({"request": int(request['idx'])}):
            labeled[label['username']] = {
                "dataset": {},
                "reliability": self.get_reliability(label['username'])
            }
            for x in label['dataset']:
                labeled[label['username']]['dataset'][str(x['data'])] = x['label']
        return labeled
    
    def download(self, request):

        folder = "./tmp/%s/"%(request['idx'])

        try:
            os.makedirs(folder)
        except:
            pass

        assigned = db.assigned_dataset.find_one({"request": int(request['idx'])})

        # 이미지인 경우
        if request['category']['type'] == "image":
            i = 0
            files = {}
            for image in assigned['dataset']:
                i += 1
                img = db.image_dataset.find_one({"_id": ObjectId(image)})
                filename = os.path.join(folder, img['filename'])
                f = open(filename, "wb")
                print("[%d/%d] Download %s"%(i, len(assigned['dataset']), img['filename']))
                f.write(img['data'])
                f.close()
                files[str(image)] = filename
            return files

        # 텍스트인 경우
        else:
            i = 0
            files = {}
            for text in assigned['dataset']:
                i += 1
                txt = db.text_dataset.find_one({"_id": ObjectId(text)})
                filename = os.path.join(folder, str(text) + ".json")
                f = open(filename, "w")
                print("[%d/%d] Download %s"%(i, len(assigned['dataset']), filename))
                txt['_id'] = str(txt['_id'])
                json.dump(txt, f)
                f.close()
                files[str(text)] = filename
            return files