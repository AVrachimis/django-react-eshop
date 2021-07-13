from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('add/', views.addOrderitems, name='orders-add'),
    path('<str:pk>/', views.getOrderByID, name='user-order'),

]
