const UserInvestment = require("../../model/usersInvestmentModel");

// Get all user investments
exports.getUserInvestments = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: { createdAt: -1 },
      populate: "user investment",
    };
    const userInvestments = await UserInvestment.paginate({}, options);
    res.status(200).json(userInvestments);
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
