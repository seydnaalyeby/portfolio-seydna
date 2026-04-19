# Portfolio Seydna Aly Eby

Portfolio personnel moderne et professionnel pour Seydna Aly Eby, développé avec Django REST API et React TypeScript.

## Stack Technique

### Backend
- **Django 5** - Framework web Python
- **Django REST Framework** - API REST
- **SQLite** - Base de données (facilement migrable vers PostgreSQL)
- **Python Decouple** - Gestion des variables d'environnement
- **Pillow** - Gestion des images
- **Django CORS Headers** - Gestion des CORS

### Frontend
- **React 18** - Bibliothèque JavaScript
- **TypeScript** - Typage statique
- **Vite** - Build tool et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations
- **React Router v6** - Routing
- **Axios** - Client HTTP

## Caractéristiques

- Design moderne avec dark mode par défaut
- Interface responsive (mobile-first)
- Animations fluides et micro-interactions
- Navigation fixe avec effet glassmorphism
- Barres de progression pour les compétences
- Formulaire de contact fonctionnel avec envoi d'email
- Page d'administration Django pour gérer le contenu
- API REST complète
- SEO optimisé
- Code propre et commenté

## Structure du Projet

```
portfolio/
backend/                 # Backend Django
  portfolio/             # Projet Django principal
    apps/                # Applications Django
      core/             # Modèles et admin
      api/              # API REST
    templates/          # Templates emails
    settings.py         # Configuration
    urls.py            # URLs principales
  manage.py            # Script de gestion Django
  requirements.txt     # Dépendances Python
  .env.example        # Variables d'environnement

frontend/               # Frontend React
  src/
    components/         # Composants React
      Layout/         # Header, Footer
      Hero/           # Section principale
      About/          # Section profil
      Skills/         # Section compétences
      Projects/       # Section projets
      Education/      # Section formation
      Strengths/      # Section atouts
      Contact/        # Section contact
    pages/             # Pages (si besoin)
    hooks/             # Hooks personnalisés
    services/          # Services API
    types/             # Types TypeScript
    utils/             # Utilitaires
  public/              # Fichiers statiques
  package.json         # Dépendances Node.js
  tailwind.config.js   # Configuration Tailwind
  vite.config.ts      # Configuration Vite
```

## Installation et Lancement

### Prérequis

- Python 3.8+
- Node.js 16+
- npm ou yarn

### 1. Backend Django

```bash
# Naviguer vers le dossier backend
cd backend

# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement (Windows)
venv\Scripts\activate
# Ou (Linux/Mac)
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos configurations

# Appliquer les migrations
python manage.py makemigrations
python manage.py migrate

# Charger les données initiales
python manage.py load_initial_data

# Créer un superutilisateur
python manage.py createsuperuser

# Démarrer le serveur de développement
python manage.py runserver
```

Le backend sera accessible sur `http://127.0.0.1:8000`

### 2. Frontend React

```bash
# Naviguer vers le dossier frontend (nouveau terminal)
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

### 3. Configuration de l'API

Dans le frontend, créez un fichier `.env` à la racine du dossier `frontend`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Administration Django

Accédez à l'interface d'administration: `http://127.0.0.1:8000/admin/`

Connectez-vous avec le superutilisateur créé précédemment. Vous pouvez modifier:

- **Profil**: Informations personnelles, photo, CV
- **Compétences**: Ajouter/modifier les compétences et niveaux
- **Projets**: Gérer les projets techniques
- **Formation**: Parcours académique
- **Atouts Clés**: Qualités personnelles
- **Messages**: Consulter les messages de contact

## Configuration Email

Pour activer l'envoi d'emails via le formulaire de contact:

### Avec Gmail

1. Activez l'authentification en deux facteurs sur votre compte Google
2. Allez dans la sécurité de votre compte
3. Créez un "mot de passe d'application"
4. Configurez votre fichier `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=votre-email@gmail.com
EMAIL_HOST_PASSWORD=votre-mot-de-passe-app
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=votre-email@gmail.com
```

### Avec autre provider SMTP

Adaptez les configurations `EMAIL_HOST`, `EMAIL_PORT`, etc. selon votre provider.

## Déploiement

### Déploiement sur Railway/Render (Backend)

1. Connectez votre repository Git
2. Configurez les variables d'environnement dans le dashboard
3. Déployez automatiquement

Variables d'environnement requises:
- `SECRET_KEY`
- `DEBUG=False`
- `ALLOWED_HOSTS=votre-domaine.com`
- Configuration email (si souhaité)

### Déploiement sur Vercel (Frontend)

1. Connectez votre repository Git à Vercel
2. Configurez la variable d'environnement `VITE_API_URL`
3. Déployez automatiquement

### Déploiement sur PythonAnywhere

1. Upload du code sur le serveur
2. Configuration du virtualenv
3. Installation des dépendances
4. Configuration du fichier `wsgi.py`
5. Migration de la base de données
6. Chargement des données initiales

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

## Personnalisation

### Modifier le contenu

1. **Via l'admin Django**: Accédez à `/admin/` pour modifier le contenu
2. **Via le code**: Modifiez le fichier `load_initial_data.py` pour les données initiales

### Personnaliser le design

1. **Couleurs**: Modifiez `tailwind.config.js` dans le frontend
2. **Animations**: Ajustez les composants React avec Framer Motion
3. **Layout**: Modifiez les composants dans `src/components/`

### Ajouter de nouvelles sections

1. **Backend**: Créez un nouveau modèle dans `portfolio/apps/core/models.py`
2. **API**: Ajoutez les endpoints dans `portfolio/apps/api/`
3. **Frontend**: Créez un nouveau composant et ajoutez-le à `App.tsx`

## Développement

### Lancer les tests

```bash
# Backend
cd backend
python manage.py test

# Frontend
cd frontend
npm run test
```

### Linter et formatage

```bash
# Backend
pip install flake8 black
flake8 .
black .

# Frontend
npm run lint
npm run lint:fix
```

## Support

Pour toute question ou problème, n'hésitez pas à contacter:

- Email: seydnaalyeby@gmail.com
- GitHub: https://github.com/seydna
- LinkedIn: https://linkedin.com/in/seydna

## License

Ce projet est sous licence MIT.
