import graphene
import datetime
from django.utils import timezone
from mongodb import db
from django.db.models import Q
from backend.models import Dataset, User, Category, Request, Labeling, Keyword
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


class LabelingType(DjangoObjectType):
    class Meta:
        model = Labeling


class Labelings(graphene.ObjectType):
    message = graphene.Field(Message)
    labelings = graphene.List(LabelingType)


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
        token = graphene.String()

    @only_user
    @only_admin
    def mutate(self, info, name, token):
        try:
            Dataset.objects.get(name=name)
            return CreateDataset(message=Message(status=False, message="이미 존재하는 데이터셋 이름입니다."))
        except:
            dataset = Dataset()
            dataset.create(name=name)
            message = "'%s'가 생성되었습니다." % (dataset.name)
            return CreateDataset(
                message=Message(status=True, message=message),
                idx=dataset.idx
            )


"""
mutation{
  createRequest(
    subject:"강아지 코 추출",
    thumbnail:"~~testURL.jpg"
    description:"비문 인식 연구에 대한 강아지 코 추출 라벨링 주제 입니다."
    startDate:"2020-05-12"
    endDate:"2020-09-30"
    totalPoint:100
    maxCycle:10
    token:""
    category:1
    onelineDescription:"test"
    dataset:1
    countDataset:1
    keywords:"test"
    isCaptcha:false
  ) {
  	message{
      status
      message
    }
  }
}
"""


class CreateRequest(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        token = graphene.String()
        category = graphene.Int()
        subject = graphene.String()
        thumbnail = graphene.String()
        description = graphene.String()
        oneline_description = graphene.String()
        start_date = graphene.String()
        end_date = graphene.String()
        max_cycle = graphene.Int()
        total_point = graphene.Int()
        is_captcha = graphene.Boolean()
        dataset = graphene.Int()
        count_dataset = graphene.Int()
        keywords = graphene.String()

    @only_user
    @only_requester
    def mutate(
            self,
            info,
            token,
            category,
            subject,
            thumbnail,
            description,
            oneline_description,
            start_date,
            end_date,
            max_cycle,
            total_point,
            is_captcha,
            dataset,
            count_dataset,
            keywords
    ):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])

        # 의뢰자의 포인트 확인
        if user.point < total_point:
            message = "회원님은 %d 포인트가 부족합니다. 충전 후 다시 프로젝트를 등록 해주세요." % (total_point - user.point)
            return CreateRequest(message=Message(status=False, message=message))

        category = Category.objects.get(idx=category)
        dataset = Dataset.objects.get(idx=dataset)

        exist_subject = Request.objects.filter(subject=subject).exists()
        own = Request.objects.filter(Q(user_id=user.id) & Q(subject=subject)).exists()
        print('own: ', own)
        if own:
            # 같은 주제가 이미 등록되어있는 경우
            # 동일 인물이 시도할 경우: 등록 불가
            return CreateRequest(message=Message(status=False, message="회원님은 이미 같은 주제로 등록하신 프로젝트가 있습니다."))
        else:
            # 의뢰자 포인트 차감
            user.point = user.point - total_point
            user.save()

            request = Request(
                user=user,
                category=category,
                subject=subject,
                thumbnail=thumbnail,
                description=description,
                oneline_description=oneline_description,
                start_date=datetime.datetime.strptime(start_date, "%Y-%m-%d"),
                end_date=datetime.datetime.strptime(end_date, "%Y-%m-%d"),
                current_cycle=0,
                max_cycle=max_cycle,
                total_point=total_point,
                is_captcha=is_captcha,
                dataset=dataset,
                count_dataset=count_dataset
            )
            request.save()

            keywords = [x.strip().strip("#") for x in keywords.split("#")]
            for keyword in keywords:
                k = Keyword(request=request, name=keyword)
                k.save()

            rows = db.text_dataset.aggregate(
                [{
                    "$sample": {
                        "size": 1000
                    }
                }, {
                    "$project": {
                        "_id": True
                    }
                }]
            )

            db.assigned_dataset.insert_one({"request": request.idx, "dataset": [x['_id'] for x in rows]})

            # 같은 주제가 이미 등록되어있는 경우
            # 다른 사람이 시도할 경우: 등록 가능
            if exist_subject:
                message = "'%s' 주제가 등록되었습니다. 다른 의뢰자가 등록한 같은 주제가 존재합니다. 남은 포인트 %d 입니다." % (request.subject, user.point)
                return CreateRequest(
                    message=Message(status=True, message=message),
                    idx=request.idx
                )
            # 주제가 처음 등록된 경우
            else:
                message = "'%s' 주제가 등록되었습니다. 남은 포인트 %d 입니다." % (request.subject, user.point)
                return CreateRequest(
                    message=Message(status=True, message=message),
                    idx=request.idx
                )


"""
mutation{
  updateRequest(
    idx:8
    subject:"강아지 코 추출",
    description:"비문 인식 연구에 대한 강아지 코 추출 라벨링 주제 입니다."
    dueDate:"2020-06-30"
    startDate:"2020-04-30"
    totalPoint:100
    maxCycle:10
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnX2lhdCI6MTU4ODE2MTU2MCwiZXhwIjoxNTg4NzY2MzYwLCJ1c2VyX2lkIjoyMCwidXNlcm5hbWUiOiJyZXF1ZXN0ZXIyIiwiZW1haWwiOiJyZXF1ZXN0ZXIyQGdtYWlsLmNvbSJ9.i3TONRAFTzLGyv3JpnbaLSxXuXpMuAkhiym7KyBQRR0"
    category:"이미지 캡쳐 라벨링"
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
        category = graphene.Int()
        subject = graphene.String()
        thumbnail = graphene.String()
        description = graphene.String()
        oneline_description = graphene.String()
        start_date = graphene.String()
        end_date = graphene.String()
        max_cycle = graphene.Int()
        total_point = graphene.Int()
        is_captcha = graphene.Boolean()
        dataset = graphene.Int()
        count_dataset = graphene.Int()
        token = graphene.String()

    @only_user
    @only_requester
    def mutate(
            self,
            info,
            idx,
            category,
            subject,
            thumbnail,
            description,
            oneline_description,
            start_date,
            end_date,
            max_cycle,
            total_point,
            is_captcha,
            dataset,
            count_dataset,
            token
    ):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        category = Category.objects.get(idx=category)
        dataset = Dataset.objects.get(idx=dataset)
        try:
            request = Request.objects.get(idx=idx)
            update = Request(
                user=user,
                category=category,
                subject=subject,
                thumbnail=thumbnail,
                description=description,
                oneline_description=oneline_description,
                start_date=str(datetime.datetime.strptime(start_date, "%Y-%m-%d")),
                end_date=str(datetime.datetime.strptime(end_date, "%Y-%m-%d")),
                max_cycle=max_cycle,
                total_point=total_point,
                is_captcha=is_captcha,
                dataset=dataset,
                count_dataset=count_dataset,
                state=request.state
            )
            try:
                update.clean()
            except ValidationError as e:
                return UpdateRequest(message=Message(status=False, message=str(e)))
            else:
                request.category = category
                request.subject = subject
                request.thumbnail = thumbnail
                request.description = description
                request.oneline_description = oneline_description
                request.start_date = start_date
                request.end_date = end_date
                request.max_cycle = max_cycle
                request.total_point = total_point
                request.is_captcha = is_captcha
                request.dataset = dataset
                request.count_dataset = count_dataset
                request.save()
                message = "'%s'주제가 정상적으로 수정되었습니다." % (request.subject)
                return UpdateRequest(
                    message=Message(status=True, message=message),
                    idx=request.idx
                )
        except Exception as ex:
            return UpdateRequest(
                message=Message(status=False, message="수정 요청한 인스턴스가 존재하지 않습니다." + str(ex))
            )


"""
mutation{
  startRequest(
    idx:25
    token:"의뢰자, 관리자"
  ) {
    message{
      status
      message
    }
    idx
  }
}
"""


# StartRequest는 프로젝트를 임의적으로 시작시키는 함수이다.
# start_date = 현재 날짜, state = 'RUN'으로 변경됨.
class StartRequest(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        idx = graphene.Int()
        token = graphene.String()

    @only_user
    @only_requester
    def mutate(self, info, idx, token):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        try:
            request = Request.objects.get(idx=idx)
            now = datetime.datetime.now()
            update = Request(user=user, category=request.category, thumbnail=request.thumbnail, subject=request.subject,
                             description=request.description,
                             start_date=str(now), end_date=str(request.end_date),
                             max_cycle=request.max_cycle, total_point=request.total_point,
                             is_captcha=request.is_captcha, state='RUN')
            try:
                update.clean()
            except ValidationError as e:
                return StartRequest(message=Message(status=False, message=str(e)))
            else:
                request.start_date = now
                request.state = 'RUN'
                request.save()
                message = "'%s'주제가 정상적으로 시작되었습니다." % (request.subject)
                return StartRequest(
                    message=Message(status=True, message=message),
                    idx=request.idx
                )
        except Exception as ex:
            return StartRequest(message=Message(status=False, message="수정 요청한 인스턴스가 존재하지 않습니다." + str(ex)))


"""
mutation{
  endRequest(
    idx:25
    token:"의뢰자/관리자"
  ) {
    message{
      status
      message
    }
    idx
  }
}
"""


# EndRequest는 프로젝트를 임의적으로 종료(end, not stop)시키는 함수이다.
# end_date = 현재 날짜, state = 'END'으로 변경됨.
class EndRequest(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        idx = graphene.Int()
        token = graphene.String()

    @only_user
    @only_requester
    def mutate(self, info, idx, token):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        try:
            request = Request.objects.get(idx=idx)
            now = datetime.datetime.now()
            update = Request(user=user, category=request.category, thumbnail=request.thumbnail, subject=request.subject,
                             description=request.description,
                             start_date=str(request.start_date), end_date=str(now),
                             max_cycle=request.max_cycle, total_point=request.total_point,
                             is_captcha=request.is_captcha, state='END')
            try:
                update.clean()
            except ValidationError as e:
                return EndRequest(message=Message(status=False, message=str(e)))
            else:
                request.end_date = now
                request.state = 'END'
                request.save()
                message = "'%s'주제가 정상적으로 종료되었습니다." % (request.subject)
                return EndRequest(
                    message=Message(status=True, message=message),
                    idx=request.idx
                )
        except Exception as ex:
            return EndRequest(message=Message(status=False, message="수정 요청한 인스턴스가 존재하지 않습니다." + str(ex)))

class EndUpdate(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        idx = graphene.Int()
        cycle = graphene.Int()
        token = graphene.String()

    @only_user
    @only_requester
    def mutate(self, info, idx, cycle, token):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        try:
            request = Request.objects.get(idx=idx)
            update = Request(user=user, category=request.category, thumbnail=request.thumbnail, subject=request.subject,
                             description=request.description,
                             start_date=str(request.start_date), end_date=str(request.end_date),
                             max_cycle=request.max_cycle, total_point=request.total_point,
                             is_captcha=request.is_captcha, state='END',
                             current_cycle=cycle)
            try:
                update.clean()
            except ValidationError as e:
                return EndRequest(message=Message(status=False, message=str(e)))
            else:
                request.current_cycle = cycle
                request.save()
                message = "수정 완"
                return EndRequest(
                    message=Message(status=True, message=message),
                    idx=request.idx
                )
        except Exception as ex:
            return EndRequest(message=Message(status=False, message="수정 요청한 인스턴스가 존재하지 않습니다." + str(ex)))


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
                new_labeling = Labeling(request=request, user=user, end_date=request.end_date)
                try:
                    new_labeling.clean()
                except ValidationError as e:
                    return TakeProject(message=Message(status=False, message=str(e)))
                else:
                    new_labeling.save()
                    message = "'%s'님 '%%s' 주제가 정상적으로 등록되었습니다." % (user.username) % (request.subject)
                    return TakeProject(message=Message(status=True, message=message))


"""
mutation{
  deleteLabelerTakenProject(
    idx:5
    token:"관리자"
  ){
    message{
      status
      message
    }
  }
}
"""


# DeleteLabelerTakenProject는 참여자가 신청한 특정 프로젝트를 삭제하는 함수이다.
class DeleteLabelerTakenProject(graphene.Mutation):
    message = graphene.Field(Message)

    class Arguments:
        idx = graphene.Int()
        token = graphene.String()

    @only_user
    @only_admin
    def mutate(self, info, idx, token):
        try:
            labeling = Labeling.objects.get(idx=idx)
        except:
            message = "해당하는 인스턴스가 존재하지 않습니다."
            return DeleteLabelerTakenProject(
                message=Message(status=False, message=message)
            )
        else:
            deleted_labeling = labeling
            labeling.delete()
            message = "'%s' 참여 프로젝트 목록이 정상적으로 삭제되었습니다." % (deleted_labeling.request.subject)
            return DeleteLabelerTakenProject(
                message=Message(status=True, message=message)
            )


"""
mutation{
  deleteRequest(
    idx:5
    token:"관리자"
  ){
    message{
      status
      message
    }
  }
}
"""


# DeleteRequest는 특정 프로젝트를 삭제하는 함수이다.
class DeleteRequest(graphene.Mutation):
    message = graphene.Field(Message)

    class Arguments:
        idx = graphene.Int()
        token = graphene.String()

    @only_user
    @only_admin
    def mutate(self, info, idx, token):
        try:
            request = Request.objects.get(idx=idx)
        except:
            message = "해당하는 인스턴스가 존재하지 않습니다."
            return DeleteRequest(
                message=Message(status=False, message=message)
            )
        else:
            deleted_request = request
            request.delete()
            message = "'%s' 프로젝트가 정상적으로 삭제되었습니다." % (deleted_request.subject)
            return DeleteRequest(
                message=Message(status=True, message=message)
            )


class Query(graphene.ObjectType):
    """
    query {
    getAllRequest {
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
        endDate
        currentCycle
        maxCycle
        totalPoint
        }
    }
    }

    # 원하는 인자를 사용하여 해당 필드로 정렬 가능 (앞에 '-' 붙이면 해당 필드에 대해 내림차순)
    query {
    getAllRequest(orderby:"start_date") {
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
        endDate
        currentCycle
        maxCycle
        totalPoint
        }
    }
}

    # offset : 몇 부터 (0 이면 처음것 부터), limit : 몇 개
    query {
    getAllRequest(
      offset: 1,
      limit: 2
    ) {
        생략...

    """
    get_all_request = graphene.Field(Requests,
                                     orderby=graphene.String(required=False),
                                     offset=graphene.Int(required=False),
                                     limit=graphene.Int(required=False)
                                     )

    def resolve_get_all_request(self, info, **kwargs):
        requests = Request.objects.all()
        if requests is not None:
            for request in requests.iterator():
                request.refresh_state()

        order = kwargs.get("orderby", None)
        offset = kwargs.get("offset", None)
        limit = kwargs.get("limit", None)

        if offset and limit:
            if order:
                requests = Request.objects.all().order_by(order, '-idx')[offset:offset + limit]  # 인자값 순, 최신 등록 순
            else:
                requests = Request.objects.all().order_by('-idx')[offset:offset + limit]  # 최신 등록 순
        else:
            if order:
                requests = Request.objects.all().order_by(order, '-idx')  # 인자값 순, 최신 등록 순
            else:
                requests = Request.objects.all().order_by('-idx')  # 최신 등록 순

        for request in requests:
            if request.user is not None:
                request.user.password = "*****"
                request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + \
                                     request.user.email.split("@")[1]
        return Requests(message=Message(status=True, message=""), requests=requests)

    """
    query {
    getRequesterRequest(token:"외뢰자/관리자") {
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
        endDate
        currentCycle
        maxCycle
        totalPoint
        }
    }
    }
    """
    # 특정 의뢰자에 대한 주제 반환
    get_requester_request = graphene.Field(Requests,
                                           token=graphene.String(),
                                           offset=graphene.Int(required=False),
                                           limit=graphene.Int(required=False)
                                           )

    @only_user
    @only_requester
    def resolve_get_requester_request(self, info, token, **kwargs):
        requests = Request.objects.all()
        if requests is not None:
            for request in requests.iterator():
                request.refresh_state()

        offset = kwargs.get("offset", None)
        limit = kwargs.get("limit", None)

        res = jwt_decode_handler(token)
        users = User.objects.get(username=res['username'])

        if offset and limit:
            request_rows = Request.objects.filter(user=users).order_by('-idx')[offset:offset + limit]
        else:
            request_rows = Request.objects.filter(user=users).order_by('-idx')

        for request in request_rows:
            if request.user is not None:
                request.user.password = "*****"
                request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + \
                                     request.user.email.split("@")[1]
        if request_rows:
            return Requests(message=Message(status=True, message=""), requests=request_rows)
        else:
            return Requests(message=Message(status=True, message="해당 주제 목록이 없습니다."), requests=request_rows)

    """
    query{
    getLabelerTakenProject {
        message {
            status
            message
            }
                labelings{
            idx
            user {
                id
                username
                password
                email
                }
            request {
            idx
            category {
                name
                type
            }
            subject
            description
            startDate
            endDate
            currentCycle
            maxCycle
            totalPoint
            }
            }  
    }
    }
    """
    # TODO: get_labeler_taken_project = grapehene.Field(Request, token=grapehene.Stirng())
    # GetLabelerTakenProject는 참여자가 신청한 특정 라벨링 프로젝트를 조회하는 함수이다.
    # 프로젝트 목록과 해당 프로젝트의 세부사항까지 선택적으로 조회할 수 있다.
    get_labeler_taken_project = graphene.Field(Labelings, token=graphene.String())

    @only_user
    def resolve_get_labeler_taken_project(self, info, token):
        res = jwt_decode_handler(token)
        users = User.objects.get(username=res['username'])
        labelings = Labeling.objects.filter(user=users)
        for labeling in labelings:
            if labeling.user is not None:
                labeling.user.password = "*****"
                labeling.user.email = labeling.user.email.split("@")[0][0:3] + "****" + \
                                      "@" + labeling.user.email.split("@")[1]
            if labeling.request.user is not None:
                labeling.request.user.password = "*****"
                labeling.request.user.email = labeling.request.user.email.split("@")[0][0:3] + "****" + "@" + \
                                              labeling.request.user.email.split("@")[1]
        if labelings:
            return Labelings(message=Message(status=True, message=""), labelings=labelings)
        else:
            return Labelings(message=Message(status=True, message="해당 주제 목록이 없습니다."), labelings=labelings)

    """
    query {
    getStateRequest(state:"RED") {
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
        endDate
        currentCycle
        maxCycle
        totalPoint
        }
    }
    }
    
    
    query {
    getStateRequest(state:"END", offset:1, limit:5) {
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
        endDate
        currentCycle
        maxCycle
        totalPoint
        }
    }
    }
    """
    # 특정 state에 대한 주제 반환
    get_state_request = graphene.Field(Requests,
                                       state=graphene.String(),
                                       offset=graphene.Int(required=False),
                                       limit=graphene.Int(required=False)
                                       )

    def resolve_get_state_request(self, info, state, **kwargs):
        requests = Request.objects.all()
        if requests is not None:
            for request in requests.iterator():
                request.refresh_state()

        offset = kwargs.get("offset", None)
        limit = kwargs.get("limit", None)

        if offset and limit:
            request_rows = Request.objects.filter(state=state).order_by('-idx')[offset:offset + limit]
        else:
            request_rows = Request.objects.filter(state=state).order_by('-idx')

        for request in request_rows:
            if request.user is not None:
                request.user.password = "*****"
                request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + \
                                     request.user.email.split("@")[1]
        if request_rows:
            message = "'%s' 상태에 대한 주제 목록 반환" % (request.state)
            return Requests(message=Message(status=True, message=message),
                            requests=request_rows
                            )
        else:
            return Requests(message=Message(status=True, message="해당 주제 목록이 없습니다."),
                            requests=request_rows
                            )

    """
query{ 
    getIdxRequest(idx:1) {
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
      endDate
      currentCycle
      maxCycle
      totalPoint
    }
  }
}
    """
    # 특정 id에 대한 주제 반환
    get_idx_request = graphene.Field(Requests, idx=graphene.Int())

    def resolve_get_idx_request(self, info, idx):
        requests = Request.objects.all()
        if requests is not None:
            for request in requests.iterator():
                request.refresh_state()

        request_rows = Request.objects.filter(idx=idx)
        for request in request_rows:
            if request.user is not None:
                request.user.password = "*****"
                request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + \
                                     request.user.email.split("@")[1]
        if request_rows:
            message = "'%d'번 주제 목록 반환" % (request.idx)
            return Requests(message=Message(status=True, message=message), requests=request_rows)
        else:
            return Requests(message=Message(status=True, message="해당 주제 목록이 없습니다."), requests=request_rows)

    """
    query {
        getSubjectRequest(keyword:"강아지") {
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
            endDate
            currentCycle
            maxCycle
            totalPoint
            }
        }
        }
    """
    # 부분적 request 제목(subject)에 대한 주제 반환
    get_subject_request = graphene.Field(Requests, keyword=graphene.String())

    def resolve_get_subject_request(self, info, keyword):
        requests = Request.objects.all()
        if requests is not None:
            for request in requests.iterator():
                request.refresh_state()

        request_rows = Request.objects.filter(subject__icontains=keyword)
        if request_rows:
            for request in request_rows:
                if request.user is not None:
                    request.user.password = "*****"
                    request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + \
                                         request.user.email.split("@")[1]
            message = "'%s'에 대한 주제 목록 반환" % (keyword)
            return Requests(message=Message(status=True, message=message), requests=request_rows)
        else:
            return Requests(message=Message(status=True, message="해당 주제 목록이 없습니다."), requests=request_rows)

    """
    query {
            getSubjectRunningRequest(keyword:"강아지") {
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
                endDate
                currentCycle
                maxCycle
                totalPoint
                }
            }
        }
    """
    # state='RUN' 일 때 키워드로 request 제목(subject) 찾기
    get_subject_running_request = graphene.Field(Requests, keyword=graphene.String())

    def resolve_get_subject_running_request(self, info, keyword):
        requests = Request.objects.all()
        if requests is not None:
            for request in requests.iterator():
                request.refresh_state()

        request_rows = Request.objects.filter(state='RUN', subject__icontains=keyword)
        if request_rows:
            for request in request_rows:
                if request.user is not None:
                    request.user.password = "*****"
                    request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + \
                                         request.user.email.split("@")[1]
            message = "'%s'에 대한 주제 목록 반환" % (keyword)
            return Requests(message=Message(status=True, message=message), requests=request_rows)
        else:
            return Requests(message=Message(status=True, message="해당 주제 목록이 없습니다."), requests=request_rows)

    """
    query {
            getSubjectEndRequest(keyword:"강아지") {
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
                endDate
                currentCycle
                maxCycle
                totalPoint
                }
            }
        }
    """
    # state='END' 일 때 키워드로 request 제목(subject) 찾기
    get_subject_end_request = graphene.Field(Requests, keyword=graphene.String())

    def resolve_get_subject_end_request(self, info, keyword):
        requests = Request.objects.all()
        if requests is not None:
            for request in requests.iterator():
                request.refresh_state()

        request_rows = Request.objects.filter(state='END', subject__icontains=keyword)
        if request_rows:
            for request in request_rows:
                if request.user is not None:
                    request.user.password = "*****"
                    request.user.email = request.user.email.split("@")[0][0:3] + "****" + "@" + \
                                         request.user.email.split("@")[1]
            message = "'%s'에 대한 주제 목록 반환" % (keyword)
            return Requests(message=Message(status=True, message=message), requests=request_rows)
        else:
            return Requests(message=Message(status=True, message="해당 주제 목록이 없습니다."), requests=request_rows)

