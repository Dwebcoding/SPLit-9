# SPLit 9 MVP

MVP web per collegare studi di architettura e tecnici locali per sopralluoghi fuori regione.

## Requisiti

- Node.js 20+
- MongoDB in esecuzione in locale o remoto

## Avvio

1. Copia `.env.example` in `.env`
2. Imposta `MONGODB_URI`
3. Installa le dipendenze con `npm install`
4. Avvia il server con `npm run dev`
5. Apri `http://localhost:3000`

## Deploy

### GitHub Pages

GitHub Pages non e' adatto a questo progetto completo, perche' serve solo file statici e non puo' eseguire il backend Node.js/Express ne' connettersi a MongoDB lato server.

### Vercel

Il progetto e' configurato per Vercel tramite `vercel.json` e `api/index.js`.

1. Importa la repo su Vercel
2. Imposta la variabile ambiente `MONGODB_URI`
3. Esegui il deploy

La stessa applicazione servira':

- `/` per la landing page
- `/richiedi-sopralluogo` e `/diventa-tecnico` per le pagine pubbliche
- `/api/sopralluoghi` e `/api/tecnici` per le API

## API

## Struttura dei file (rilevante)

- `src/public/html/index.html` — landing principale (ora tutti gli HTML sono sotto `src/public/html`).
- `src/public/html/` — cartella con le pagine HTML pubbliche.
- `src/public/css/styles.css` — foglio di stile principale (servito come `/css/styles.css`).
- `src/public/js/main.js` — script client per invio form (servito come `/js/main.js`).
- `src/routes/pages.js` — router che serve le pagine statiche; la route `/` serve `index.html` dalla root.
- `api/index.js` — entrypoint serverless per deploy su Vercel.
- `vercel.json` — configurazione di routing per Vercel.

## Percorsi pubblici e asset

- Landing: `GET /` → serve `index.html` (root)
- Form sopralluogo: `GET /richiedi-sopralluogo` → `src/public/html/sopralluoghi.html`
- Form tecnico: `GET /diventa-tecnico` → `src/public/html/tecnici.html`
- Assets CSS: `/css/styles.css` → `src/public/css/styles.css`
- Assets JS: `/js/main.js` → `src/public/js/main.js`

## Note

- La root `/` viene servita tramite il file `src/public/index.html`, che reindirizza alla landing in `src/public/html/index.html`.
- In locale usi `npm start` o `npm run dev`; in Vercel entra da `api/index.js`.
