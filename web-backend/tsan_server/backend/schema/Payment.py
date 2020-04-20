import graphene
from backend.models import Dataset, User, PaymentLog, Request
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

class PaymentLogType(DjangoObjectType):
    class Meta:
        model = PaymentLog

class PaymentLogs(graphene.ObjectType):
    message = graphene.Field(Message)
    paymentlogs = graphene.List(PaymentLogType)

"""
mutation{
  createPaymentlog(
    type:"3",
    requestIdx:25,
    note:"베스킨라빈스 쿼터 구매",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnX2lhdCI6MTU4NzE0NzkyMCwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTU4Nzc1MjcyMCwiZW1haWwiOiJhZG1pbkB0c2FuLnRlY2giLCJ1c2VyX2lkIjoxfQ.yJyU5rhg5-vWVnVSQkDQNvQXlE43l4pDCD2ZazMnTDE"
  ){
    message{
      status
      message
    }
    idx
  }
}
"""
class CreatePaymentLog(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        type = graphene.String()
        request_idx = graphene.Int()
        note = graphene.String()
        token = graphene.String()

    @only_user
    def mutate(self, info, type, request_idx, note, token):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        request = Request.objects.get(idx=request_idx)
        new_payment = PaymentLog(type=type, user=user, request=request, note=note)
        try:
            res = Labeling.objects.get(user=user, request=request)
        except:
            # 라벨링 참여 테이블을 사용하여 참여 기록 check
            message = "'%s'님은 '%s'프로젝트를 참여한 기록이 없습니다."%(user.username, request.subject)
            return CreatePaymentLog(message=Message(status=False, message=message))
        else:
            try:
                new_payment.clean()
            except ValidationError as e:
                return CreatePaymentLog(message=Message(status=False, message=str(e)))
            else:
                new_payment.save()
                message = "포인트 지급내역이 정상적으로 작성되었습니다."
                return CreatePaymentLog(
                    message=Message(status=True, message=message),
                    idx=new_payment.idx)

class Query(graphene.ObjectType):
    """
    query{
    getAllPaymentlog(token:""){
        message{
        status
        message
        }
        paymentlogs{
        idx
        type
        user{
            username
            password
            email
            phone
            point
        }
        request{
            user{
            email
            password
            }
            category{
            name
            }
            subject
            description
            dueDate
        }
        note
        }
    }
    }
    """
    # 모든 금액 지급 내역 반환
    get_all_paymentlog = graphene.Field(PaymentLogs, token=graphene.String())
    @only_user
    @only_admin
    def resolve_get_all_paymentlog(self, info, token):
        paymentlogs = PaymentLog.objects.all()
        for paymentlog in paymentlogs:
            # paymentlog의 user 개인 정보 마스킹 처리
            paymentlog.user.password = "*****"
            paymentlog.user.email = paymentlog.user.email.split("@")[0][0:3] + "****" +\
                 "@" + paymentlog.user.email.split("@")[1]
            # paymentlog.request의 user 개인 정보 마스킹 처리
            paymentlog.request.user.password = "*****"
            paymentlog.request.user.email = paymentlog.request.user.email.split("@")[0][0:3] + "****" +\
                 "@" + paymentlog.request.user.email.split("@")[1]
        return PaymentLogs(message=Message(status=True, message=""), paymentlogs=paymentlogs)
