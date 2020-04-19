# Generated by Django 2.2.11 on 2020-04-19 10:17

import backend.validation
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_user_is_robot'),
    ]

    operations = [
        migrations.RenameField(
            model_name='paymentlog',
            old_name='message',
            new_name='note',
        ),
        migrations.AlterField(
            model_name='paymentlog',
            name='type',
            field=models.TextField(validators=[backend.validation.validate_paymentlog_type]),
        ),
    ]
