# Portfolio — Giuseppe Bianco

Sito personale in HTML, CSS (Sass) e Bootstrap.

## Pagine

- `index.html` — Home, hero, chi sono, competenze
- `progetti.html` — Progetti in evidenza, organizzati per categoria (layout con CSS Grid)
- `cv.html` — Curriculum Vitae in HTML
- `contatti.html` — Contattami, con form (layout con Flexbox)

## Tecnologie

- HTML5 semantico
- Sass (partial in `scss/`, compilati in `css/style.css`)
- Bootstrap 5 (via CDN, per navbar responsive e utility)
- Flexbox e CSS Grid per i layout principali
- Menu di navigazione sticky (anche su mobile)
- Favicon SVG

## Sviluppo locale

```bash
npm install
npm run build:css     # compila scss/style.scss -> css/style.css una volta
npm run watch:css      # ricompila automaticamente ad ogni modifica
```

Apri `index.html` con Live Server (o un qualsiasi server statico) per vedere il sito in locale.

## Form di contatto (EmailJS — opzionale)

Il form in `contatti.html` è predisposto per l'invio via [EmailJS](https://www.emailjs.com/).
Per attivarlo:

1. Crea un account gratuito su EmailJS.
2. Crea un Email Service e un Email Template.
3. Apri `js/main.js` e sostituisci `YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID` con i tuoi valori.

Finché i placeholder non vengono sostituiti, il form mostra un messaggio informativo invece di inviare l'email.

## Pubblicazione su GitHub Pages

1. Crea un repository su GitHub (es. `portfolio-giuseppe-bianco`).
2. `git init`, `git add`, `git commit`, `git remote add origin <url>`, `git push`.
3. Nelle impostazioni del repository → **Pages**, seleziona il branch `main` e la cartella `/ (root)`.
4. Il sito sarà disponibile all'indirizzo `https://<utente>.github.io/<repo>/`.
