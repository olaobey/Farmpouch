const Investment = require("../../model/investmentModel");

// GET all investments
exports.getAllInvestments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const investments = await Investment.findAll({
      limit: limit,
      offset: offset,
    });
    res.status(200).json({
      success: true,
      investments: investments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET a single investment
exports.getInvestmentId = async (req, res) => {
  try {
    const investment = await Investment.findByPk(req.params.id);
    if (!investment) {
      return res.status(404).json({
        success: false,
        message: "Investment not found",
      });
    }
    res.status(200).json({
      success: true,
      investment: investment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE a new investment
exports.createInvestment = async (req, res) => {
  try {
    const investment = await Investment.create({
      name: req.body.name,
      location: req.body.location,
      duration: req.body.duration,
      amount_per_unit: req.body.amount_per_unit,
      available_units: req.body.available_units,
    });
    res.status(201).json({
      success: true,
      investment: investment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE an existing investment
exports.updateInvestment = async (req, res) => {
  try {
    const investment = await Investment.findByPk(req.params.id);
    if (!investment) {
      return res.status(404).json({
        success: false,
        message: "Investment not found",
      });
    }
    investment.name = req.body.name;
    investment.location = req.body.location;
    investment.duration = req.body.duration;
    investment.amount_per_unit = req.body.amount_per_unit;
    investment.available_units = req.body.available_units;
    await investment.save();
    res.status(200).json({
      success: true,
      investment: investment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE an investment
exports.deleteInvestment = async (req, res) => {
  try {
    const investment = await Investment.findByPk(req.params.id);
    if (!investment) {
      return res.status(404).json({
        success: false,
        message: "Investment not found",
      });
    }
    await investment.destroy();
    res.status(204).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
