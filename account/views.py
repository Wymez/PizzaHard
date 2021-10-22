import json

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import LoginForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm

from django.http import JsonResponse


# def index_page(reque
@login_required
def dashboard(request):
    return render(request, 'account/dashboard.html', {'section': dashboard})
    # return JsonResponse()


def register(request):
    if request.method == 'POST':
        user_form = UserCreationForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit=False)
            new_user.set_password(user_form.cleaned_data['password1'])
            new_user.save()
            cd = user_form.cleaned_data
            user = authenticate(username=cd['username'], password=cd['password1'])
            if user is not None:
                login(request, user)
                return redirect('dashboard')
    else:
        user_form = UserCreationForm()
    return render(request, 'account/register.html', {'user_form': user_form})