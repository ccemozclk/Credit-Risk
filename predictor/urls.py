from django.urls import path
from . import views

app_name = 'predictor'

urlpatterns = [
    
    path('', views.home_view, name='home'),
    path('explatory-data-analyis/', views.eda_view, name='eda'),
    path('predict/', views.predict_view, name='predict'),
]
