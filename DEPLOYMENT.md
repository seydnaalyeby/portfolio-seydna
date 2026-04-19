# Guide de Déploiement - Portfolio Seydna Aly Eby

## Déploiement Backend (Django)

### Option 1: Railway

1. **Connectez votre repository** à Railway
2. **Variables d'environnement** requises:
   ```
   SECRET_KEY=votre-secret-key-secure
   DEBUG=False
   ALLOWED_HOSTS=votre-domaine.railway.app
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_HOST_USER=votre-email@gmail.com
   EMAIL_HOST_PASSWORD=votre-app-password
   EMAIL_USE_TLS=True
   DEFAULT_FROM_EMAIL=votre-email@gmail.com
   ```
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `python manage.py runserver 0.0.0.0:$PORT`

### Option 2: Render

1. **Créez un Web Service** sur Render
2. **Connectez votre repository**
3. **Configurez les variables d'environnement**
4. **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
5. **Start Command**: `gunicorn portfolio.wsgi:application`

### Option 3: PythonAnywhere

1. **Upload** votre code sur PythonAnywhere
2. **Créez un virtualenv** et installez les dépendances
3. **Configurez le fichier WSGI**
4. **Migrez la base de données**: `python manage.py migrate`
5. **Chargez les données initiales**: `python manage.py load_initial_data`

## Déploiement Frontend (React)

### Option 1: Vercel

1. **Connectez votre repository** à Vercel
2. **Configurez les variables d'environnement**:
   ```
   VITE_API_URL=https://votre-backend-url.com/api
   ```
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### Option 2: Netlify

1. **Connectez votre repository** à Netlify
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Variables d'environnement**:
   ```
   VITE_API_URL=https://votre-backend-url.com/api
   ```

### Option 3: GitHub Pages

1. **Modifiez vite.config.ts**:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/votre-repo-name/',
     build: {
       outDir: 'dist'
     }
   })
   ```

## Configuration Email

### Gmail (Recommandé)

1. **Activez l'authentification 2 facteurs** sur votre compte Google
2. **Allez dans la sécurité** de votre compte
3. **Générez un mot de passe d'application**
4. **Configurez les variables**:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_HOST_USER=votre-email@gmail.com
   EMAIL_HOST_PASSWORD=votre-app-password-16-caracteres
   EMAIL_USE_TLS=True
   ```

### Autres Providers

**Outlook:**
```
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
```

**SendGrid:**
```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USE_TLS=True
```

## Domaine Personnalisé

### Backend

1. **Ajoutez votre domaine** dans `ALLOWED_HOSTS`
2. **Configurez le DNS** pour pointer vers votre serveur
3. **Activez HTTPS** avec Let's Encrypt

### Frontend

1. **Ajoutez votre domaine** dans les paramètres Vercel/Netlify
2. **Mettez à jour `VITE_API_URL`** avec votre nouveau domaine backend

## Sécurité

### Backend Django

1. **Désactivez DEBUG** en production
2. **Utilisez une SECRET_KEY** forte
3. **Configurez CORS** pour votre domaine frontend uniquement
4. **Activez HTTPS** obligatoire
5. **Limitez les ALLOWED_HOSTS**

### Frontend React

1. **Validez les entrées** utilisateur
2. **Utilisez HTTPS** obligatoire
3. **Limitez les requêtes API** à votre domaine backend

## Monitoring

### Backend

- **Health check**: `/health/`
- **Logs Django**: Configurez logging
- **Error tracking**: Sentry (optionnel)

### Frontend

- **Analytics**: Google Analytics (optionnel)
- **Error tracking**: Sentry (optionnel)

## Backup

### Base de données

- **Export**: `python manage.py dumpdata > backup.json`
- **Import**: `python manage.py loaddata backup.json`

### Médias

- **Backup** du dossier `media/`
- **Utilisez** S3 ou autre stockage cloud en production

## Maintenance

### Mises à jour

```bash
# Backend
pip install -r requirements.txt --upgrade
python manage.py migrate
python manage.py collectstatic --noinput

# Frontend
npm update
npm run build
```

### Surveillance

- **Vérifiez** les logs régulièrement
- **Surveillez** les performances
- **Testez** le formulaire de contact mensuellement

## Support

En cas de problème:

1. **Vérifiez les logs** du backend
2. **Testez l'API** avec curl/Postman
3. **Vérifiez les variables** d'environnement
4. **Contactez** l'hébergeur si nécessaire

---

**Le portfolio est maintenant prêt pour la production !**
