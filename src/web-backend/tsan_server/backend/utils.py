import graphene
from backend import models
from django.contrib.auth import login
from rest_framework_jwt.serializers import (
  JSONWebTokenSerializer,
  RefreshJSONWebTokenSerializer,
  jwt_decode_handler
)

class Message(graphene.ObjectType):
    status = graphene.Boolean() # True = 정상, False = 에러
    message = graphene.String() # 반환 메시지 (예: 비밀번호가 서로 일치하지 않습니다.)

def only_user(func):
    def func_wrapper(*args, **kwargs):
        try:
            jwt_decode_handler(kwargs['token'])
            return func(*args, **kwargs)
        except Exception as e:
            print(e)
            return {"message": Message(status=False, message="로그인이 필요합니다.")}
    return func_wrapper

def only_admin(func):
    def func_wrapper(*args, **kwargs):
        res = jwt_decode_handler(kwargs['token'])
        user = models.User.objects.get(username=res['username'])
        if user.is_staff:
            return func(*args, **kwargs)
        else:
            return {"message": Message(status=False, message="권한이 없습니다.")}
    return func_wrapper

def only_requester(func):
    def func_wrapper(*args, **kwargs):
        res = jwt_decode_handler(kwargs['token'])
        user = models.User.objects.get(username=res['username'])
        if user.is_requester:
            return func(*args, **kwargs)
        else:
            return {"message": Message(status=False, message="의뢰자만 접근 할 수 있습니다.")}
    return func_wrapper

