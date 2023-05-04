const pagination = require("express-paginate");
const User = require("../../model/userModel");
const Investment = require("../../model/investmentModel");

exports.getallInvestments = async (req, res) => {
  try {
    const { limit = 10, page = 1, search } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { location: { [Op.like]: `%${search}%` } },
            { status: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};
    const investments = await Investment.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });
    const results = pagination.paginate(investments.count, page, limit);
    return res.status(200).json({
      investments: investments.rows,
      ...results,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getInvestmentById = async (req, res) => {
  try {
    const investment = await Investment.findByPk(req.params.id);
    if (!investment) {
      return res.status(404).json({ error: "Investment not found" });
    }
    return res.status(200).json(investment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createInvestment = async (req, res) => {
  try {
    const investment = await Investment.create(req.body);
    return res.status(201).json(investment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { limit = 10, page = 1, search } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};
    const users = await User.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });
    const results = pagination.paginate(users.count, page, limit);
    res.json({
      status: "success",
      data: {
        users: users.rows,
        ...results,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getUsersById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { name, email, role } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.updateInvestment = async (req, res) => {
  try {
    const investment = await Investment.findByPk(req.params.id);
    if (!investment) {
      return res.status(404).json({ error: "Investment not found" });
    }
    await investment.update(req.body);
    return res.status(200).json(investment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const investment = await Investment.findByPk(req.params.id);
    if (!investment) {
      return res.status(404).json({ error: "Investment not found" });
    }
    await investment.destroy();
    return res.status(200).json({ message: "Investment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
