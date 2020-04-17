import graphene
from backend.models import Dataset, User, Category, Request
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

class RequestType(DjangoObjectType):
    class Meta:
        model = Request

class Requests(graphene.ObjectType):
    message = graphene.Field(Message)
    requests = graphene.List(RequestType)

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
    def mutate(self, info, name, token):
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
"""
mutation{
  createRequest(
    subject:"강아지 코 추출",
    description:"비문 인식 연구에 대한 강아지 코 추출 라벨링 주제 입니다."
    dueDate:"2020-04-30"
    totalPoint:100
    maxCycle:10
    token:""
    category:"이미지 캡쳐 라벨링"
  ) {
  	message{
      status
      message
    }
    idx
  }
}
"""
class CreateRequest(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        category = graphene.String()
        subject = graphene.String()
        description = graphene.String()
        due_date = graphene.Date()
        max_cycle = graphene.Int()
        total_point = graphene.Int()
        token = graphene.String()
    @only_user
    @only_requester
    def mutate(self, info, category, subject, description, due_date, max_cycle, total_point, token):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        category = Category.objects.get(name=category)
        rows = Request.objects.filter(subject=subject)

        # 주제가 처음 등록된 경우
        if not rows:
            request = Request()
            request.create(user, category, subject, description, due_date, max_cycle, total_point)
            message = "'%s' 주제가 등록되었습니다."%(request.subject)
            return CreateRequest(
                    message=Message(status=True, message=message),
                    idx=request.idx
                )
        # 같은 주제가 이미 등록되어있는 경우
        else:
            # 동일 인물이 시도할 경우: 등록 불가
            if rows.filter(user_id=user.id):
                return CreateRequest(message=Message(status=False, message="회원님은 이미 같은 주제로 등록하신 프로젝트가 있습니다."))
            # 다른 사람이 시도할 경우: 등록 가능
            else:
                request = Request()
                request.create(user, category, subject, description, due_date, max_cycle, total_point)
                message = "'%s' 주제가 등록되었습니다. 다른 의뢰자가 등록한 같은 주제가 존재합니다."%(request.subject)
                return CreateRequest(
                        message=Message(status=True, message=message),
                        idx=request.idx
                    )

class Query(graphene.ObjectType):
    """
    query {
    getAllRequest(token: "의뢰자/관리자") {
        message {
        status
        message
        }
        requests {
        idx
        user {
            id
            username
            password
            email
        }
        category {
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
    get_all_request = graphene.Field(Requests, token=graphene.String())
    @only_user
    @only_requester
    def resolve_get_all_request(self, info, token):
        requests = Request.objects.all()
        for request in requests:
            request.user.password = "*****"
            request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + request.user.email.split("@")[1]
        return Requests(message=Message(status=True, message=""), requests=requests)
    """
    query {
    getRequesterRequest(token: "의뢰자/관리자") {
        message {
        status
        message
        }
        requests {
        idx
        user {
            id
            username
            password
            email
        }
        category {
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
    # 특정 의뢰자에 대한 주제 반환
    get_requester_request = graphene.Field(Requests, token=graphene.String())
    @only_user
    @only_requester
    def resolve_get_requester_request(self, info, token):
        res = jwt_decode_handler(token)
        users = User.objects.get(username=res['username'])
        request_rows = Request.objects.filter(user=users)
        for request in request_rows:
            request.user.password = "*****"
            request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + request.user.email.split("@")[1]
        if request_rows:
            return Requests(message=Message(status=True, message=""), requests=request_rows)
        else:
            return Requests(message=Message(status=True, message="해당 주제 목록이 없습니다."), requests=request_rows)