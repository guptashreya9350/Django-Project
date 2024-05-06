from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='h'),
    path('home', views.home, name='home'),
    path('about', views.about, name='about'),
    path('feedback', views.feedback, name='feedback'),
    path('login', views.login, name='login'),
    path('signuphandler', views.handleregister, name='handleregister'),
    path('register', views.register, name='register'),
    path('register_success', views.register_success, name='register_success'),
    path('addition', views.addition, name='addition'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('logout', views.logout, name='logout'),
    path('passwordchange', views.handlepasswordchange, name='passwordchange'),
    path('get-chart-data/', views.get_chart_data, name='get_chart_data'),

]