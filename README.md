# Portfolio — Badr Ameur El Idrissi

Portfolio personnel d'étudiant ingénieur cybersécurité à l'ENSA Tanger.
Site statique bilingue (français / anglais) : parcours, projets, compétences,
certifications, formation et CV téléchargeable.

## Lancer en local

Le site est entièrement statique et doit être servi depuis `exact-clone/`,
qui fait office de racine web (les chemins des assets et du CV sont absolus).

```bash
cd exact-clone
python -m http.server 4173
```

Puis ouvrir http://localhost:4173

## Structure

| Chemin | Rôle |
|---|---|
| `exact-clone/` | Racine du site servi |
| `exact-clone/assets/` | Bundle JS/CSS et polices |
| `exact-clone/content-customizer.js` | Surcouche qui personnalise le contenu après le rendu |
| `exact-clone/cv/` | CV au format PDF proposé au téléchargement |
| `index.html` | Redirection vers `exact-clone/` |

## Contenu

Le texte du site vit à deux endroits : les données françaises et anglaises
sont dans le bundle `exact-clone/assets/index-C53yPSiq.js`, et
`content-customizer.js` réécrit une partie de ces textes dans le DOM après le
premier rendu. Une modification de contenu doit être faite aux deux endroits
lorsque le champ concerné est repris par la surcouche, sinon elle sera écrasée.
