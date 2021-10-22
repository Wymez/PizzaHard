from rest_framework import generics
from ..models import Pizza
from .serializers import PizzaSerializer

class PizzaOrder(generics.ListAPIView):
    serializer_class = PizzaSerializer

    def get_queryset(self):
        order = self.kwargs['order']
        return Pizza.objects.order_by(order)

class PizzaFilter(generics.ListAPIView):
    serializer_class = PizzaSerializer

    def get_queryset(self):
        category = self.kwargs['filter']
        return Pizza.objects.filter(description=category)
