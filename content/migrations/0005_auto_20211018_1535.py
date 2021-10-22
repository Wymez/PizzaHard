# Generated by Django 3.2.6 on 2021-10-18 12:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0004_alter_pizza_latest'),
    ]

    operations = [
        migrations.AddField(
            model_name='pizza',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='content.category', verbose_name='Категория'),
        ),
        migrations.AddField(
            model_name='pizza',
            name='pizza_size',
            field=models.CharField(default=24, max_length=40, verbose_name='Размер'),
        ),
        migrations.AddField(
            model_name='pizza',
            name='weight',
            field=models.SmallIntegerField(default=0, verbose_name='Вес'),
        ),
    ]