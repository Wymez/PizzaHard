from django.db import models


# Create your models here.f
from django.urls import reverse


class Category(models.Model):
    name = models.CharField("Категория", max_length=100)
    url = models.SlugField(max_length=170, unique=True)


class Promotions(models.Model):
    promo = models.CharField("Промо фкция", max_length=170)
    image = models.ImageField("Изображение", upload_to='promo/')


class Pizza(models.Model):
    name = models.CharField("Название", max_length=100)
    description = models.TextField("Описание")
    pizza_size = models.CharField("Размер", max_length=40, default=24)
    image = models.ImageField("Изображение", upload_to='content/')
    url = models.SlugField(max_length=170, unique=True)
    price = models.SmallIntegerField("Стоимость", default=0)
    weight = models.SmallIntegerField("Вес", default=0)
    latest = models.BooleanField("Новинка", default=False)
    #category = models.ForeignKey(Category, verbose_name="Категория", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("pizza_detail", kwargs={"slug": self.url})

    class Meta:
        verbose_name = "Пицца"
        verbose_name_plural = "Пицца"



