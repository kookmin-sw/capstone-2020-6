from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator
import re

# email 유효성 검증
def validate_email(value):
    if not '@' in value:
       raise ValidationError("유효한 이메일 형식이 아닙니다.")

    EMAIL_REGEX = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    if not re.match(EMAIL_REGEX, value):
        raise ValidationError("유효한 이메일 형식이 아닙니다.")
    
    return value

# phone 유효성 검증
def validate_phone(value):
    PHONE_REGEX = r"(^01(?:0|1|[6-9])[0-9]{8}$)"
    if not re.match(PHONE_REGEX, value):
        raise ValidationError("유효한 전화번호 형식이 아닙니다.")

    return value

# password 유효성 검증
"""
# test 전
def validate_password(value):
    PASSWORD_REGEX = r"(^.*(?=.{8,10})(?=.*[a-zA-Z])(?=.*?[A-Z])(?=.*\d)(?=.+?[\W|_])[a-zA-Z0-9!@#$%^&*()-_+={}\|\\\/]+$)"
    if not re.match(PASSWORD_REGEX, value):
        raise ValidationError("대/소문자,숫자,특수문자 포함하여 8글자 이상 입력해주세요.")

    return value
"""

# Category type 유효성 검증
def validate_category_type(value):
    if not (value == "text" or value == "image"):
        raise ValidationError("카테고리 타입이 image/text 형식이 아닙니다.")

    return value

# date 유효성 검증
def validate_date(value):
    # YYYY/MM/DD, YYYY.MM.DD, YYYY-MM-DD, YYMMDD
    DATE_REGEX = r"(^(19|20)\d{2}[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[0-1])$)"
    if not re.match(DATE_REGEX, value):
        raise ValidationError("유효한 날짜 형식이 아닙니다.")
    return value

"""
# 최소 글자 수 유효성 검증
def validate_min_len(min_len, value):
    MinLengthValidator(min_len, "길이가 너무 짧습니다.")
    return value
"""

# Payment type 유효성 검증
def validate_paymentlog_type(value):
    # 0 = 보상, 1 = 충전, 2 = 환급, 3 = 소비, 4 = 기타사유
    TYPE_REGEX = r"(^[0-4]{1}$)"
    if not re.match(TYPE_REGEX, value):
        raise ValidationError("유효한 PaymentLog type형식이 아닙니다.")
    return value