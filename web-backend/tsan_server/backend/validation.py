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

    