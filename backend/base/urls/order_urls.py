from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderitems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),
    path('<str:pk>/', views.getOrderByID, name='user-order'),
    path('<str:pk>/pay', views.updateOrderToPaid, name='paid'),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),

]
