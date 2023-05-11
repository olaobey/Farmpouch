const pagination = require("express-paginate");
const Investment = require("../../model/investmentModel");
const {
  parseInvestmentsFromCSV,
  insertInvestments,
} = require("../../service/uploadFile");

// Controller function to handle investment upload
exports.uploadInvestments = async (req, res) => {
  try {
    // Get the investment data from the request body
    const { units, total_investment, amountPerUnit } = req.body;
    if (!units || !total_investment || !amountPerUnit) {
      return res.status(400).json("You have provided wrong parameters");
    }

    // Get the file data from the request object
    const fileData = req.file.buffer.toString("utf-8");

    // Parse the CSV data and insert new investments into the database
    const newInvestments = parseInvestmentsFromCSV(fileData);
    const createdInvestments = await insertInvestments(newInvestments);

    // Send a success response
    res.status(200).json({
      message: "Investments uploaded successfully",
      data: createdInvestments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all investments
exports.getUserInvestments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const investments = await Investment.findAll({
      limit: limit,
      offset: offset,
    });
    const results = await Investment.pagination(investments.count, page, limit);

    res.status(200).json({
      success: true,
      investments: investments,
      ...results,
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
      units: req.body.units,
      total_investment: req.body.total_investment,
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
    investment.units = req.body.units;
    investment.total_investment = req.body.total_investment;
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
