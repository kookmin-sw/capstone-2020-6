import requests
import json
from graphqlclient import GraphQLClient

client = GraphQLClient('http://localhost:8000/v1/graphql')

class Tsan:

    def __init__(self):
        self.token = ""

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