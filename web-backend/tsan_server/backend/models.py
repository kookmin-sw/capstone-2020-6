from django.db import models
import django.contrib.auth.models

class Dataset(models.Model):
    idx = models.AutoField(primary_key=True) # PK, MongoDB에서 해당 키를 기반으로 데이터셋을 저장함
    name = models.CharField(max_length=100) # 데이터셋의 이름

    def create(self, name):
        self.name = name
        self.save()
        return self

class User(django.contrib.auth.models.User):
    phone = models.CharField(max_length=30) # 전화번호
    point = models.IntegerField() # 포인트
    reliability = models.FloatField() # 신뢰도
