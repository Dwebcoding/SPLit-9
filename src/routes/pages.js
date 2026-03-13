const path = require('path');
const express = require('express');

const router = express.Router();
const publicDir = path.join(__dirname, '..', 'public');
const fs = require('fs');

// Serve landing from the html folder
router.get('/', (req, res) => {
  console.log('pages __dirname =', __dirname);
  console.log('pages publicDir =', publicDir);
  const p = path.join(publicDir, 'html', 'index.html');
  console.log('Serving index from', p);
  if (!fs.existsSync(p)) {
    console.error('Index file not found at', p);
    return res.status(404).send('Index not found');
  }
  res.sendFile('index.html', { root: path.join(publicDir, 'html') }, (err) => {
    if (err) {
      console.error('sendFile error for /', err);
      return res.status(err.status || 500).end();
    }
  });
});

router.get('/richiedi-sopralluogo', (req, res) => {
  const sp = path.join(publicDir, 'html', 'sopralluoghi.html');
  if (!fs.existsSync(sp)) {
    console.error('sopralluoghi.html not found at', sp);
    return res.status(404).send('File not found');
  }
  res.sendFile('sopralluoghi.html', { root: path.join(publicDir, 'html') }, (err) => {
    if (err) {
      console.error('sendFile error for /richiedi-sopralluogo', err);
      return res.status(err.status || 500).end();
    }
  });
});

router.get('/diventa-tecnico', (req, res) => {
  const tp = path.join(publicDir, 'html', 'tecnici.html');
  if (!fs.existsSync(tp)) {
    console.error('tecnici.html not found at', tp);
    return res.status(404).send('File not found');
  }
  res.sendFile('tecnici.html', { root: path.join(publicDir, 'html') }, (err) => {
    if (err) {
      console.error('sendFile error for /diventa-tecnico', err);
      return res.status(err.status || 500).end();
    }
  });
});

module.exports = router;
