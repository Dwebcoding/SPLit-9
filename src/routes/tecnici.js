const express = require('express');
const { body } = require('express-validator');
const { createTecnico } = require('../controllers/tecnicoController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/',
  [
    body('nome').trim().notEmpty().withMessage('Il nome è obbligatorio'),
    body('email').trim().isEmail().withMessage('Inserisci un indirizzo email valido'),
    body('telefono').trim().notEmpty().withMessage('Il telefono è obbligatorio'),
    body('regione').trim().notEmpty().withMessage('La regione è obbligatoria'),
    body('competenze')
      .customSanitizer((value) => {
        if (Array.isArray(value)) {
          return value.map((item) => String(item).trim()).filter(Boolean);
        }

        return String(value || '')
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
      })
      .isArray({ min: 1 })
      .withMessage('Inserisci almeno una competenza'),
    body('disponibilita').trim().notEmpty().withMessage('La disponibilità è obbligatoria')
  ],
  validateRequest,
  createTecnico
);

module.exports = router;
