from django import forms
from django.contrib.auth.models import User
from backend.models import Category

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'type']

    # def __init__(self,*args,**kwargs):
    #     self.name = kwargs.pop('name')
    #     self.type = kwargs.pop('type')
    #     super(CategoryForm,self).__init__(*args,**kwargs)