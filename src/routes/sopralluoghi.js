const express = require('express');
const { body } = require('express-validator');
const { createSopralluogo } = require('../controllers/sopralluogoController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/',
  [
    body('nomeStudio').trim().notEmpty().withMessage('Il nome dello studio è obbligatorio'),
    body('email').trim().isEmail().withMessage('Inserisci un indirizzo email valido'),
    body('telefono').trim().notEmpty().withMessage('Il telefono è obbligatorio'),
    body('indirizzo').trim().notEmpty().withMessage('L\'indirizzo è obbligatorio'),
    body('tipoSopralluogo').trim().notEmpty().withMessage('Specifica il tipo di sopralluogo'),
    body('urgenza')
      .trim()
      .isIn(['bassa', 'media', 'alta'])
      .withMessage('Seleziona un livello di urgenza valido'),
    body('note').optional({ values: 'falsy' }).trim().isLength({ max: 2000 }).withMessage('Le note non possono superare 2000 caratteri')
  ],
  validateRequest,
  createSopralluogo
);

module.exports = router;
