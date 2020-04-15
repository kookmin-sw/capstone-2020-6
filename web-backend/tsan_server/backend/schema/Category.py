import graphene
from backend.models import Dataset, User, Category
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

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category

class Categorys(graphene.ObjectType):
    message = graphene.Field(Message)
    categorys = graphene.List(CategoryType)

"""
mutation{
  createCategory(type:"text", name:"텍스트 단답형 라벨링", token:"관리자 토큰"){
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

    @only_user
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

class Query(graphene.ObjectType):
    """
    query {
        getAllCategory(token: "의뢰자, 관리자") {
            message {
                status
                message
            }
            categorys {
                idx
                type
                name
            }
        }
    }
    """
    # 모든 카테코리 반환
    get_all_category = graphene.Field(Categorys, token=graphene.String())
    @only_user
    @only_requester
    def resolve_get_all_category(self, info, token):
        return Categorys(message=Message(status=True, message=""), categorys=Category.objects.all())