Frontend Angular Development
🎯 Étape 1 — Initialisation du projet Angular
markdown
Copier
Modifier
Copilot, crée-moi une application Angular avec routing activé, en SCSS.

Structure du projet à respecter :

- `/services` : pour les appels API
- `/models` : interfaces des DTOs
- `/components` : composants de l’application
- `/pages` : vues principales (client, crédits, remboursements, etc.)

Configurer le fichier `environment.ts` pour que l’API pointe vers `http://localhost:8080` (ou selon le port backend).
🔌 Étape 2 — Création des services Angular pour consommer l’API REST
markdown
Copier
Modifier
Copilot, crée-moi les services Angular dans le dossier `/services` pour :

- `client.service.ts` : CRUD client
- `credit.service.ts` : CRUD crédit et sous-types
- `remboursement.service.ts` : CRUD remboursement

Utiliser `HttpClient` pour toutes les requêtes, gérer les erreurs de base avec `catchError`.

Chaque service doit fournir :

- Méthodes `getAll()`, `getById(id)`, `add(obj)`, `update(obj)`, `delete(id)`
  🧩 Étape 3 — Création des modèles (interfaces) Angular
  markdown
  Copier
  Modifier
  Copilot, dans `/models`, crée les interfaces TypeScript correspondant aux DTOs backend :
- Client
- Credit (et sous-types)
- Remboursement
- Enums : `StatutCredit`, `TypeRemboursement`, `TypeBien`

Utiliser les types `string`, `number`, `Date` selon les attributs.
🖼️ Étape 4 — Création des composants et vues (UI)
markdown
Copier
Modifier
Copilot, crée les composants Angular pour :

- Affichage de la liste des clients
- Formulaire d’ajout de client
- Liste des crédits d’un client
- Formulaire d’ajout de crédit selon le type sélectionné (Personnel, Immobilier, Professionnel)
- Liste des remboursements d’un crédit
- Formulaire d’ajout de remboursement

Utiliser ReactiveFormsModule pour les formulaires.

Afficher les messages d’erreur si un formulaire est invalide.

Ajouter un indicateur de chargement lors des appels API.
🧪 Étape 5 — Tester l’application Angular
markdown
Copier
Modifier
Copilot, démarre le serveur Angular (`ng serve`) et teste que :

- Les listes s’affichent correctement
- Les formulaires fonctionnent et appellent les bonnes méthodes des services
- L’API backend répond correctement (pas besoin de sécurité à ce stade)
- Les erreurs sont affichées proprement
