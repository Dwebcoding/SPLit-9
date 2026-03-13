const path = require('path');
const express = require('express');
const fs = require('fs');

const router = express.Router();
const publicDir = path.join(__dirname, '..', 'public');

// Serve landing from the html folder
router.get('/', (req, res) => {
  const p = path.join(publicDir, 'html', 'index.html');
  if (!fs.existsSync(p)) {
    return res.status(404).send('Index not found');
  }
  res.sendFile('index.html', { root: path.join(publicDir, 'html') }, (err) => {
    if (err) {
      return res.status(err.status || 500).end();
    }
  });
});

router.get('/richiedi-sopralluogo', (req, res) => {
  const sp = path.join(publicDir, 'html', 'sopralluoghi.html');
  if (!fs.existsSync(sp)) {
    return res.status(404).send('File not found');
  }
  res.sendFile('sopralluoghi.html', { root: path.join(publicDir, 'html') }, (err) => {
    if (err) {
      return res.status(err.status || 500).end();
    }
  });
});

router.get('/diventa-tecnico', (req, res) => {
  const tp = path.join(publicDir, 'html', 'tecnici.html');
  if (!fs.existsSync(tp)) {
    return res.status(404).send('File not found');
  }
  res.sendFile('tecnici.html', { root: path.join(publicDir, 'html') }, (err) => {
    if (err) {
      return res.status(err.status || 500).end();
    }
  });
});

module.exports = router;
