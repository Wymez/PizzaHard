# Generated by Django 3.2.6 on 2021-10-18 12:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0005_auto_20211018_1535'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pizza',
            name='category',
        ),
    ]