from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('<slug:slug>/', views.pizza_detail, name='pizza_detail')
]