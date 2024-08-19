from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include

router = DefaultRouter()
router.register('game', GameViewSet, basename='game')

urlpatterns = [
    path('', include(router.urls)),
]
