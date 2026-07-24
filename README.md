# Portfolio — Badr Ameur El Idrissi

Portfolio personnel d'étudiant ingénieur cybersécurité à l'ENSA Tanger.
Site statique bilingue (français / anglais) : parcours, projets, compétences,
certifications, formation et CV téléchargeable.

Publié via GitHub Pages sur **https://badrameur.github.io**

## Lancer en local

Le site doit être servi depuis la racine du dépôt : les chemins des assets,
du CV et de la favicon sont absolus (`/assets/...`, `/cv/...`).

```bash
python -m http.server 4173
```

Puis ouvrir http://localhost:4173

## Structure

| Chemin | Rôle |
|---|---|
| `index.html` | Page d'entrée française |
| `en/index.html` | Page d'entrée anglaise (`/en/`) |
| `assets/` | Bundle JS/CSS et polices |
| `cv/` | CV au format PDF proposé au téléchargement |

## Contenu

Tout le texte du site — français et anglais — vit dans le bundle
`assets/index-C53yPSiq.js`, dans un objet `{fr: {...}, en: {...}}`.
Chaque section (hero, about, experience, projects, skills, certs, education,
languages, cv, contact) y a ses données.

Les métadonnées de référencement (titre, description, Open Graph, JSON-LD)
sont statiques dans `index.html` et `en/index.html`, et doivent être
modifiées séparément du bundle.

Le CV PDF servi depuis `cv/` est généré depuis le document Word source
conservé hors dépôt.
