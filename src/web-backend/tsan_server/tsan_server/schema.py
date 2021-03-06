import graphene
from graphene_django.types import DjangoObjectType

from backend import models
from backend import schema
from backend.schema.User import CreateAccount, LoginAccount, Message, UpdateAccount, DeleteUser, AddPoint, \
    UpdatePassword, reliabilityUpdate
from backend.schema.Dataset import CreateDataset
from backend.schema.Category import CreateCategory, UpdateCategory
from backend.schema.Project import CreateRequest, UpdateRequest, StartRequest, EndRequest, TakeProject, \
    DeleteLabelerTakenProject, GetItem, SubmitLabel, EndUpdate, IncCurrentCycle, Reward, SubmitLabels, \
    VerifyRequest, RewordedRequest, VerifiedRequest, GetLabelResultOfRequester, GetLabelResultOfLabeler
from backend.schema.Payment import CreatePaymentLog, UpdatePaymentLog, DeletePaymentLog

from command_center.schema import Dataset

from rest_framework_jwt.serializers import (
    JSONWebTokenSerializer,
    RefreshJSONWebTokenSerializer,
    jwt_decode_handler
)

from backend.utils import only_user, only_admin, only_requester


class Mutation(graphene.ObjectType):
    add_point = AddPoint.Field()
    create_account = CreateAccount.Field()
    create_dataset = CreateDataset.Field()
    create_category = CreateCategory.Field()
    login_account = LoginAccount.Field()
    create_request = CreateRequest.Field()
    update_category = UpdateCategory.Field()
    update_account = UpdateAccount.Field()
    update_request = UpdateRequest.Field()
    create_paymentlog = CreatePaymentLog.Field()
    update_paymentlog = UpdatePaymentLog.Field()
    submit_label = SubmitLabel.Field()
    take_project = TakeProject.Field()
    start_request = StartRequest.Field()
    end_request = EndRequest.Field()
    submit_labels = SubmitLabels.Field()
    delete_user = DeleteUser.Field()
    delete_paymentlog = DeletePaymentLog.Field()
    delete_labeler_taken_project = DeleteLabelerTakenProject.Field()
    update_password = UpdatePassword.Field()
    test = EndUpdate.Field()
    getItem = GetItem.Field()
    inc_current_cycle = IncCurrentCycle.Field()
    reward = Reward.Field()
    update_reliability = reliabilityUpdate.Field()
    verify_request = VerifyRequest.Field()
    verified_request = VerifiedRequest.Field()
    rewarded_request = RewordedRequest.Field()
    get_label_result_of_requester = GetLabelResultOfRequester.Field()
    get_label_result_of_labeler = GetLabelResultOfLabeler.Field()



class Query(
    schema.User.Query,
    schema.Category.Query,
    schema.Project.Query,
    schema.Dataset.Query,
    schema.Payment.Query,

    Dataset.Query
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
