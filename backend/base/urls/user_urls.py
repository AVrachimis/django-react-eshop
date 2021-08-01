from django.urls import path
from base.views import user_views as views


urlpatterns = [

    path('register/', views.registerUser, name='user-register'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('profile/', views.getUserProfile, name='user-profile'),
    path('profile/update/', views.updateUserProfile, name='user-profile-update'),

    path('', views.getUsers, name='users'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),

    path('update/<str:pk>/', views.updateUserProfileAdmin, name='user-update'),
    path('<str:pk>/', views.getUserById, name='user'),

]
