from django.contrib import admin
from django.urls import path
from .views import process_payment

urlpatterns = [
    path('api/process-payment/', process_payment, name='process-payment'),
]

