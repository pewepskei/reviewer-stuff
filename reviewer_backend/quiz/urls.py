from django.urls import path
from . import views

urlpatterns = [
    path('topics/', views.TopicListView.as_view(), name='topic-list'),
    path('topics/add/', views.TopicCreateView.as_view(), name='topic-create'),
    path('questions/', views.QuestionRetrieveView.as_view(), name='question-retrieve'),
    path('questions/add/', views.QuestionCreateView.as_view(), name='question-create'),
]

