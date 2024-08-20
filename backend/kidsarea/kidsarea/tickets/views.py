from django.utils.timezone import datetime, make_aware, timedelta
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from collections import defaultdict
from django.db.models import Q

from .serializers import *
from .models import *


class TicketViewSet(ModelViewSet):
    queryset = Ticket.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)
        date = self.request.query_params.get('date', None)

        if search:
            queryset = queryset.filter(id__icontains=search)
        if date:
            queryset = queryset.filter(date=datetime.strptime(date, '%Y-%m-%d'))
        return queryset

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return TicketWriteSerializer
        return TicketReadSerializer


@api_view(["GET"])
def get_tickets_within_duration(request):
    from_date = request.query_params.get('from', None)
    to_date = request.query_params.get('to', None)
    if from_date and to_date:
        from_date = datetime.strptime(from_date, "%Y-%m-%d").replace(hour=0, minute=0, second=0, microsecond=0)
        to_date = datetime.strptime(to_date, "%Y-%m-%d").replace(hour=23, minute=59, second=59, microsecond=999999)
        queryset = Ticket.objects.filter(
            Q(date__gte=make_aware(from_date)) &
            Q(date__lte=make_aware(to_date))
        )

        response_data = {}
        serialized_tickets = TicketReadSerializer(queryset, context={"request": request},
                                                  many=True)
        response_data = {"tickets": serialized_tickets.data,
                         "total_tickets": sum(ticket["amount"] for ticket in serialized_tickets.data),
                         "total_price": sum(
                             ticket["total_price"] for ticket in serialized_tickets.data),
                         "from_date": from_date.strftime("%Y/%m/%d"),
                         "to_date": to_date.strftime("%Y/%m/%d"),
                         }

        return Response(response_data)


class SaleTicketViewSet(ModelViewSet):
    queryset = SaleTicket.objects.all()
    serializer_class = SaleTicketSerializer


class SaleItemViewSet(ModelViewSet):
    queryset = SaleTicketItem.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return SaleItemWriteSerializer
        return SaleItemReadSeializer
