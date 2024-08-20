from games.models import Game
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


class SaleItemReadSeializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='sale-ticket-item-detail')
    total_price = serializers.SerializerMethodField()
    game = GameSerializer(read_only=True)

    class Meta:
        model = SaleTicketItem
        fields = '__all__'

    def get_total_price(self, obj):
        return obj.total_price


class SaleItemWriteSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='sale-ticket-item-detail')

    class Meta:
        model = SaleTicketItem
        fields = '__all__'


class SaleTicketSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='sale-ticket-detail')
    items = SaleItemReadSeializer(many=True, read_only=True)

    class Meta:
        model = SaleTicket
        fields = '__all__'

    def create(self, validated_data):
        sale = SaleTicket(**validated_data)
        sale.save()
        items = self.initial_data.get("games", [])
        for item in items:
            game = Game.objects.get(pk=item["game_id"])
            sale_item = SaleTicketItem.objects.create(sale_ticket=sale, amount=item["amount"], game=game)
            sale_item.save()

        sale.save()
        return sale
