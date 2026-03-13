const Sopralluogo = require('../models/Sopralluogo');
const Tecnico = require('../models/Tecnico');

// Questi valori sono stime per mostrare un grafico coerente. Modifica se hai dati reali.
const COST_ESTIMATES = {
  benzina: 120,
  pernottamento: 180,
  oreViaggio: 240
};

// Valori di default sovrascritti quando non ci sono ancora dati in DB.
const DEMO_DATA = {
  sopralluoghi: 8,
  tecnici: 5,
  urgency: {
    bassa: 3,
    media: 3,
    alta: 2
  }
};

async function getMetriche(req, res, next) {
  try {
    const [sopralluoghi, tecnici] = await Promise.all([
      Sopralluogo.countDocuments(),
      Tecnico.countDocuments()
    ]);

    const effective = {
      sopralluoghi: sopralluoghi || DEMO_DATA.sopralluoghi,
      tecnici: tecnici || DEMO_DATA.tecnici
    };

    const savings = {
      benzina: COST_ESTIMATES.benzina * effective.sopralluoghi,
      pernottamento: COST_ESTIMATES.pernottamento * effective.sopralluoghi,
      oreViaggio: COST_ESTIMATES.oreViaggio * effective.sopralluoghi
    };

    const urgencyCounts = await Sopralluogo.aggregate([
      {
        $group: {
          _id: '$urgenza',
          count: { $sum: 1 }
        }
      }
    ]);

    const urgency = urgencyCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, { bassa: 0, media: 0, alta: 0 });

    const result = {
      sopralluoghi: effective.sopralluoghi,
      tecnici: effective.tecnici,
      urgency: Object.keys(urgency).some((k) => urgency[k] > 0) ? urgency : DEMO_DATA.urgency,
      savings
    };

    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMetriche
};
