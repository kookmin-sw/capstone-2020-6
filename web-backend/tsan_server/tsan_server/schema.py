import graphene
from graphene_django.types import DjangoObjectType

from backend import models
from backend.schema.User import CreateAccount, LoginAccount, Message
from backend.schema.Dataset import CreateDataset
from backend.schema.Category import CreateCategory

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
    create_category = CreateCategory.Field()
    login_account = LoginAccount.Field()

class CategoryType(DjangoObjectType):
    class Meta:
        model = models.Category

class Category(graphene.ObjectType):
    message = graphene.Field(Message)
    category = graphene.List(CategoryType)

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
        users = models.User.objects.all()
        for user in users:
            user.password = "*****"
            user.email = user.email.split("@")[0][0:3] + "****" + "@" + user.email.split("@")[1]
        return Users(message=Message(status=True, message=""), users=users)

    """
    query {
        getAllDataset(token:"의뢰자, 관리자") {
			dataset{
                idx
                name
            }
        }
    }
    """
    # 모든 데이터셋 카테고리 반환
    get_all_dataset = graphene.Field(Dataset, token=graphene.String())
    @only_user
    @only_requester
    def resolve_get_all_dataset(self, info, token):
        return Dataset(message=Message(status=True, message=""), dataset=models.Dataset.objects.all())

    """
    query {
        getAllCategory(token: "의뢰자, 관리자") {
            message {
                status
                message
            }
            category {
                idx
                type
                name
            }
        }
    }
    """
    # 모든 카테코리 반환
    get_all_category = graphene.Field(Category, token=graphene.String())
    @only_user
    @only_requester
    def resolve_get_all_category(self, info, token):
        return Category(message=Message(status=True, message=""), category=models.Category.objects.all())
        

schema = graphene.Schema(query=Query, mutation=Mutation)