from django.contrib import admin
from .models import Pizza, Category

# Register your models here.
admin.site.register(Category)

@admin.register(Pizza)
class PizzaAdmin(admin.ModelAdmin):
    list_display = ('name', 'url', 'price', 'latest')
    list_filter = ('name', 'price', 'latest')
    search_fields = ('name', 'description')
    ordering = ('name', 'price')
