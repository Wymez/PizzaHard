# Generated by Django 3.2.6 on 2021-10-04 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0003_auto_20211004_1555'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pizza',
            name='latest',
            field=models.BooleanField(default=False, verbose_name='Новинка'),
        ),
    ]
