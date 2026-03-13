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

## API

## Struttura dei file (rilevante)

- `src/public/html/index.html` — landing principale (ora tutti gli HTML sono sotto `src/public/html`).
- `src/public/html/` — cartella con le pagine HTML pubbliche.
- `src/public/css/styles.css` — foglio di stile principale (servito come `/css/styles.css`).
- `src/public/js/main.js` — script client per invio form (servito come `/js/main.js`).
- `src/routes/pages.js` — router che serve le pagine statiche; la route `/` serve `index.html` dalla root.

## Percorsi pubblici e asset

- Landing: `GET /` → serve `index.html` (root)
- Form sopralluogo: `GET /richiedi-sopralluogo` → `src/public/html/sopralluoghi.html`
- Form tecnico: `GET /diventa-tecnico` → `src/public/html/tecnici.html`
- Assets CSS: `/css/styles.css` → `src/public/css/styles.css`
- Assets JS: `/js/main.js` → `src/public/js/main.js`

## Note

- Se preferisci avere `index.html` servito da `src/public/html` invece che dalla root, posso ripristinare quella configurazione.
- Per il deploy consigliato: creare una build statica o usare un webserver che serva la root e la cartella `src/public`.
