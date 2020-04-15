import graphene
from backend.models import Dataset, User, Category
from django.contrib.auth import login
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

"""
mutation{
  createCategory(type:"text", name:"문자 내용 유형 분류", token:"관리자 토큰"){
    message{
      status
      message
    }
    idx
  }
}
"""
class CreateCategory(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        name = graphene.String()
        type = graphene.String()
        token = graphene.String()

    @only_admin
    def mutate(self, info, name, type, token):
        try:
            Category.objects.get(name=name)
            return CreateCategory(message=Message(status=False, message="이미 존재하는 카테고리 입니다."))
        except:
            category = Category()
            category.create(name=name, type=type)
            message = "'%s'카테고리가 생성되었습니다."%(category.name)
            return CreateCategory(
                message=Message(status=True, message=message),
                idx=category.idx
            )