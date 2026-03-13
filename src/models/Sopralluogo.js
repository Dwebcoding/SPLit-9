const mongoose = require('mongoose');

const sopralluogoSchema = new mongoose.Schema(
  {
    nomeStudio: {
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
    indirizzo: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    tipoSopralluogo: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    urgenza: {
      type: String,
      required: true,
      enum: ['bassa', 'media', 'alta']
    },
    note: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: ''
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Sopralluogo', sopralluogoSchema);
