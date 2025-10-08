from rest_framework import serializers
from .models import Topic, Question

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name']


class QuestionSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)
    choices = serializers.SerializerMethodField()
    correct_choice = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = [
            'id', 'topic', 'question_text', 'choices', 'correct_choice'
        ]

    def get_choices(self, obj):
        return [obj.choice_a, obj.choice_b, obj.choice_c, obj.choice_d]

    def get_correct_choice(self, obj):
        # Map letter (A, B, C, D) to actual text
        mapping = {
            'A': obj.choice_a,
            'B': obj.choice_b,
            'C': obj.choice_c,
            'D': obj.choice_d,
        }
        return mapping.get(obj.correct_answer)

class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

