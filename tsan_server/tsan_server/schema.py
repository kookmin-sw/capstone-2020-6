import graphene
from backend.schema import CreateAccount, CreateDataset

class TestObject(graphene.ObjectType):
    text = graphene.String()
    arr = graphene.List(graphene.String)

class Mutation(graphene.ObjectType):
    create_account = CreateAccount.Field()
    create_database = CreateDataset.Field()

class Query(graphene.ObjectType):
    get_hello_world = graphene.Field(TestObject)
    def resolve_get_hello_world(self, info, **kwargs):
        arr = ["aaaaa", "91i9d21ujd9812d", "ccccccc"]
        return TestObject(text="HelloWorld", arr=arr)

schema = graphene.Schema(query=Query, mutation=Mutation)