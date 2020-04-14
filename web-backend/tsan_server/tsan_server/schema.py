import graphene
from graphene_django.types import DjangoObjectType

from backend import models
from backend.schema.User import CreateAccount, LoginAccount, Message
from backend.schema.Dataset import CreateDataset
from backend.schema.Category import CreateCategory
from backend.schema.Project import CreateRequest

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
    create_request = CreateRequest.Field()

class CategoryType(DjangoObjectType):
    class Meta:
        model = models.Category

class Category(graphene.ObjectType):
    message = graphene.Field(Message)
    category = graphene.List(CategoryType)

class RequestType(DjangoObjectType):
    class Meta:
        model = models.Request

class Request(graphene.ObjectType):
    message = graphene.Field(Message)
    request = graphene.List(RequestType)

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
    """
    query{
    getAllRequest(
        token:"의뢰자/관리자"
    ) {
        message{
        status
        message
        }
        request{
        idx
        user {
            id
            username
        }
        category{
            name
            type
        }
        subject
        description
        startDate
        dueDate
        currentCycle
        maxCycle
        totalPoint
        }
    }
    }
    """
    # 모든 주제 반환
    get_all_request = graphene.Field(Request, token=graphene.String())
    @only_user
    @only_requester
    def resolve_get_all_request(self, info, token):
        requests = models.Request.objects.all()
        for request in requests:
            request.user.password = "*****"
            request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + request.user.email.split("@")[1]
        return Request(message=Message(status=True, message=""), request=requests)

    # 특정 의뢰자에 대한 주제 반환
    get_requester_request = graphene.Field(Request, token=graphene.String())
    @only_user
    @only_requester
    def resolve_get_requester_request(self, info, token):
        res = jwt_decode_handler(token)
        user = models.User.objects.get(username=res['username'])
        request_rows = models.Request.objects.filter(user=user)
        for request in request_rows:
            request.user.password = "*****"
            request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + request.user.email.split("@")[1]
        if request_rows:
            return Request(message=Message(status=True, message=""), request=request_rows)
        else:
            return Request(message=Message(status=True, message="해당 주제 목록이 없습니다."), request=request_rows)
        

        

schema = graphene.Schema(query=Query, mutation=Mutation)