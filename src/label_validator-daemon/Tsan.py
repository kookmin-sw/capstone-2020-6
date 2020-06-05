import requests
import json
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
    
