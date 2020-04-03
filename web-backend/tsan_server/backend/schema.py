import graphene
from .forms import UserForm
from .models import Dataset, User
from django.contrib.auth import login

class Message(graphene.ObjectType):
    status = graphene.Boolean() # True = 정상, False = 에러
    message = graphene.String() # 반환 메시지 (예: 비밀번호가 서로 일치하지 않습니다.)

"""
mutation {
  createAccount(email:"jtjisgod@gmail.com", password:"password", username:"asdfasdf") {
    message {
      status
      message
    }
  }
}
"""
class CreateAccount(graphene.Mutation):
    message = graphene.Field(Message)

    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()
        phone = graphene.String()

    def mutate(self, info, username, email, password, phone):
        try:
            res = User.objects.exclude().get(username=username)
            return CreateAccount(message=Message(status=False, message="이미 존재하는 아이디입니다."))
        except:
            new_user = User.objects.create_user(username=username, email=email, password=password)
            return CreateAccount(message=Message(status=True, message="정상적으로 가입되었습니다."))

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

    def mutate(self, info, name):
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