import graphene
from backend.models import Dataset, User, Category
from django.contrib.auth import login
from backend.forms import CategoryForm
from django.core.exceptions import ValidationError
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
"""
mutation {
  updateCategory(
    idx: 3, 
    name: "이미지 캡쳐 라벨링", 
    type:"image",
    token:"관리자"
  ) {
    message {
      status
      message
    }
    idx
  }
}
"""
class UpdateCategory(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        idx = graphene.Int()
        name = graphene.String()
        type = graphene.String()
        token = graphene.String()

    @only_user
    @only_admin
    def mutate(self, info, idx, name, type, token):
        try:
            category = Category.objects.get(idx=idx)
            update = Category(name=name, type=type)
            try:
                update.clean()
            except ValidationError as e:
                return UpdateCategory(message=Message(status=False, message=str(e)))
            else:
                category.name = name
                category.type = type
                category.save()
                message = "'%s'카테고리가 정상적으로 수정되었습니다."%(category.name)
                return UpdateCategory(
                    message=Message(status=False, message=message),
                    idx=category.idx
                )
        except:
            return UpdateCategory(message=Message(status=False, message="수정 요청한 인스턴스가 존재하지 않습니다."))


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