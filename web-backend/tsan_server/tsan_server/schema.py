import graphene
from graphene_django.types import DjangoObjectType

from backend.models import User, Dataset
from backend.schema import CreateAccount, CreateDataset, LoginAccount

from rest_framework_jwt.serializers import (
  JSONWebTokenSerializer,
  RefreshJSONWebTokenSerializer,
  jwt_decode_handler
)

class UserType(DjangoObjectType):
    class Meta:
        model = User

class DatasetType(DjangoObjectType):
    class Meta:
        model = Dataset

class Mutation(graphene.ObjectType):
    create_account = CreateAccount.Field()
    create_dataset = CreateDataset.Field()
    login_account = LoginAccount.Field()

class Query(graphene.ObjectType):
    get_all_user = graphene.List(UserType)
    get_all_dataset = graphene.List(DatasetType)

    """
    query {
        getAllUser {
            id
            password
            username
            email
            phone
        }
    }
    """
    # 모든 사용자 반환
    def resolve_get_all_user(self, info, **kwargs):
        # 관리자 체크하는 함수 넣기
        users = []
        for user in User.objects.all():
            user.password = "*****"
            user.email = user.email.split("@")[0][0:3] + "****" + "@" + user.email.split("@")[1]
            users.append(user)
        return users
    
    """
    query {
        getAllDataset {
            idx
            name
        }
    }
    """
    # 모든 데이터셋 반환
    def resolve_get_all_dataset(self, info):
        return Dataset.objects.all()
        

schema = graphene.Schema(query=Query, mutation=Mutation)