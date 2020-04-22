import graphene
from graphene_django.types import DjangoObjectType

from backend import models
from backend import schema
from backend.schema.User import CreateAccount, LoginAccount, Message, UpdateAccount
from backend.schema.Dataset import CreateDataset
from backend.schema.Category import CreateCategory, UpdateCategory
from backend.schema.Project import CreateRequest, UpdateRequest
from backend.schema.Payment import CreatePaymentLog, UpdatePaymentLog

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
    update_category = UpdateCategory.Field()
    update_account = UpdateAccount.Field()
    update_request = UpdateRequest.Field()
    create_paymentlog = CreatePaymentLog.Field()
    update_paymentlog = UpdatePaymentLog.Field()


class Query(
    schema.User.Query,
    schema.Category.Query,
    schema.Project.Query,
    schema.Dataset.Query,
    schema.Payment.Query,

    Dataset.Query
):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)