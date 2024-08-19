from games.serializers import GameSerializer
from rest_framework import serializers
from games.serializers import GameSerializer
from .models import *


class TicketReadSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='ticket-detail')
    total_price = serializers.SerializerMethodField()
    game = GameSerializer(read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'

    def get_total_price(self, obj):
        return obj.total_price


class TicketWriteSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='ticket-detail')

    class Meta:
        model = Ticket
        fields = '__all__'
