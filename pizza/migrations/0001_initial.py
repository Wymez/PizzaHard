# Generated by Django 3.2.7 on 2021-09-09 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Категория')),
                ('url', models.SlugField(max_length=170, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Pizza',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Название')),
                ('description', models.TextField(verbose_name='Описание')),
                ('image', models.ImageField(upload_to='pizza/', verbose_name='Изображение')),
                ('url', models.SlugField(max_length=170, unique=True)),
            ],
            options={
                'verbose_name': 'Пицца',
                'verbose_name_plural': 'Пицца',
            },
        ),
    ]