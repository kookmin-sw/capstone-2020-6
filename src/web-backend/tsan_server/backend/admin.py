from django.contrib import admin
from rangefilter.filter import DateRangeFilter, DateTimeRangeFilter
from django.contrib.auth.admin import UserAdmin
from .models import User, Category, Request, PaymentLog, Labeling

# Register your models here.
# admin page filter에서 'is_required: 예/아니오'를 '사용자 구분: 의뢰자/참여자'로 표현
class UserTypeFilter(admin.SimpleListFilter):
    title = "사용자 구분"
    parameter_name = 'usertype'

    def lookups(self, request, model_admin):
        return (
            ('의뢰자', '의뢰자'),
            ('참여자', '참여자'),
        )

    def queryset(self, request, model_admin):
        if self.value() == '의뢰자':
            return User.objects.filter(is_requester=True)
        if self.value() == '참여자':
            return User.objects.filter(is_requester=False)

# admin page filter에서 'payment.type: 0/1/2/3/4'를 
# '내역 구분: 0: 보상/1: 충전/2: 환급/3: 소비/4: 기타사유'로 표현
class PaymentTypeFilter(admin.SimpleListFilter):
    title = "내역 구분"
    parameter_name = 'paymenttype'

    def lookups(self, request, model_admin):
        return (
            ('0: 보상', '0: 보상'),
            ('1: 충전', '1: 충전'),
            ('2: 환급', '2: 환급'),
            ('3: 소비', '3: 소비'),
            ('4: 기타사유', '4: 기타사유'),
        )

    def queryset(self, request, model_admin):
        if self.value() == '0: 보상':
            return PaymentLog.objects.filter(type=0)
        if self.value() == '1: 충전':
            return PaymentLog.objects.filter(type=1)
        if self.value() == '2: 환급':
            return PaymentLog.objects.filter(type=2)
        if self.value() == '3: 소비':
            return PaymentLog.objects.filter(type=3)
        if self.value() == '4: 기타사유':
            return PaymentLog.objects.filter(type=4)

class CustomUserAdmin(UserAdmin):
    fieldsets = (
        *UserAdmin.fieldsets,  # original form fieldsets, expanded
        (                      # new fieldset added on to the bottom
            'Custom Field Heading',  # group heading of your choice; set to None for a blank space instead of a header
            {
                'fields': (
                    'phone',
                    'point',
                    'reliability',
                    'is_requester',
                ),
            },
        ),
    )
    list_display = (
        'username',
        'id', # 나중에 지우기
        'email',
        'point',
        'reliability',
        'is_requester',
        'is_robot',
        'is_staff'
    )
    list_filter = (
        (UserTypeFilter),
        'is_robot',
        'is_staff',
        # TODO: 포인트 양으로 필터링 
        # TODO: 신뢰도로 필터링
    )
    search_fields = (
        'username',
        'email',
        'phone'
    )

class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'type'
    )
    list_filter = (
        'type',
    )
    search_fields = (
        'name',
        'type'
    )

class RequestAdmin(admin.ModelAdmin):
    list_display = (
        'subject',
        'user',
        'category',
        'due_date',
        'max_cycle',
        'total_point',
        'state',
    )
    list_filter = (
        'category',
        'due_date',
    )
    search_fields = (
        'subject',
        'user',
        'category',
        'due_date',
        'total_point'
    )

class PaymentLogAdmin(admin.ModelAdmin):
    list_display = (
        'type',
        'user',
        'request',
        'note',
    )
    list_filter = (
        (PaymentTypeFilter),
    )
    search_fields = (
        'type',
        'user',
        'request',
        'note',
    )

class LabelingAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'request',
        'start_date',
        'end_date',
    )
    list_filter = (
        'start_date',
        'end_date',
    )
    search_fields = (
        'user',
        'request',
        'start_date',
        'end_date',
    )


admin.site.register(User, CustomUserAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Request, RequestAdmin)
admin.site.register(PaymentLog, PaymentLogAdmin)
admin.site.register(Labeling, LabelingAdmin)

"""
DateRangeFilter 사용
list_filter = ('gender',
        ('hire_date', DateRangeFilter),
        ('birth_date', DateRangeFilter),
    )
"""