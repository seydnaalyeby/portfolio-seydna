from django.db import models
from django.core.validators import EmailValidator
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings


class Profile(models.Model):
    """Modèle pour les informations du profil"""
    full_name = models.CharField(max_length=100, verbose_name="Nom complet")
    title = models.CharField(max_length=100, verbose_name="Titre")
    profile_text = models.TextField(verbose_name="Texte du profil")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, verbose_name="Téléphone")
    location = models.CharField(max_length=100, verbose_name="Localisation")
    github_url = models.URLField(blank=True, verbose_name="GitHub")
    linkedin_url = models.URLField(blank=True, verbose_name="LinkedIn")
    photo = models.ImageField(upload_to='profile/', blank=True, verbose_name="Photo")
    cv_file = models.FileField(upload_to='cv/', blank=True, verbose_name="Fichier CV")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profil"
        verbose_name_plural = "Profils"

    def __str__(self):
        return self.full_name


class Skill(models.Model):
    """Modèle pour les compétences"""
    CATEGORY_CHOICES = [
        ('programming', 'Programmation'),
        ('framework', 'Frameworks'),
        ('database', 'Bases de données'),
        ('tool', 'Outils'),
        ('soft', 'Compétences douces'),
    ]

    name = models.CharField(max_length=50, verbose_name="Nom de la compétence")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name="Catégorie")
    level = models.IntegerField(verbose_name="Niveau (0-100)", help_text="Niveau de maîtrise de 0 à 100")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Compétence"
        verbose_name_plural = "Compétences"
        ordering = ['order', 'category', 'name']

    def __str__(self):
        return f"{self.name} ({self.level}%)"


class Project(models.Model):
    """Modèle pour les projets techniques"""
    title = models.CharField(max_length=100, verbose_name="Titre du projet")
    subtitle = models.CharField(max_length=100, verbose_name="Sous-titre")
    description = models.TextField(verbose_name="Description")
    technologies = models.CharField(max_length=200, verbose_name="Technologies utilisées")
    details = models.TextField(verbose_name="Détails du projet", help_text="Liste des réalisations avec •")
    github_url = models.URLField(blank=True, verbose_name="URL GitHub")
    live_url = models.URLField(blank=True, verbose_name="URL en ligne")
    image = models.ImageField(upload_to='projects/', blank=True, verbose_name="Image du projet")
    featured = models.BooleanField(default=False, verbose_name="Mis en avant")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Projet"
        verbose_name_plural = "Projets"
        ordering = ['-featured', 'order', '-created_at']

    def __str__(self):
        return self.title


class Education(models.Model):
    """Modèle pour la formation"""
    degree = models.CharField(max_length=100, verbose_name="Diplôme")
    institution = models.CharField(max_length=100, verbose_name="Établissement")
    location = models.CharField(max_length=100, verbose_name="Localisation")
    start_date = models.DateField(verbose_name="Date de début")
    end_date = models.DateField(verbose_name="Date de fin", null=True, blank=True)
    current = models.BooleanField(default=False, verbose_name="En cours")
    description = models.TextField(blank=True, verbose_name="Description")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Formation"
        verbose_name_plural = "Formations"
        ordering = ['-start_date', 'order']

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class KeyStrength(models.Model):
    """Modèle pour les atouts clés"""
    title = models.CharField(max_length=50, verbose_name="Titre de l'atout")
    description = models.TextField(verbose_name="Description")
    icon = models.CharField(max_length=50, blank=True, verbose_name="Icone (classe Font Awesome)")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Atout clé"
        verbose_name_plural = "Atouts clés"
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    """Modèle pour les messages de contact"""
    name = models.CharField(max_length=100, verbose_name="Nom")
    email = models.EmailField(verbose_name="Email")
    subject = models.CharField(max_length=200, verbose_name="Sujet")
    message = models.TextField(verbose_name="Message")
    sent_at = models.DateTimeField(auto_now_add=True, verbose_name="Envoyé le")
    processed = models.BooleanField(default=False, verbose_name="Traité")

    class Meta:
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"
        ordering = ['-sent_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"

    def send_email(self):
        """Envoie un email avec les détails du message"""
        subject = f"Nouveau message de contact: {self.subject}"
        
        # Email pour l'administrateur
        admin_message = render_to_string('contact/admin_email.html', {
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
        })
        
        admin_email = EmailMessage(
            subject,
            admin_message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.DEFAULT_FROM_EMAIL],
        )
        admin_email.content_subtype = 'html'
        admin_email.send()
        
        # Email de confirmation pour l'expéditeur
        confirm_message = render_to_string('contact/confirm_email.html', {
            'name': self.name,
            'subject': self.subject,
        })
        
        confirm_email = EmailMessage(
            f"Confirmation de votre message: {self.subject}",
            confirm_message,
            settings.DEFAULT_FROM_EMAIL,
            [self.email],
        )
        confirm_email.content_subtype = 'html'
        confirm_email.send()
