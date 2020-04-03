from django.db import models
import django.contrib.auth.models

# 데이터셋 테이블
class Dataset(models.Model):
    idx = models.AutoField(primary_key=True) # PK, MongoDB에서 해당 키를 기반으로 데이터셋을 저장함
    name = models.CharField(max_length=100) # 데이터셋의 이름

    def create(self, name):
        self.name = name
        self.save()
        return self

# 사용자 확장 테이블
class User(django.contrib.auth.models.User):
    phone = models.CharField(max_length=30) # 전화번호
    point = models.IntegerField() # 포인트
    reliability = models.FloatField() # 신뢰도

# 의뢰 요청 테이블
class Request(models.Model):
    idx = models.AutoField(primary_key=True) # 고유번호
    user = models.ForeignKey("User", on_delete=models.DO_NOTHING) # 생성자
    subject = models.CharField(max_length=100) # 요청 주제
    start_date = models.DateTimeField() # 시작
    due_date = models.DateTimeField() # 마감
    current_cycle = models.IntegerField() # 현재 사이클
    max_cycle = models.IntegerField() # 최대 사이클
    total_point = models.IntegerField() # 총 가격

