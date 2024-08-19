from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include

router = DefaultRouter()
router.register('financial-item', FinancialItemViewSet, basename='financial-item')
router.register('transaction', TransactionViewSet, basename='transaction')
router.register('salary', SalaryViewSet, basename='salary')

urlpatterns = [
    path('', include(router.urls)),
]
