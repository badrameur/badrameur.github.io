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
| `content-customizer.js` | Surcouche qui personnalise le contenu après le rendu |
| `cv/` | CV au format PDF proposé au téléchargement |

## Contenu

Le texte du site vit à deux endroits : les données françaises et anglaises
sont dans le bundle `assets/index-C53yPSiq.js`, et `content-customizer.js`
réécrit une partie de ces textes dans le DOM après le premier rendu. Une
modification de contenu doit être faite aux deux endroits lorsque le champ
concerné est repris par la surcouche, sinon elle sera écrasée.

Les métadonnées de référencement (titre, description, Open Graph, JSON-LD)
sont statiques dans `index.html` et `en/index.html`, et doivent être
modifiées séparément du bundle.
