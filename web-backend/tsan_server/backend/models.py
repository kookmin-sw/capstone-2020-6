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
class User(django.contrib.auth.models.AbstractUser):
    phone = models.CharField(max_length=30) # 전화번호
    point = models.IntegerField(default=0) # 포인트
    reliability = models.FloatField(default=0) # 신뢰도
    is_requester = models.BooleanField(default=False) # 디폴트: 의뢰자

    def create_user(self, username, email, password, phone, is_requester):
        new_user = self.models(username=username, email=email, password=password)
        new_user.phone = phone
        new_user.point = 0
        new_user.reliability = 0
        new_user.is_requester = is_requester
        new_user.save()
        return new_user

# 데이터 라벨링 유형
class Category(models.Model):
    idx = models.AutoField(primary_key=True) # 고유번호
    type = models.CharField(max_length=15) # 이미지/텍스트
    name = models.CharField(max_length=50) # 카테고리 명 

# 의뢰 요청 테이블
class Request(models.Model):
    idx = models.AutoField(primary_key=True) # 고유번호
    user = models.ForeignKey("User", on_delete=models.DO_NOTHING) # 생성자
    category = models.ForeignKey("Category", on_delete=models.DO_NOTHING) # 데이터 라벨링 유형
    subject = models.CharField(max_length=100) # 요청 주제
    #description = models.TextField() # 설명
    start_date = models.DateTimeField(auto_now_add=True) # 시작
    due_date = models.DateTimeField('due date') # 마감
    current_cycle = models.IntegerField(default=0) # 현재 사이클
    max_cycle = models.IntegerField(default=0) # 최대 사이클
    total_point = models.IntegerField(default=0) # 총 가격

# 라벨링 참여 테이블
class Labeling(models.Model):
    idx = models.AutoField(primary_key=True) # 고유번호
    request = models.ForeignKey("Request", on_delete=models.DO_NOTHING) # 의뢰 번호
    user = models.ForeignKey("User", on_delete=models.DO_NOTHING) # 생성자
    start_date = models.DateTimeField(auto_now=True) # 시작 시간
    end_date = models.DateTimeField('end date') # 종료 시간

# 금액 지급 내역 테이블
class PaymentLog(models.Model):
    idx = models.AutoField(primary_key=True) # 고유번호
    type = models.IntegerField(default=2) # 0 = 보상, 1 = 충전, 2 = 기타 사유
    user = models.ForeignKey("User", on_delete=models.DO_NOTHING) # 사용자
    request = models.ForeignKey("Request", on_delete=models.DO_NOTHING) # 보상을 주는 의뢰
    message = models.CharField(max_length=300) # 사유