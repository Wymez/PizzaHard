from django.urls import path
from . import views

app_name = 'content'

urlpatterns = [
    path('order/<str:order>/', views.PizzaOrder.as_view(), name='pizza_order'),
    path('filter/<str:filter>/', views.PizzaFilter.as_view(), name='pizza_filter')
]