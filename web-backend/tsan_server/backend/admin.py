from django.contrib import admin
from rangefilter.filter import DateRangeFilter, DateTimeRangeFilter
from django.contrib.auth.admin import UserAdmin
from .models import User, Category

# Register your models here.
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
        'email',
        'point',
        'reliability',
        'is_requester',
        'is_staff'
    )
    list_filter = (
        (UserTypeFilter),
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
        'idx',
        'type'
    )
    list_filter = (
        'type',
    )
    search_fields = (
        'name',
        'type'
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Category,CategoryAdmin)

"""
DateRangeFilter 사용
list_filter = ('gender',
        ('hire_date', DateRangeFilter),
        ('birth_date', DateRangeFilter),
    )
"""