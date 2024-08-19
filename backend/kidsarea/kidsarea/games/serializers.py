from rest_framework import serializers
from .models import *


class GameSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='game-detail')

    class Meta:
        model = Game
        fields = '__all__'
