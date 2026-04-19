from django.contrib import admin
from .models import Profile, Skill, Project, Education, KeyStrength, ContactMessage


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'title', 'email', 'updated_at']
    search_fields = ['full_name', 'title', 'email']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Informations personnelles', {
            'fields': ('full_name', 'title', 'profile_text', 'photo')
        }),
        ('Contact', {
            'fields': ('email', 'phone', 'location', 'github_url', 'linkedin_url')
        }),
        ('Documents', {
            'fields': ('cv_file',)
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'level', 'is_active', 'order']
    list_filter = ['category', 'is_active']
    search_fields = ['name']
    list_editable = ['is_active', 'order']
    ordering = ['order', 'category', 'name']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'featured', 'is_active', 'order', 'created_at']
    list_filter = ['featured', 'is_active']
    search_fields = ['title', 'subtitle']
    list_editable = ['featured', 'is_active', 'order']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Informations principales', {
            'fields': ('title', 'subtitle', 'description', 'image')
        }),
        ('Détails techniques', {
            'fields': ('technologies', 'details')
        }),
        ('Liens', {
            'fields': ('github_url', 'live_url')
        }),
        ('Affichage', {
            'fields': ('featured', 'order', 'is_active')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'location', 'start_date', 'current', 'is_active', 'order']
    list_filter = ['current', 'is_active']
    search_fields = ['degree', 'institution']
    list_editable = ['current', 'is_active', 'order']
    ordering = ['-start_date', 'order']


@admin.register(KeyStrength)
class KeyStrengthAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active']
    search_fields = ['title', 'description']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'title']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'sent_at', 'processed']
    list_filter = ['processed', 'sent_at']
    search_fields = ['name', 'email', 'subject']
    list_editable = ['processed']
    readonly_fields = ['sent_at']
    ordering = ['-sent_at']
