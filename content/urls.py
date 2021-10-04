from django.urls import path
from django.urls import re_path
from . import views


urlpatterns = [
    path('<str:sorting_attribute>/', views.sorting, name='sorting'),
    path('', views.index),
    path('<slug:slug>/', views.pizza_detail, name='pizza_detail')

]