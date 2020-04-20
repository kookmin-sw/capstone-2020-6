from django.db import models
import django.contrib.auth.models
from backend.validation import validate_email, validate_phone, validate_category_type, validate_date, validate_paymentlog_type
from django.core.exceptions import ValidationError

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
    email = models.CharField(max_length=30, validators=[validate_email])
    phone = models.CharField(max_length=30, validators=[validate_phone]) # 전화번호
    point = models.IntegerField(default=0) # 포인트
    reliability = models.FloatField(default=0) # 신뢰도
    is_requester = models.BooleanField(default=False) # 디폴트: 의뢰자
    is_robot = models.BooleanField(default=False)
    """
    def create_user(self, username, email, password, phone, is_requester):
        new_user = self.models(username=username, email=email, password=password)
        new_user.phone = phone
        new_user.point = 0
        new_user.reliability = 0
        new_user.is_requester = is_requester
        new_user.save()
        return new_user
    """
    def clean(self):
        if validate_email(self.email):
            pass
        if validate_phone(self.phone):
            pass
        # if validate_password(self.password):
        #     pass
        return self

# 데이터 라벨링 유형
class Category(models.Model):
    idx = models.AutoField(primary_key=True) # 고유번호
    type = models.CharField(max_length=15, validators=[validate_category_type]) # 이미지/텍스트
    name = models.CharField(max_length=50) # 카테고리 명 

    def create(self, name, type):
        self.name = name
        self.type = type
        self.save()
        return self

    def clean(self):
        if validate_category_type(self.type):
            pass
        return self


# 의뢰 요청 테이블
class Request(models.Model):
    idx = models.AutoField(primary_key=True) # 고유번호
    user = models.ForeignKey("User", on_delete=models.DO_NOTHING) # 생성자
    category = models.ForeignKey("Category", on_delete=models.DO_NOTHING) # 데이터 라벨링 유형
    subject = models.CharField(max_length=100) # 요청 주제
    description = models.TextField(blank=True) # 설명
    start_date = models.DateTimeField(auto_now_add=True, validators=[validate_date]) # 시작
    due_date = models.DateTimeField('due date', validators=[validate_date]) # 마감
    current_cycle = models.IntegerField(default=0) # 현재 사이클
    max_cycle = models.IntegerField(default=0) # 최대 사이클
    total_point = models.IntegerField(default=0) # 총 가격
    is_captcha = models.BooleanField(default=False) # 디폴트 reCAPTCHA 비허용

    
    def create(self, user, category, subject, description, due_date, max_cycle, is_captcha, total_point):
       self.user = user
       self.category = category
       self.subject = subject
       self.description = description
       self.due_date = due_date
       self.max_cycle = max_cycle
       self.total_point = total_point
       self.is_captcha = is_captcha
       self.save()
       return self
    
    def clean(self):
        if validate_category_type(self.category.type):
            pass
        if validate_date(self.start_date):
            pass
        if validate_date(self.due_date):
            pass
        if self.due_date < self.start_date:
            raise ValidationError("마감일은 시작일 보다 이후여야 합니다.")
        if (self.is_captcha == True and self.category.idx != 4):
            raise ValidationError("해당 라벨링 유형은 CAPTCHA를 허용할 수 없는 유형입니다. (이미지 선택 라벨링 유형만 가능)")
        # TODO: min len 유효성 검사

        return self


# 라벨링 참여 테이블
class Labeling(models.Model):
    idx = models.AutoField(primary_key=True) # 고유번호
    request = models.ForeignKey("Request", on_delete=models.DO_NOTHING) # 의뢰 번호
    user = models.ForeignKey("User", on_delete=models.DO_NOTHING) # 생성자
    start_date = models.DateTimeField(auto_now=True) # 시작 시간
    end_date = models.DateTimeField(blank=False) # 종료 시간

# 금액 지급 내역 테이블
class PaymentLog(models.Model):
    idx = models.AutoField(primary_key=True) # 고유번호
    type = models.TextField(blank=False, validators=[validate_paymentlog_type]) # 0 = 보상, 1 = 충전, 2 = 환급, 3 = 소비, 4 = 기타사유
    user = models.ForeignKey("User", on_delete=models.DO_NOTHING) # 사용자
    request = models.ForeignKey("Request", on_delete=models.DO_NOTHING) # 보상을 주는 의뢰
    note = models.CharField(max_length=300) # 사유

    def clean(self):
        if validate_paymentlog_type(self.type):
            pass

        return self