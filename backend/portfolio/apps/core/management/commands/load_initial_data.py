from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from portfolio.apps.core.models import Profile, Skill, Project, Education, KeyStrength


class Command(BaseCommand):
    help = 'Charge les données initiales du portfolio'

    def handle(self, *args, **options):
        self.stdout.write('Chargement des données initiales...')

        # Create superuser if it doesn't exist
        User = get_user_model()
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'seydnaalyeby@gmail.com', 'admin1234')
            self.stdout.write('Superuser créé: admin / admin1234')

        # Update profile without touching the photo field (preserves Cloudinary upload)
        profile, created = Profile.objects.update_or_create(
            email="seydnaalyeby@gmail.com",
            defaults={
                "full_name": "SEYDNA ALY EBY",
                "title": "Étudiant en Master 2",
                "profile_text": "Étudiant en Master 2 Informatique Appliquée à la Gestion à l'ISCAE, je recherche un stage en développement logiciel, data ou IA. Spécialisé en backend Python/Django, développement mobile Flutter et bases de l'Intelligence Artificielle, je suis autonome, rigoureux et orienté résultats. Je souhaite contribuer à des projets concrets en appliquant les bonnes pratiques Agile et CI/CD.",
                "phone": "+222 30 45 43 77",
                "location": "Nouakchott, Mauritanie",
                "github_url": "https://github.com/seydnaalyeby/",
                "linkedin_url": "https://www.linkedin.com/in/seydna-aly-7b80a73b5",
            }
        )

        # Reset non-file data
        Skill.objects.all().delete()
        Education.objects.all().delete()
        KeyStrength.objects.all().delete()

        # Création des compétences
        skills_data = [
            # Programmation
            ("Python", "programming", 90, 1),
            ("Dart (Flutter)", "programming", 85, 2),
            ("JavaScript", "programming", 80, 3),
            ("Java", "programming", 75, 4),
            
            # Frameworks
            ("Django", "framework", 90, 1),
            ("Flutter", "framework", 85, 2),
            ("React", "framework", 70, 3),
            ("Angular", "framework", 65, 4),
            
            # Bases de données
            ("PostgreSQL", "database", 85, 1),
            ("MySQL", "database", 80, 2),
            ("MongoDB", "database", 75, 3),
            
            # Outils
            ("Git", "tool", 90, 1),
            ("Linux", "tool", 85, 2),
            ("Docker", "tool", 70, 3),
            
            # Machine Learning
            ("Machine Learning", "programming", 75, 5),
            ("Pandas", "tool", 80, 4),
            ("Scikit-learn", "tool", 75, 5),
        ]

        for name, category, level, order in skills_data:
            Skill.objects.create(
                name=name,
                category=category,
                level=level,
                order=order
            )

        # Création des projets
        projects_data = [
            {
                "title": "Application Web Django",
                "subtitle": "API REST Sécurisée",
                "description": "Conception et développement d'une API REST sécurisée avec authentification JWT et gestion des rôles.",
                "technologies": "Backend Python/Django, PostgreSQL, JWT, REST",
                "details": "Conception et développement d'une API REST sécurisée avec authentification JWT et gestion des rôles.\nModélisation de la base de données PostgreSQL, validation des données et architecture orientée services.\nDocumentation complète de l'API (Swagger/OpenAPI) et déploiement sur serveur Linux.",
                "featured": True,
                "order": 1
            },
            {
                "title": "Application Mobile Flutter",
                "subtitle": "Gestion & Suivi",
                "description": "Développement d'une interface mobile moderne avec navigation multi-écrans et design responsive.",
                "technologies": "Dart, Flutter, REST API, Provider",
                "details": "Développement d'une interface mobile moderne avec navigation multi-écrans et design responsive.\nIntégration de l'API backend Django, gestion d'état avec Provider et formulaires validés.\nGestion des erreurs réseau, expérience utilisateur fluide et optimisation des performances.",
                "featured": True,
                "order": 2
            },
            {
                "title": "Stage de Fin d'Études",
                "subtitle": "Systèmes Distribués & Big Data",
                "description": "Mise en place d'un système distribué basé sur Apache Spark.",
                "technologies": "Apache Spark, Big Data, Linux",
                "details": "Mise en place d'un système distribué basé sur Apache Spark.\nTraitement de grandes quantités de données et optimisation des performances.\nConfiguration de l'environnement Linux et monitoring des applications distribuées.",
                "featured": False,
                "order": 3
            }
        ]

        for project_data in projects_data:
            Project.objects.update_or_create(
                title=project_data['title'],
                defaults={k: v for k, v in project_data.items() if k != 'title'}
            )

        # Création de la formation
        education_data = [
            {
                "degree": "Master 2 Informatique Appliquée à la Gestion",
                "institution": "ISCAE",
                "location": "Nouakchott",
                "start_date": "2024-09-01",
                "end_date": None,
                "current": True,
                "description": "Spécialisation en développement logiciel, bases de données et intelligence artificielle",
                "order": 1
            },
            {
                "degree": "Licence en Réseau Informatique et Télécommunication",
                "institution": "ISCAE",
                "location": "Nouakchott",
                "start_date": "2021-09-01",
                "end_date": "2024-06-30",
                "current": False,
                "description": "Formation fondamentale en réseaux, télécommunications et informatique",
                "order": 2
            },
            {
                "degree": "Baccalauréat Scientifique",
                "institution": "Lycée d'Aioun",
                "location": "Aioun",
                "start_date": "2017-09-01",
                "end_date": "2021-06-30",
                "current": False,
                "description": "Spécialité Mathématiques et Physique-Chimie",
                "order": 3
            }
        ]

        for edu_data in education_data:
            Education.objects.create(**edu_data)

        # Création des atouts clés
        strengths_data = [
            {
                "title": "Autonomie",
                "description": "Capacité à travailler indépendamment et à prendre des initiatives pour résoudre les problèmes techniques.",
                "icon": "fas fa-user-check",
                "order": 1
            },
            {
                "title": "Rigueur",
                "description": "Attention aux détails dans le code, respect des normes et des bonnes pratiques de développement.",
                "icon": "fas fa-clipboard-check",
                "order": 2
            },
            {
                "title": "Orienté Résultats",
                "description": "Focus sur la livraison de solutions fonctionnelles et optimisées dans les délais impartis.",
                "icon": "fas fa-target",
                "order": 3
            },
            {
                "title": "Esprit d'Équipe",
                "description": "Collaboration efficace avec les autres développeurs et communication fluide dans les projets.",
                "icon": "fas fa-users",
                "order": 4
            },
            {
                "title": "Curiosité Technique",
                "description": "Veille technologique constante et apprentissage rapide des nouvelles technologies et frameworks.",
                "icon": "fas fa-lightbulb",
                "order": 5
            },
            {
                "title": "Résolution de Problèmes",
                "description": "Approche méthodique pour analyser, comprendre et résoudre les problèmes complexes.",
                "icon": "fas fa-puzzle-piece",
                "order": 6
            }
        ]

        for strength_data in strengths_data:
            KeyStrength.objects.create(**strength_data)

        self.stdout.write(self.style.SUCCESS('Données initiales chargées avec succès!'))
