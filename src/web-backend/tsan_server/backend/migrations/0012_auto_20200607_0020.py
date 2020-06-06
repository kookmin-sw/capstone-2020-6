# Generated by Django 2.2.10 on 2020-06-06 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_auto_20200529_2315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='state',
            field=models.CharField(choices=[('RED', 'before_permission'), ('RUN', 'running'), ('END', 'end'), ('VER', 'verify'), ('REW', 'done reword')], default='RED', max_length=3),
        ),
        migrations.AlterField(
            model_name='user',
            name='reliability',
            field=models.FloatField(default=0.5),
        ),
    ]
