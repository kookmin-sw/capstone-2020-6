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
    token:"참여자/의뢰자/관리자"
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
        request_idx = graphene.Int()  # type: 보상일때만 기입
        note = graphene.String()
        token = graphene.String()

    @only_user
    def mutate(self, info, type, request_idx, note, token):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        # 보상일 때
        if type == 0:
            try:
                request = Request.objects.get(idx=request_idx)
            except:
                message = "해당하는 프로젝트가 존재하지 않습니다."
                return CreatePaymentLog(message=Message(status=False, message=message))
            else:
                new_payment = PaymentLog(type=type, user=user, request=request, note=note)
                try:
                    res = Labeling.objects.get(user=user, request=request)
                except:
                    # 라벨링 참여 테이블을 사용하여 참여 기록 check
                    message = "'%s'님은 '%s'프로젝트를 참여한 기록이 없습니다." % (user.username, request.subject)
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
        else:
            new_payment = PaymentLog(
                type=type,
                user=user,
                request=None,
                note=note
            )
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


"""
mutation{
  updatePaymentlog(
    idx: 1
    type:"3",
    requestIdx:25,
    note:"CJ 1만원 상품권 구매",
    token:"관리자"
  ){
    message{
      status
      message
    }
    idx
  }
}
"""


class UpdatePaymentLog(graphene.Mutation):
    message = graphene.Field(Message)
    idx = graphene.Int()

    class Arguments:
        idx = graphene.Int()
        type = graphene.String()  # 수정 가능
        request_idx = graphene.Int()  # 수정 가능
        note = graphene.String()  # 수정 가능
        token = graphene.String()

    @only_user
    @only_admin
    def mutate(self, info, idx, type, request_idx, note, token):
        res = jwt_decode_handler(token)
        user = User.objects.get(username=res['username'])
        try:
            request = Request.objects.get(idx=request_idx)
        except:
            message = "해당하는 프로젝트가 존재하지 않습니다."
            return CreatePaymentLog(message=Message(status=False, message=message))
        else:
            try:
                paymentlog = PaymentLog.objects.get(idx=idx)
                update = PaymentLog(type=type, user=user, request=request, note=note)
                try:
                    update.clean()
                except ValidationError as e:
                    return UpdatePaymentLog(message=Message(status=False, message=str(e)))
                else:
                    paymentlog.type = type
                    paymentlog.note = note
                    paymentlog.request = request
                    paymentlog.save()
                    message = "지급 내역이 정상적으로 수정되었습니다."
                    return UpdatePaymentLog(
                        message=Message(status=True, message=message),
                        idx=paymentlog.idx
                    )
            except:
                return UpdatePaymentLog(message=Message(status=False, message="수정 요청한 인스턴스가 존재하지 않습니다."))


"""
mutation{
  deletePaymentlog(
    idx:1
    token:"관리자"
  ){
    message{
      status
      message
    }
  }
}
"""


# DeletePaymentLog는 지급 내역을 삭제하는 함수이다.
class DeletePaymentLog(graphene.Mutation):
    message = graphene.Field(Message)

    class Arguments:
        idx = graphene.Int()
        token = graphene.String()

    @only_user
    @only_admin
    def mutate(self, info, idx, token):
        try:
            paymentlog = PaymentLog.objects.get(idx=idx)
        except:
            message = "해당하는 인스턴스가 존재하지 않습니다."
            return DeletePaymentLog(
                message=Message(status=False, message=message)
            )
        else:
            paymentlog.delete()
            message = "지급 내역이 정상적으로 삭제되었습니다."
            return DeletePaymentLog(
                message=Message(status=True, message=message)
            )


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
            if paymentlog.user is not None:
                # paymentlog의 user 개인 정보 마스킹 처리
                paymentlog.user.password = "*****"
                paymentlog.user.email = paymentlog.user.email.split("@")[0][0:3] + "****" + \
                                        "@" + paymentlog.user.email.split("@")[1]
            if paymentlog.request.user is not None:
                # paymentlog.request의 user 개인 정보 마스킹 처리
                paymentlog.request.user.password = "*****"
                paymentlog.request.user.email = paymentlog.request.user.email.split("@")[0][0:3] + "****" + \
                                                "@" + paymentlog.request.user.email.split("@")[1]
        return PaymentLogs(message=Message(status=True, message=""), paymentlogs=paymentlogs)
