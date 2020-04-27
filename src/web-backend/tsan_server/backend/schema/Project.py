import graphene
import datetime
from backend.models import Dataset, User, Category, Request, Labeling
from django.contrib.auth import login
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
        is_captcha = graphene.Boolean()
        token = graphene.String()

    @only_user
    @only_requester
    def mutate(self, info, category, subject, description, due_date, max_cycle, total_point, is_captcha, token):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        category = Category.objects.get(name=category)
        rows = Request.objects.filter(subject=subject)

        # 주제가 처음 등록된 경우
        if not rows:
            request = Request()
            request.create(user, category, subject, description, due_date, max_cycle, is_captcha, total_point)
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
                request.create(user, category, subject, description, due_date, max_cycle, is_captcha, total_point)
                message = "'%s' 주제가 등록되었습니다. 다른 의뢰자가 등록한 같은 주제가 존재합니다."%(request.subject)
                return CreateRequest(
                        message=Message(status=True, message=message),
                        idx=request.idx
                    )

"""
mutation{
  updateRequest(
    idx:25
    subject:"강아지 코 추출",
    description:"비문 인식 연구에 대한 강아지 코 추출 라벨링 주제 입니다."
    dueDate:"2020-06-30"
    startDate:"2020-04-30"
    totalPoint:100
    maxCycle:10
    token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwiZXhwIjoxNTg3NTYzMTM5LCJvcmlnX2lhdCI6MTU4Njk1ODMzOSwiZW1haWwiOiJyZXF1ZXN0ZXIyQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicmVxdWVzdGVyMiJ9.G7HOd7s1rANvNUCHpSBrsf5zzduy33YOq7gR-LBG8D4"
    category:"이미지 캡쳐 라벨링"
    state:"RUN"
    isCaptcha:false
  ) {
    message{
      status
      message
    }
    idx
  }
}
"""
class UpdateRequest(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        idx = graphene.Int()
        category = graphene.String()
        subject = graphene.String()
        description = graphene.String()
        start_date = graphene.Date()
        due_date = graphene.Date()
        max_cycle = graphene.Int()
        total_point = graphene.Int()
        is_captcha = graphene.Boolean()
        state = graphene.String()
        token = graphene.String()

    @only_user
    @only_requester
    def mutate(self, info, idx, category, subject, description, start_date, due_date, max_cycle, total_point, is_captcha, state, token):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        category = Category.objects.get(name=category)
        try:
            request = Request.objects.get(idx=idx)
            update = Request(user=user, category=category, subject=subject, description=description, 
                            start_date=str(start_date), due_date=str(due_date), 
                            max_cycle=max_cycle, total_point=total_point, is_captcha=is_captcha, state=state)
            try:
                update.clean()
            except ValidationError as e:
                return UpdateRequest(message=Message(status=False, message=str(e)))
            else:
                request.category = category
                request.subject = subject
                request.description = description
                request.start_date = start_date
                request.due_date = due_date
                request.max_cycle = max_cycle
                request.total_point = total_point
                request.is_captcha = is_captcha
                request.state = state
                request.save()
                message = "'%s'주제가 정상적으로 수정되었습니다."%(request.subject)
                return UpdateRequest(
                    message=Message(status=True, message=message),
                    idx=category.idx
                )
        except Exception as ex:
            return UpdateRequest(message=Message(status=False, message="수정 요청한 인스턴스가 존재하지 않습니다."+str(ex)))

"""
mutation{
  takeProject(
    requestIdx:25
    token:"사용자/관리자"
  ){
    message{
      status
      message
    }
    idx
  }
}
"""
class TakeProject(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        request_idx = graphene.Int()
        token = graphene.String()

    @only_user
    def mutate(self, info, request_idx, token):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        try:
            request = Request.objects.get(idx=request_idx)
        except:
            message = "해당하는 프로젝트가 존재하지 않습니다."
            return TakeProject(message=Message(status=False, message=message))
        else:
            try:
                res = Labeling.objects.exclude().get(user=user, request=request)
                message = "이미 등록하신 프로젝트입니다."
                return TakeProject(message=Message(status=False, message=message))
            except:
                if request.state != 'RUN':
                    message = "승인전/마감된 프로젝트 입니다."
                    return TakeProject(message=Message(status=False, message=message))
                new_labeling = Labeling(request=request, user=user, end_date=request.due_date)
                try:
                    new_labeling.clean()
                except ValidationError as e:
                    return TakeProject(message=Message(status=False, message=str(e)))
                else:
                    new_labeling.save()
                    message = "'%s'님 '%%s' 주제가 정상적으로 등록되었습니다."%(user.username)%(request.subject)
                    return TakeProject(message=Message(status=True, message=message))


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

    # TODO: get_labeler_taken_project = grapehene.Field(Request, token=grapehene.Stirng())