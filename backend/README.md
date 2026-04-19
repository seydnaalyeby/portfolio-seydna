# Portfolio Backend - Django REST API

Backend Django pour le portfolio personnel de Seydna Aly Eby.

## Installation

1. **Créer un environnement virtuel**
```bash
python -m venv venv
venv\Scripts\activate
```

2. **Installer les dépendances**
```bash
pip install -r requirements.txt
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Éditer .env avec vos configurations
```

4. **Appliquer les migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Charger les données initiales**
```bash
python manage.py load_initial_data
```

6. **Créer un superutilisateur**
```bash
python manage.py createsuperuser
```

7. **Démarrer le serveur**
```bash
python manage.py runserver
```

## API Endpoints

### Profil
- `GET /api/profile/main/` - Obtenir le profil principal

### Compétences
- `GET /api/skills/` - Liste des compétences
- `GET /api/skills/by_category/` - Compétences groupées par catégorie

### Projets
- `GET /api/projects/` - Liste des projets
- `GET /api/projects/featured/` - Projets mis en avant

### Formation
- `GET /api/education/` - Liste de la formation

### Atouts Clés
- `GET /api/strengths/` - Liste des atouts clés

### Contact
- `POST /api/contact/` - Envoyer un message de contact

## Administration

Accédez à l'interface d'administration: `http://127.0.0.1:8000/admin/`

Vous pouvez modifier:
- Informations du profil
- Compétences et niveaux
- Projets et détails
- Formation
- Atouts clés
- Messages de contact

## Configuration Email

Pour activer l'envoi d'emails via le formulaire de contact:

1. **Avec Gmail/Google Workspace:**
   - Activez l'authentification en deux facteurs
   - Créez un mot de passe d'application
   - Configurez `.env`:
     ```
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_HOST_USER=votre-email@gmail.com
     EMAIL_HOST_PASSWORD=votre-app-password
     EMAIL_USE_TLS=True
     ```

2. **Avec autre provider SMTP:**
   - Adaptez les configurations `EMAIL_HOST`, `EMAIL_PORT`, etc.

## Déploiement

### Sur PythonAnywhere
1. Upload du code
2. Configuration du virtualenv
3. Installation des dépendances
4. Configuration du fichier `wsgi.py`
5. Configuration des variables d'environnement
6. Migration de la base de données
7. Chargement des données initiales

### Sur Railway/Render
1. Connectez votre repository Git
2. Configurez les variables d'environnement
3. Déployez automatiquement

## Structure du Projet

```
backend/
portfolio/
    apps/
        core/           # Modèles et admin
        api/            # Serializers et vues API
    templates/         # Templates emails
    settings.py        # Configuration Django
    urls.py           # URLs principales
manage.py
requirements.txt
.env.example
```
