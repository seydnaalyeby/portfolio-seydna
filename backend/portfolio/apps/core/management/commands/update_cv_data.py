from django.core.management.base import BaseCommand
from portfolio.apps.core.models import Profile, Skill, Project, Education, KeyStrength


class Command(BaseCommand):
    help = 'Update portfolio data to match the general CV'

    def handle(self, *args, **kwargs):
        self._update_profile()
        self._update_skills()
        self._update_projects()
        self._update_education()
        self._update_strengths()
        self.stdout.write(self.style.SUCCESS('Portfolio data updated successfully!'))

    def _update_profile(self):
        p = Profile.objects.get(id=1)
        p.title = "Ingénieur Informatique — Développement, Data & Systèmes"
        p.profile_text = (
            "Diplômé en Master 2 Informatique Appliquée à la Gestion (ISCAE), je dispose d'un profil "
            "polyvalent couvrant le développement web et mobile (Python/Django, Flutter, Java/Spring Boot), "
            "la data et l'IA (Machine Learning, Big Data) et l'administration de systèmes (Linux, bases de "
            "données, réseaux). Autonome, rigoureux et orienté résultats, je m'adapte rapidement à de nouveaux "
            "environnements techniques et métiers. Prêt à contribuer immédiatement à des projets concrets en "
            "appliquant les bonnes pratiques Agile et CI/CD."
        )
        p.save(update_fields=['title', 'profile_text'])
        self.stdout.write('  Profile updated.')

    def _update_skills(self):
        Skill.objects.all().delete()
        skills = [
            # Programming
            ('Python', 'programming', 90, 1),
            ('Java / Spring Boot', 'programming', 75, 2),
            ('Dart / Flutter', 'programming', 80, 3),
            ('JavaScript', 'programming', 70, 4),
            ('XML / SQL', 'programming', 75, 5),
            # Frameworks
            ('Django / DRF', 'framework', 90, 6),
            ('Flutter', 'framework', 80, 7),
            ('React / Angular', 'framework', 70, 8),
            # Data & AI — stored as 'tool' category
            ('Machine Learning', 'tool', 70, 9),
            ('Pandas / Sklearn', 'tool', 75, 10),
            ('Apache Spark', 'tool', 65, 11),
            # Databases
            ('PostgreSQL / MySQL', 'database', 80, 12),
            ('MongoDB', 'database', 70, 13),
            # Systems & DevOps
            ('Linux / Windows', 'tool', 80, 14),
            ('Git / Docker', 'tool', 75, 15),
            ('Réseaux / TCP-IP', 'tool', 70, 16),
        ]
        for name, cat, level, order in skills:
            Skill.objects.create(name=name, category=cat, level=level, order=order)
        self.stdout.write('  Skills updated.')

    def _update_projects(self):
        Project.objects.all().delete()
        projects = [
            {
                'title': 'Stage de Fin d\'Études — Big Data',
                'subtitle': 'Systèmes Distribués & Big Data',
                'description': 'Déploiement et analyse de données volumineuses avec Apache Spark sous Linux.',
                'technologies': 'Apache Spark, Linux, Big Data',
                'details': (
                    '• Déploiement et configuration d\'un cluster Big Data basé sur Apache Spark sous Linux.\n'
                    '• Traitement et analyse de données volumineuses, optimisation des performances.\n'
                    '• Rédaction de la documentation technique (procédures, configurations, guides).\n'
                    '• Gestion des droits d\'accès et sécurisation de l\'environnement.'
                ),
                'featured': True,
                'order': 1,
            },
            {
                'title': 'Application Web — API REST Sécurisée',
                'subtitle': 'Backend Django avec authentification JWT',
                'description': 'Conception d\'une API REST complète avec authentification JWT et gestion des rôles.',
                'technologies': 'Python/Django, PostgreSQL, JWT, Swagger',
                'details': (
                    '• Conception d\'une API REST complète avec authentification JWT et gestion des rôles utilisateurs.\n'
                    '• Modélisation PostgreSQL, validation des données et architecture orientée services.\n'
                    '• Documentation Swagger/OpenAPI et déploiement sur serveur Linux.'
                ),
                'featured': True,
                'order': 2,
            },
            {
                'title': 'Application Mobile — Gestion & Suivi',
                'subtitle': 'Application Flutter avec backend Django',
                'description': 'Interface mobile moderne avec navigation multi-écrans et intégration API.',
                'technologies': 'Dart/Flutter, REST API, Provider',
                'details': (
                    '• Développement d\'une interface mobile moderne avec navigation multi-écrans et design responsive.\n'
                    '• Intégration API backend Django, gestion d\'état avec Provider et formulaires validés.\n'
                    '• Gestion des erreurs réseau et optimisation de l\'expérience utilisateur.'
                ),
                'featured': False,
                'order': 3,
            },
        ]
        for data in projects:
            Project.objects.create(**data)
        self.stdout.write('  Projects updated.')

    def _update_education(self):
        Education.objects.all().delete()
        from datetime import date
        educations = [
            {
                'degree': 'Master 2 Informatique Appliquée à la Gestion',
                'institution': 'ISCAE',
                'location': 'Nouakchott, Mauritanie',
                'start_date': date(2024, 9, 1),
                'end_date': None,
                'current': True,
                'description': 'Développement logiciel avancé, Intelligence Artificielle, Systèmes d\'information, Gestion de projet.',
                'order': 1,
            },
            {
                'degree': 'Licence Réseaux Informatiques & Télécommunications',
                'institution': 'ISCAE',
                'location': 'Nouakchott, Mauritanie',
                'start_date': date(2021, 9, 1),
                'end_date': date(2024, 6, 30),
                'current': False,
                'description': 'Réseaux, programmation, bases de données, systèmes d\'exploitation, télécommunications.',
                'order': 2,
            },
            {
                'degree': 'Baccalauréat Série C',
                'institution': 'Lycée d\'Aïoun',
                'location': 'Aïoun, Mauritanie',
                'start_date': date(2018, 9, 1),
                'end_date': date(2021, 6, 30),
                'current': False,
                'description': 'Mathématiques, Sciences Physiques, Sciences Naturelles.',
                'order': 3,
            },
        ]
        for data in educations:
            Education.objects.create(**data)
        self.stdout.write('  Education updated.')

    def _update_strengths(self):
        KeyStrength.objects.all().delete()
        strengths = [
            ('Esprit analytique', 'Approche structurée pour résoudre des problèmes complexes.', 'fas fa-search', 1),
            ('Travail en équipe', 'Communication technique en français, anglais et arabe.', 'fas fa-users', 2),
            ('Adaptabilité', 'Veille technologique, apprentissage rapide, polyvalence technique.', 'fas fa-bolt', 3),
        ]
        for title, desc, icon, order in strengths:
            KeyStrength.objects.create(title=title, description=desc, icon=icon, order=order)
        self.stdout.write('  Key strengths updated.')
