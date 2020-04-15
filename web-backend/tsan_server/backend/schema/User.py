import graphene
from backend.models import Dataset, User
from django.contrib.auth import login
from django.core.exceptions import ValidationError
from graphene_django.types import DjangoObjectType
from rest_framework_jwt.serializers import (
  JSONWebTokenSerializer,
  RefreshJSONWebTokenSerializer,
  jwt_decode_handler
)
from backend.utils import (
    only_user,
    only_admin,
    only_requester,
    Message
)

class UserType(DjangoObjectType):
    class Meta:
        model = User

class Users(graphene.ObjectType):
    message = graphene.Field(Message)
    users = graphene.List(UserType)

"""
mutation {
  createAccount(
    isRequester:false
    email:"guest@gmail.com",
    password:"guest",
    username:"guest",
    phone: "01028858793"
  ) {
    message {
      status
      message
    }
  }
}
"""
class CreateAccount(graphene.Mutation):
    message = graphene.Field(Message)

    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()
        phone = graphene.String()
        is_requester = graphene.Boolean()
        
    def mutate(self, info, username, email, password, phone, is_requester=False):
        try:
            res = User.objects.exclude().get(username=username)
            return CreateAccount(message=Message(status=False, message="이미 존재하는 아이디입니다."))
        except:
            # new_user = User.objects.create_user(username=username, email=email, password=password, phone=phone, is_requester=is_requester)
            # message = "'%s'님 정상적으로 가입되었습니다."%(new_user.username)
            # return CreateAccount(message=Message(status=True, message=message))
            new_user = User(username=username, email=email, password=password, phone=phone, is_requester=is_requester)
            try:
                new_user.full_clean()
            except ValidationError as e:
                return CreateAccount(message=Message(status=False, message=str(e)))
            else:
                new_user.save()
                message = "'%s'님 정상적으로 가입되었습니다."%(new_user.username)
                return CreateAccount(message=Message(status=True, message=message))

"""
mutation {
  loginAccount(username: "guest", password: "guest") {
    message {
      status
      message
    }
    jwt
  }
}
"""
class LoginAccount(graphene.Mutation):
    message = graphene.Field(Message)
    jwt = graphene.String() # json web token

    class Arguments:
        username = graphene.String()
        password = graphene.String()

    def mutate(self, info, username, password):
        user = {
          'username': username,
          'password': password
        }
        serializer = JSONWebTokenSerializer(data=user)
        if serializer.is_valid():
            token = serializer.object['token']
            user = serializer.object['user']
            return LoginAccount(message=Message(status=True, message="정상적으로 로그인 되었습니다."), jwt=token)
        return LoginAccount(message=Message(status=False, message="아이디 또는 비밀번호가 올바르지 않습니다."))

class RefreshToken(graphene.Mutation):
    message = graphene.Field(Message)
    jwt = graphene.String()

    class Arguments:
        token = graphene.String()

    def mutate(self, info, token):
        serializer = RefreshJSONWebTokenSerializer(data={'token': token})
        if serializer.is_valid():
            token = serializer.object['token']
            return RefreshToken(message=Message(), jwt=token)
        return RefreshToken(message=Message(status=False, message="토큰 재발급에 실패하였습니다."))

class Query(graphene.ObjectType):
    """
    query {
        getAllUser(token:"관리자") {
            users{
                username
                email
                phone
                point
                reliability
                isRequester
            }
        }
    }
    """
    # 모든 사용자 반환
    get_all_user = graphene.Field(Users, token=graphene.String())
    @only_user
    @only_admin
    def resolve_get_all_user(self, info, **kwargs):
        users = User.objects.all()
        for user in users:
            user.password = "*****"
            user.email = user.email.split("@")[0][0:3] + "****" + "@" + user.email.split("@")[1]
        return Users(message=Message(status=True, message=""), users=users)