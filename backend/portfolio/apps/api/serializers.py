from rest_framework import serializers
from portfolio.apps.core.models import Profile, Skill, Project, Education, KeyStrength, ContactMessage


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer pour le profil"""
    photo_url = serializers.SerializerMethodField()
    cv_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id', 'full_name', 'title', 'profile_text', 'email', 'phone',
            'location', 'github_url', 'linkedin_url', 'photo_url', 'cv_url'
        ]

    def get_photo_url(self, obj):
        if obj.photo:
            url = obj.photo.url
            if url.startswith('http'):
                return url
            request = self.context.get('request')
            return request.build_absolute_uri(url) if request else url
        return None

    def get_cv_url(self, obj):
        if obj.cv_file:
            url = obj.cv_file.url
            if url.startswith('http'):
                return url
            request = self.context.get('request')
            return request.build_absolute_uri(url) if request else url
        return None


class SkillSerializer(serializers.ModelSerializer):
    """Serializer pour les compétences"""

    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'level', 'order', 'is_active']


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer pour les projets"""
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'subtitle', 'description', 'technologies',
            'details', 'github_url', 'live_url', 'image_url',
            'featured', 'order', 'is_active', 'created_at', 'updated_at'
        ]

    def get_image_url(self, obj):
        if obj.image:
            url = obj.image.url
            if url.startswith('http'):
                return url
            request = self.context.get('request')
            return request.build_absolute_uri(url) if request else url
        return None


class EducationSerializer(serializers.ModelSerializer):
    """Serializer pour la formation"""

    class Meta:
        model = Education
        fields = [
            'id', 'degree', 'institution', 'location', 'start_date',
            'end_date', 'current', 'description', 'order', 'is_active'
        ]


class KeyStrengthSerializer(serializers.ModelSerializer):
    """Serializer pour les atouts clés"""

    class Meta:
        model = KeyStrength
        fields = ['id', 'title', 'description', 'icon', 'order', 'is_active']


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer pour les messages de contact"""

    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'sent_at', 'processed']
        read_only_fields = ['sent_at', 'processed']

    def create(self, validated_data):
        """Crée le message et envoie l'email"""
        message = ContactMessage.objects.create(**validated_data)
        try:
            message.send_email()
        except Exception as e:
            # En cas d'erreur d'envoi d'email, on ne bloque pas la création
            # mais on pourrait logger l'erreur
            pass
        return message
