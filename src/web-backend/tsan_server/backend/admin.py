from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.

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
    )

admin.site.register(User, CustomUserAdmin)