from django.core.exceptions import ValidationError
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