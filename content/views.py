from django.shortcuts import render, get_object_or_404
from .models import Pizza


# Create your views here.
def index(request):
    content = Pizza.objects.all()
    return render(request, 'content/index.html', {"content": content})


def pizza_detail(request, slug):
    pizza_info = get_object_or_404(Pizza, url=slug)
    return render(request, 'content/pizza_detail.html', {"pizza_info": pizza_info})
