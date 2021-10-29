from django.shortcuts import render, get_object_or_404
from .models import Pizza


# Create your views here.
def pizza_list(request):
    # TODO: лучше назвать pizza_list, pizza_queryset
    many_pizzas = Pizza.objects.all()
    return render(request, 'content/pizza_list.html', {"many_pizzas": many_pizzas})


def pizza_detail(request, slug):
    # TODO: просто pizzа, pizza_obj
    one_pizza = get_object_or_404(Pizza, url=slug)
    return render(request, 'content/pizza_detail.html', {"one_pizza": one_pizza})


def pizza_basket(request):
    return render(request, 'basket/basket.html')
