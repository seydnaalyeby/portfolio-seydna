# Installation Rapide - Portfolio Seydna Aly Eby

## Installation en 5 minutes

### 1. Backend Django

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Éditer .env avec vos configs
python manage.py makemigrations
python manage.py migrate
python manage.py load_initial_data
python manage.py createsuperuser
python manage.py runserver
```

Backend: `http://127.0.0.1:8000`
Admin: `http://127.0.0.1:8000/admin`

### 2. Frontend React

```bash
cd frontend
npm install
echo "VITE_API_URL=http://127.0.0.1:8000/api" > .env
npm run dev
```

Frontend: `http://localhost:3000`

### 3. Accès rapide

- **Portfolio**: http://localhost:3000
- **Admin Django**: http://127.0.0.1:8000/admin
- **API Docs**: http://127.0.0.1:8000/api/

### 4. Configuration Email (optionnel)

Dans `backend/.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=votre-email@gmail.com
EMAIL_HOST_PASSWORD=votre-app-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=votre-email@gmail.com
```

C'est tout ! Votre portfolio est maintenant fonctionnel.
