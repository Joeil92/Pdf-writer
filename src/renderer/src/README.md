# Architecture (Feature-Sliced Design)

Couches, de la plus haute à la plus basse. Une couche ne peut importer que les couches en dessous d'elle, et uniquement via l'`index.ts` public de chaque slice (imposé par ESLint, voir `eslint.config.mjs`).

- `app` — providers, styles globales, composition racine (`app.tsx`)
- `pages` — assemblage d'une page à partir de widgets/features/entities
- `widgets` — blocs UI composites réutilisables entre pages
- `features` — interactions utilisateur (ex. `create-document`)
- `entities` — modèles métier (types, logique liée à une entité)
- `shared` — code générique sans logique métier (`ui`, `api`, `lib`, `config`)

Chaque slice (dossier sous `pages/*`, `widgets/*`, `features/*`, `entities/*`) expose son API via un `index.ts` — ne pas importer les fichiers internes d'une autre slice directement.

Alias disponibles : `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`.
