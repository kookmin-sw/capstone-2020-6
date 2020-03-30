from django.db import models

class Dataset(models.Model):
    # PK, MongoDB에서 해당 키를 기반으로 데이터셋을 저장함
    idx = models.AutoField(primary_key=True)
    # 데이터셋의 이름, 최대 길이 100자
    name = models.CharField(max_length=100)
    def create(self, name):
        self.name = name
        self.save()
        return self