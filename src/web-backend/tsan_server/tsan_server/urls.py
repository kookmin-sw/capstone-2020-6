"""tsan_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# 관리자 페이지
from django.contrib import admin
# GraphQL 페이지
from graphene_django.views import GraphQLView
from django.urls import path
from django.conf.urls import url, include

import os
from django.conf import settings
from django.http import HttpResponse, Http404

def download(request, idx):
    # file_path = os.path.join(settings.MEDIA_ROOT, path)
    # if os.path.exists(file_path):
    #     with open(file_path, 'rb') as fh:
    response = HttpResponse("ASDSDSADASD", content_type="application/vnd.ms-excel")
    response['Content-Disposition'] = 'inline; filename=HI'
    return response
    # raise Http404

urlpatterns = [
    path('admin/', admin.site.urls),
    path('v1/graphql', GraphQLView.as_view(graphiql=True)),  
    url(r'^jet/', include('jet.urls', 'jet')),
    url(r'^jet/dashboard', include('jet.dashboard.urls', 'jet-dashboard')),
    url('^download/(?P<idx>\d+)', download)
]
