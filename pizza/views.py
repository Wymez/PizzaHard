from django.shortcuts import render, get_object_or_404
from .models import Pizza


# Create your views here.
def index(request):
    pizza = Pizza.objects.all()
    return render(request, 'pizza/index.html', {"pizza": pizza})


def pizza_detail(request, slug):
    pizza_info = get_object_or_404(Pizza, url=slug)
    return render(request, 'pizza/pizza_detail.html', {"pizza_info": pizza_info})
