import random
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Topic, Question
from .serializers import TopicSerializer, QuestionSerializer, QuestionCreateSerializer


class TopicListView(generics.ListAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class TopicCreateView(generics.CreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class QuestionRetrieveView(APIView):
    """
    Retrieve random questions based on topic and limit (50, 100, or unli).
    """
    def get(self, request):
        topic_name = request.query_params.get('topic')
        limit = request.query_params.get('limit', '50')

        # Get topic(s)
        if topic_name and topic_name.lower() != 'all':
            questions = Question.objects.filter(topic__name__iexact=topic_name)
        else:
            questions = Question.objects.all()

        # Determine question count
        if limit.lower() == 'unli':
            limit = 1000
        else:
            try:
                limit = int(limit)
            except ValueError:
                limit = 50

        # Randomize questions
        questions = list(questions)
        random.shuffle(questions)
        selected = questions[:limit]

        serializer = QuestionSerializer(selected, many=True)
        return Response(serializer.data)


class QuestionCreateView(generics.CreateAPIView):
    """
    Add new questions to a topic.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionCreateSerializer

