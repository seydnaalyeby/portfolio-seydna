from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProfileViewSet, SkillViewSet, ProjectViewSet,
    EducationViewSet, KeyStrengthViewSet, ContactMessageViewSet
)

router = DefaultRouter()
router.register(r'profile', ProfileViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'education', EducationViewSet)
router.register(r'strengths', KeyStrengthViewSet)
router.register(r'contact', ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
