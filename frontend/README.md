# Frontend - Portfolio Seydna Aly Eby

Frontend React TypeScript pour le portfolio personnel de Seydna Aly Eby.

## Installation

### Prérequis

- Node.js 16+
- npm ou yarn

### Installation des dépendances

```bash
npm install
```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### Démarrage

```bash
# Serveur de développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Build pour production
- `npm run preview` - Preview du build de production
- `npm run lint` - Lance le linter ESLint

## Structure du projet

```
src/
  components/          # Composants React
    Layout/           # Header, Footer
    Hero/             # Section principale
    About/            # Section profil
    Skills/           # Section compétences
    Projects/         # Section projets
    Education/        # Section formation
    Strengths/        # Section atouts
    Contact/          # Section contact
  hooks/              # Hooks personnalisés
  services/           # Services API
  types/              # Types TypeScript
  utils/              # Utilitaires
  App.tsx             # Composant principal
  main.tsx            # Point d'entrée
  index.css           # Styles globaux
```

## Technologies utilisées

- **React 18** - Bibliothèque JavaScript
- **TypeScript** - Typage statique
- **Vite** - Build tool et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations
- **React Router v6** - Routing
- **Axios** - Client HTTP

## Design System

### Couleurs

- **Primary**: #0A84FF (Bleu principal)
- **Background**: #000000 (Noir)
- **Surface**: #1C1C1E (Gris foncé)
- **Text**: #FFFFFF (Blanc)
- **Text Secondary**: #8E8E93 (Gris)

### Animations

Les animations sont gérées avec Framer Motion:
- Fade in/out
- Slide up/down
- Scale effects
- Hover states

### Composants réutilisables

- **Layout**: Header, Footer
- **Sections**: Hero, About, Skills, Projects, Education, Strengths, Contact
- **Forms**: Contact form avec validation
- **Cards**: Project cards, skill cards

## API Integration

Le frontend communique avec l'API Django via:

- **Services**: `src/services/api.ts`
- **Hooks**: `src/hooks/useApi.ts`
- **Types**: `src/types/index.ts`

## Déploiement

### Vercel

1. Connectez votre repository Git à Vercel
2. Configurez la variable d'environnement `VITE_API_URL`
3. Déployez automatiquement

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Configurez la variable d'environnement `VITE_API_URL`

## Personnalisation

### Modifier les couleurs

Éditez `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#votre-couleur',
      // ...
    }
  }
}
```

### Ajouter des animations

Utilisez Framer Motion dans les composants:

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Contenu
</motion.div>
```

### Ajouter de nouvelles sections

1. Créez un composant dans `src/components/`
2. Ajoutez-le dans `App.tsx`
3. Créez les hooks et services nécessaires
