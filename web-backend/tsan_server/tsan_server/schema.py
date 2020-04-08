import graphene
from graphene_django.types import DjangoObjectType

# from backend.models import User, Dataset
from backend import models
# User, Dataset
from backend.schema import CreateAccount, CreateDataset, LoginAccount, Message

from rest_framework_jwt.serializers import (
  JSONWebTokenSerializer,
  RefreshJSONWebTokenSerializer,
  jwt_decode_handler
)

from backend.utils import only_user, only_admin, only_requester

class UserType(DjangoObjectType):
    class Meta:
        model = models.User

class Users(graphene.ObjectType):
    message = graphene.Field(Message)
    users = graphene.List(UserType)

class DatasetType(DjangoObjectType):
    class Meta:
        model = models.Dataset

class Dataset(graphene.ObjectType):
    message = graphene.Field(Message)
    dataset = graphene.List(DatasetType)

class Mutation(graphene.ObjectType):
    create_account = CreateAccount.Field()
    create_dataset = CreateDataset.Field()
    login_account = LoginAccount.Field()

class Query(graphene.ObjectType):
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
    get_all_user = graphene.Field(Users, token=graphene.String())
    @only_user
    @only_admin
    def resolve_get_all_user(self, info, **kwargs):
        users = models.User.objects.all()
        for user in users:
            user.password = "*****"
            user.email = user.email.split("@")[0][0:3] + "****" + "@" + user.email.split("@")[1]
        return Users(message=Message(status=True, message=""), users=users)

    """
    query {
        getAllDataset {
            idx
            name
        }
    }
    """
    # 모든 데이터셋 카테고리 반환
    get_all_dataset = graphene.Field(Dataset, token=graphene.String())
    @only_user
    @only_requester
    def resolve_get_all_dataset(self, info, token):
        return Dataset(message=Message(status=True, message=""), dataset=models.Dataset.objects.all())
        

schema = graphene.Schema(query=Query, mutation=Mutation)