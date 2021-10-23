from rest_framework import serializers
from ..models import Pizza

class PizzaSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = Pizza
        fields = ['id', 'name', 'description', 'pizza_size', 'image', 'url', 'price', 'weight', 'latest', 'image_url']

    def get_image_url(self, obj):
        return obj.image.url

