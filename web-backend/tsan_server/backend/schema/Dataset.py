import graphene
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

class DatasetType(DjangoObjectType):
    class Meta:
        model = Dataset

class Dataset(graphene.ObjectType):
    message = graphene.Field(Message)
    dataset = graphene.List(DatasetType)

"""
mutation {
	createDataset(name: "네이버 뉴스기사 댓글") {
    message {
      status
      message
    }
    idx
  } 
}
"""
class CreateDataset(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        name = graphene.String()
        token= graphene.String()

    @only_user
    @only_admin
    def mutate(self, info, token, name):
        try:
            Dataset.objects.get(name=name)
            return CreateDataset(message=Message(status=False, message="이미 존재하는 데이터셋 이름입니다."))
        except:
            dataset = Dataset()
            dataset.create(name=name)
            message = "'%s'가 생성되었습니다."%(dataset.name)
            return CreateDataset(
                        message=Message(status=True, message=message),
                        idx=dataset.idx
                    )

class Query(graphene.ObjectType):
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
        return Dataset(message=Message(status=True, message=""), dataset=Dataset.objects.all())
