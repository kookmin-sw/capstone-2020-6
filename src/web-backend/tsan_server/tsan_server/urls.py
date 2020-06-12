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

import json
import os
from bson import ObjectId
from django.conf import settings
from django.http import HttpResponse, Http404
from backend.models import Request
from mongodb import db
import zipfile

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))

def download(request, idx):
    # file_path = os.path.join(settings.MEDIA_ROOT, path)
    # if os.path.exists(file_path):
    #     with open(file_path, 'rb') as fh:
    idx = int(idx)
    req = Request.objects.get(idx=idx)

    print(req.category.idx)

    if req.category.idx == 2:
        directory = "./tmp/data/%d/"%(idx)
        try: os.makedirs(directory)
        except: pass
        assigned = db.assigned_dataset.find_one({"request": idx})
        for key, answer in assigned['answers'].items():
            if(answer == '1'):
                data = db.image_dataset.find_one({"_id": ObjectId(key)})['data']
                with open(os.path.join(directory, "%s.jpg"%(key)), "wb") as f:
                    f.write(data)

        zipf = zipfile.ZipFile('./tmp/%d.zip'%(idx), 'w', zipfile.ZIP_DEFLATED)
        zipdir(directory, zipf)
        zipf.close()
        
        f = open('./tmp/%d.zip'%(idx), "rb")
        data = f.read()
        f.close()
    elif req.category.idx == 1:
        answers = {}
        assigned = db.assigned_dataset.find_one({"request": idx})
        for k, v in assigned['answers'].items():
            d = db.text_dataset.find_one({"_id": ObjectId(k)})
            answers[k] = {}
            answers[k]['label'] = v
            answers[k]['text'] = d['text']
        response = HttpResponse(json.dumps(answers), content_type="application/json")
        response['Content-Disposition'] = 'inline; filename=%d.json'%(idx)
    
        return response
    elif req.category.idx == 3:
        directory = "./tmp/data/%d/"%(idx)
        try: os.makedirs(directory)
        except: pass
        assigned = db.assigned_dataset.find_one({"request": idx})
        for key, answer in assigned['answers'].items():
            with open(os.path.join(directory, "%s.jpg"%(key)), "wb") as f:
                f.write(answer[1])

        zipf = zipfile.ZipFile('./tmp/%d.zip'%(idx), 'w', zipfile.ZIP_DEFLATED)
        zipdir(directory, zipf)
        zipf.close()
        
        f = open('./tmp/%d.zip'%(idx), "rb")
        data = f.read()
        f.close()
    elif req.category.idx == 4:
        directory = "./tmp/data/%d/"%(idx)
        try: os.makedirs(directory)
        except: pass
        assigned = db.assigned_dataset.find_one({"request": idx})
        answers = assigned['answers']
        labels = list(set([v for x, v in answers.items()]))
        ans = {}
        for l in labels:
            ans[l] = []
        for x, v in answers.items():
            for l in labels:
                if l == v:
                    ans[l].append(x)
        for l in labels:
            directory = "./tmp/data/%d/%s/"%(idx, l)
            try: os.makedirs(directory)
            except: pass
            for k in ans[l]:
                img = db.image_dataset.find_one({"_id": ObjectId(k)})
                with open(os.path.join(directory, "%s.jpg"%(k)), "wb") as f:
                    f.write(img['data'])

        zipf = zipfile.ZipFile('./tmp/%d.zip'%(idx), 'w', zipfile.ZIP_DEFLATED)
        zipdir("./tmp/data/%d/"%(idx), zipf)
        zipf.close()
        
        f = open('./tmp/%d.zip'%(idx), "rb")
        data = f.read()
        f.close()

    response = HttpResponse(data, content_type="application/zip")
    response['Content-Disposition'] = 'inline; filename=%d.zip'%(idx)
    return response
    # raise Http404

urlpatterns = [
    path('admin/', admin.site.urls),
    path('v1/graphql', GraphQLView.as_view(graphiql=True)),  
    url(r'^jet/', include('jet.urls', 'jet')),
    url(r'^jet/dashboard', include('jet.dashboard.urls', 'jet-dashboard')),
    url('^download/(?P<idx>\d+)', download)
]
