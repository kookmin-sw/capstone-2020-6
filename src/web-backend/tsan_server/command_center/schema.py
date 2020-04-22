import graphene

class TestObject(graphene.ObjectType):
    text = graphene.String()
    arr = graphene.List(graphene.String)

class Query(graphene.ObjectType):
    get_hello_world = graphene.Field(TestObject)
    def resolve_get_hello_world(self, info, **kwargs):
        arr = ["aaaaa", "91i9d21ujd9812d", "ccccccc"]
        return TestObject(text="HelloWorld", arr=arr)

schema = graphene.Schema(query=Query)