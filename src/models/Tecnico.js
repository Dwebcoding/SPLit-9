const mongoose = require('mongoose');

const tecnicoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30
    },
    regione: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    competenze: {
      type: [String],
      default: [],
      validate: {
        validator(value) {
          return value.length > 0;
        },
        message: 'Inserisci almeno una competenza'
      }
    },
    disponibilita: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Tecnico', tecnicoSchema);
