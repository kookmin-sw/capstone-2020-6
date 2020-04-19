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
    _id = graphene.String()
    category = graphene.String()
    text = graphene.String()
    date = graphene.DateTime()

class ImageDataType(graphene.ObjectType):
    _id = graphene.String()
    category = graphene.String()
    image = graphene.String()
    date = graphene.DateTime()

class TextDataList(graphene.ObjectType):
    message = graphene.Field(Message)
    data = graphene.List(TextDataType)

class ImageDataList(graphene.ObjectType):
    message = graphene.Field(Message)
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

    get_text_dataset = graphene.Field(TextDataList, skip=graphene.Int(), limit=graphene.Int())
    def resolve_get_text_dataset(self, info, skip=0, limit=100, **kwargs):
        if skip < 0:
            return TextDataList(message=Message(status=False, message="SKIP 값은 0과 같거나 커야합니다."))
        if limit < 0:
            return TextDataList(message=Message(status=False, message="LIMIT 값은 0과 같거나 커야합니다."))
        if limit > 1000:
            return TextDataList(message=Message(status=False, message="LIMIT 값은 1000을 넘을 수 없습니다."))
        
        rows = db.text_dataset.find().skip(skip).limit(limit)
        data = []
        for row in rows:
            data.append({
                "_id": row.get("_id", ""),
                "category": row.get("category", ""),
                "text": row.get("text", ""),
            })
        
        return TextDataList(message=Message(status=True), data=data)

            

    get_image_dataset = graphene.Field(TextDataList, skip=graphene.Int(), limit=graphene.Int())
    def resolve_get_image_dataset(self, info, skip=0, limit=100, **kwargs):
        pass
    