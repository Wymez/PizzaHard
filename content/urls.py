from django.urls import path
from django.urls import re_path
from . import views


urlpatterns = [
    path('', views.pizza_list),
    path('<slug:slug>/', views.pizza_detail, name='pizza_detail')

]