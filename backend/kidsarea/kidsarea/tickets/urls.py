from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include

router = DefaultRouter()
router.register('ticket', TicketViewSet, basename='ticket')

urlpatterns = [
    path('', include(router.urls)),
    path('tickets-within-duration/', get_tickets_within_duration, name="tickets_within_duration"),
]
