import graphene
from graphene_django.types import DjangoObjectType

from backend import models
from backend import schema
import command_center.schema as c_schema
from backend.schema.User import CreateAccount, LoginAccount, Message
from backend.schema.Dataset import CreateDataset
from backend.schema.Category import CreateCategory
from backend.schema.Project import CreateRequest

from command_center.schema import Dataset

from rest_framework_jwt.serializers import (
  JSONWebTokenSerializer,
  RefreshJSONWebTokenSerializer,
  jwt_decode_handler
)

from backend.utils import only_user, only_admin, only_requester

class Mutation(graphene.ObjectType):
    create_account = CreateAccount.Field()
    create_dataset = CreateDataset.Field()
    create_category = CreateCategory.Field()
    login_account = LoginAccount.Field()
    create_request = CreateRequest.Field()

class Query(
    schema.User.Query,
    schema.Category.Query,
    schema.Project.Query,
    schema.Dataset.Query,

    Dataset.Query
):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)