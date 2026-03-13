const Tecnico = require('../models/Tecnico');

async function createTecnico(req, res, next) {
  try {
    const tecnico = await Tecnico.create(req.body);

    return res.status(201).json({
      message: 'Candidatura tecnico salvata correttamente',
      data: tecnico
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createTecnico
};
