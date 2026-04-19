from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from portfolio.apps.core.models import Profile, Skill, Project, Education, KeyStrength, ContactMessage
from .serializers import (
    ProfileSerializer, SkillSerializer, ProjectSerializer,
    EducationSerializer, KeyStrengthSerializer, ContactMessageSerializer
)


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet pour le profil"""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.all()[:1]  # Un seul profil

    @action(detail=False, methods=['get'])
    def main(self, request):
        """Retourne le profil principal"""
        profile = Profile.objects.first()
        if profile:
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        return Response({'error': 'Aucun profil trouvé'}, status=status.HTTP_404_NOT_FOUND)


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet pour les compétences"""
    queryset = Skill.objects.filter(is_active=True)
    serializer_class = SkillSerializer

    def get_queryset(self):
        queryset = Skill.objects.filter(is_active=True)
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset.order_by('order', 'category', 'name')

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Retourne les compétences groupées par catégorie"""
        skills = self.get_queryset()
        result = {}
        for skill in skills:
            if skill.category not in result:
                result[skill.category] = []
            result[skill.category].append(SkillSerializer(skill).data)
        return Response(result)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet pour les projets"""
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(is_active=True).order_by('-featured', 'order', '-created_at')

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Retourne les projets mis en avant"""
        projects = self.get_queryset().filter(featured=True)
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)


class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet pour la formation"""
    queryset = Education.objects.filter(is_active=True)
    serializer_class = EducationSerializer

    def get_queryset(self):
        return Education.objects.filter(is_active=True).order_by('-start_date', 'order')


class KeyStrengthViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet pour les atouts clés"""
    queryset = KeyStrength.objects.filter(is_active=True)
    serializer_class = KeyStrengthSerializer

    def get_queryset(self):
        return KeyStrength.objects.filter(is_active=True).order_by('order', 'title')


class ContactMessageViewSet(viewsets.ModelViewSet):
    """ViewSet pour les messages de contact"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['post', 'options']  # Uniquement POST pour créer des messages

    def create(self, request, *args, **kwargs):
        """Crée un nouveau message de contact"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Message envoyé avec succès!'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
