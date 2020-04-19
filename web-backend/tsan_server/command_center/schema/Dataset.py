import graphene
from mongodb import db
from backend.models import Dataset, User
from django.contrib.auth import login
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

class TextDataType(graphene.ObjectType):
    category = graphene.String()
    text = graphene.String()
    date = graphene.DateTime()

class ImageDataType(graphene.ObjectType):
    category = graphene.String()
    image = graphene.String()
    date = graphene.DateTime()

class TextDataList(graphene.ObjectType):
    message = Message(),
    data = graphene.List(TextDataType)

class ImageDataList(graphene.ObjectType):
    message = Message(),
    data = graphene.List(ImageDataType)

class InsertTextDataset(graphene.Mutation):
    message = graphene.Field(Message)

    class Arguments:
        name = graphene.String()
        token= graphene.String()
        text = graphene.List(TextDataType)

    @only_user
    @only_admin
    def mutate(self, info, token, text):
        return

class InsertImageDataset(graphene.Mutation):
    message = graphene.Field(Message)

    class Arguments:
        name = graphene.String()
        token= graphene.String()
        images= graphene.List(ImageDataType)

    @only_user
    @only_admin
    def mutate(self, info, token, images):
        return

class Query(graphene.ObjectType):

    get_text_dataset = graphene.Field(TextDataList)
    def resolve_get_text_dataset(self, info, skip=0, limit=100, **kwargs):
        pass

    get_image_dataset = graphene.Field(ImageDataList)
    def resolve_get_image_dataset(self, info, **kwargs):
        pass
    