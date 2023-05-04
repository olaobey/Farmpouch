const UserInvestment = require("../../model/usersInvestmentModel");
const pagination = require("express-paginate");

// Get all user investments
exports.getUserInvestments = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      UserInvestment.find({})
        .populate("user investment")
        .limit(req.query.limit)
        .skip(req.skip)
        .sort({ createdAt: -1 })
        .exec(),
      UserInvestment.countDocuments({}),
    ]);
    const pageCount = Math.ceil(itemCount / req.query.limit);

    res.status(200).json({
      userInvestments: results,
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
exports.getUserInvestment = async (req, res) => {
  try {
    const userInvestment = await UserInvestment.findById(req.params.id);
    if (!userInvestment) {
      return res.status(404).json({ message: "User investment not found" });
    }
    res.status(200).json(userInvestment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new user investment
exports.createUserInvestment = async (req, res) => {
  try {
    const userInvestment = new UserInvestment(req.body);
    await userInvestment.save();
    res.status(201).json(userInvestment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a user investment
exports.updateUserInvestment = async (req, res) => {
  try {
    const userInvestment = await UserInvestment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!userInvestment) {
      return res.status(404).json({ message: "User investment not found" });
    }
    res.status(200).json(userInvestment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a user investment
exports.deleteUserInvestment = async (req, res) => {
  try {
    const userInvestment = await UserInvestment.findByIdAndDelete(
      req.params.id
    );
    if (!userInvestment) {
      return res.status(404).json({ message: "User investment not found" });
    }
    res.status(200).json({ message: "User investment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
