# Interface Administrateur SPA Nina

Interface d'administration moderne et responsive pour la gestion d'un SPA de massage et de vente de produits.

## 🎯 Vue d'ensemble

Cette interface administrateur offre une solution complète pour gérer tous les aspects d'un SPA :
- Gestion des clients
- Services et massages
- Produits et stock
- Ventes et facturation
- Rendez-vous et planning
- Rapports et statistiques
- Administration des utilisateurs

## 🏗️ Architecture

### Structure des fichiers
```
app/admin/
├── components/          # Composants réutilisables
│   ├── DataTable.tsx   # Tableau de données avec filtres/pagination
│   ├── Modal.tsx       # Modals et confirmations
│   └── Toast.tsx       # Notifications toast
├── hooks/              # Hooks personnalisés
│   └── useAuth.ts      # Gestion de l'authentification
├── utils/              # Utilitaires
│   └── api.ts          # Configuration API et helpers
├── clients/            # Gestion des clients
├── services/           # Gestion des services
├── products/           # Gestion des produits (à créer)
├── sales/              # Gestion des ventes (à créer)
├── appointments/       # Gestion des RDV (à créer)
├── reports/            # Rapports et stats (à créer)
├── settings/           # Paramètres (à créer)
├── login/              # Page de connexion
├── layout.tsx          # Layout principal avec sidebar
├── page.tsx            # Dashboard principal
└── README.md           # Cette documentation
```

## 🎨 Design System

### Couleurs principales
- **Bleu** : `#2563eb` (blue-600) - Actions principales
- **Teal** : `#0d9488` (teal-600) - Accents et gradients
- **Violet** : `#7c3aed` (purple-600) - Services/massages
- **Vert** : `#059669` (green-600) - Succès
- **Rouge** : `#dc2626` (red-600) - Erreurs/suppressions
- **Orange** : `#ea580c` (orange-600) - Alertes

### Typographie
- **Police** : Inter (système de fallback)
- **Tailles** : Échelle Tailwind CSS standard
- **Poids** : 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Icônes
- **Bibliothèque** : Material Icons (@mui/icons-material)
- **Style** : Outlined (cohérent avec le design moderne)

## 🧩 Composants principaux

### DataTable
Tableau de données avancé avec :
- Recherche globale
- Tri par colonnes
- Filtres personnalisables
- Pagination
- Actions en ligne
- Export CSV/PDF
- Loading states

```tsx
<DataTable
  data={items}
  columns={columns}
  actions={actions}
  loading={loading}
  onRefresh={loadData}
  onExport={handleExport}
/>
```

### Modal
Système de modals flexible :
- Tailles configurables (sm, md, lg, xl, full)
- Fermeture par overlay/ESC
- Animations fluides
- Modal de confirmation intégrée

```tsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Titre du modal"
  size="lg"
>
  {/* Contenu */}
</Modal>
```

### Toast
Notifications toast avec :
- Types : success, error, warning, info
- Auto-dismiss configurable
- Animations d'entrée/sortie
- Positionnement fixe

```tsx
const { success, error, warning, info } = useToast();

success('Titre', 'Message de succès');
error('Erreur', 'Message d\'erreur');
```

## 🔐 Authentification

### Système d'auth
- Hook `useAuth` pour la gestion globale
- Composant `ProtectedRoute` pour protéger les routes
- Gestion des rôles et permissions
- Stockage sécurisé des tokens

### Rôles disponibles
- **Admin** : Accès complet
- **Manager** : Gestion opérationnelle
- **Employee** : Accès limité aux opérations courantes

### Permissions granulaires
```tsx
// Vérification de permission
const { hasPermission } = useAuth();
if (hasPermission(PERMISSIONS.CLIENTS_DELETE)) {
  // Afficher bouton supprimer
}

// Protection de route
<ProtectedRoute requiredPermission={PERMISSIONS.REPORTS_VIEW}>
  <ReportsPage />
</ProtectedRoute>
```

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 640px
- **Tablette** : 640px - 1024px
- **Desktop** : > 1024px

### Adaptations
- Sidebar collapsible sur desktop
- Menu mobile avec overlay
- Tableaux avec scroll horizontal
- Formulaires adaptés aux petits écrans

## 🎯 Fonctionnalités transversales

### Recherche globale
- Recherche dans l'en-tête
- Filtrage en temps réel
- Suggestions contextuelles

### Export de données
- Format CSV pour les données
- Format PDF pour les rapports
- Filtres appliqués aux exports

### Gestion d'état
- États de chargement uniformes
- Gestion d'erreurs centralisée
- Optimistic updates

## 🔧 Configuration API

### Structure des réponses
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
```

### Endpoints principaux
- `/api/clients` - Gestion des clients
- `/api/services` - Gestion des services
- `/api/products` - Gestion des produits
- `/api/sales` - Gestion des ventes
- `/api/appointments` - Gestion des RDV
- `/api/reports` - Rapports et statistiques
- `/api/auth` - Authentification

## 🚀 Démarrage rapide

### Identifiants de démonstration
- **Email** : admin@spa-nina.com
- **Mot de passe** : admin123

### Navigation
1. Connectez-vous avec les identifiants de démo
2. Explorez le dashboard principal
3. Testez la gestion des clients
4. Découvrez les services et massages

## 📋 Pages disponibles

### ✅ Implémentées
- **Dashboard** (`/admin`) - Vue d'ensemble avec statistiques
- **Connexion** (`/admin/login`) - Authentification
- **Clients** (`/admin/clients`) - CRUD complet des clients
- **Services** (`/admin/services`) - CRUD complet des services

### 🔄 À implémenter
- **Produits** (`/admin/products`) - Gestion du stock
- **Ventes** (`/admin/sales`) - Facturation et paiements
- **Achats** (`/admin/purchases`) - Gestion des achats
- **Dépenses** (`/admin/expenses`) - Suivi des dépenses
- **Comptabilité** (`/admin/accounting`) - Bilan financier
- **Employés** (`/admin/employees`) - Gestion du personnel
- **Rendez-vous** (`/admin/appointments`) - Planning et réservations
- **Rapports** (`/admin/reports`) - Analytics et statistiques
- **Paramètres** (`/admin/settings`) - Configuration système

## 🎨 Personnalisation

### Thème
Les couleurs et styles peuvent être personnalisés via :
- Variables CSS dans `globals.css`
- Configuration Tailwind CSS
- Composants stylés

### Ajout de nouvelles pages
1. Créer le dossier dans `/admin/`
2. Implémenter `page.tsx`
3. Ajouter la route dans le menu (layout.tsx)
4. Configurer les permissions si nécessaire

### Nouveaux composants
1. Créer dans `/admin/components/`
2. Suivre les patterns existants
3. Documenter les props TypeScript
4. Ajouter les styles nécessaires

## 🔍 Bonnes pratiques

### Code
- TypeScript strict activé
- Composants fonctionnels avec hooks
- Props typées avec interfaces
- Gestion d'erreurs systématique

### UX/UI
- Loading states pour toutes les actions
- Feedback utilisateur immédiat
- Confirmations pour actions destructives
- Navigation intuitive

### Performance
- Lazy loading des composants lourds
- Optimisation des re-renders
- Pagination côté serveur
- Cache intelligent des données

## 🐛 Debugging

### Logs
- Erreurs API dans la console
- États d'authentification
- Actions utilisateur importantes

### Outils de développement
- React DevTools
- Network tab pour les API calls
- Console pour les erreurs JavaScript

## 📚 Ressources

### Documentation
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Material Icons](https://mui.com/material-ui/material-icons/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Inspiration design
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)
- [Material Design](https://material.io/design)

---

**Note** : Cette interface est conçue pour être évolutive et maintenable. Chaque composant est documenté et réutilisable pour faciliter le développement futur.
