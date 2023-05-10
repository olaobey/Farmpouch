const InvestmentPackage = require("../../model/investment_packageModel");
const pagination = require("express-paginate");

// Get all user investments
exports.getInvestmentPackage = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      InvestmentPackage.find({})
        .populate("investment package")
        .limit(req.query.limit)
        .skip(req.skip)
        .sort({ createdAt: -1 })
        .exec(),
      InvestmentPackage.countDocuments({}),
    ]);
    const pageCount = Math.ceil(itemCount / req.query.limit);

    res.status(200).json({
      investmentPackage: results,
      pageCount,
      itemCount,
      pages: pagination.getArrayPages(req)(3, pageCount, req.query.page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single user investment
exports.getInvestmentPackageById = async (req, res) => {
  try {
    const investmentPackage = await InvestmentPackage.findById(req.params.id);
    if (!investmentPackage) {
      return res.status(404).json({ message: "User investment not found" });
    }
    res.status(200).json(InvestmentPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new user investment
exports.createInvestmentPackage = async (req, res) => {
  try {
    const investmentPackage = new InvestmentPackage(req.body);
    await investmentPackage.save();
    res.status(201).json(investmentPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a user investment
exports.updateInvestmentPackage = async (req, res) => {
  try {
    const investmentPackage = await InvestmentPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!investmentPackage) {
      return res.status(404).json({ message: " Investment package not found" });
    }
    res.status(200).json(investmentPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a user investment
exports.deleteInvestmentPackage = async (req, res) => {
  try {
    const investmentPackage = await InvestmentPackage.findByIdAndDelete(
      req.params.id
    );
    if (!investmentPackage) {
      return res.status(404).json({ message: "Investment package not found" });
    }
    res.status(200).json({ message: "Investment package deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
