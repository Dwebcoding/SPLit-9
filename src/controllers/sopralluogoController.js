const Sopralluogo = require('../models/Sopralluogo');

async function createSopralluogo(req, res, next) {
  try {
    const sopralluogo = await Sopralluogo.create(req.body);

    return res.status(201).json({
      message: 'Richiesta sopralluogo salvata correttamente',
      data: sopralluogo
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createSopralluogo
};
