const express = require("express");
const authRoutes = require("../auth/authRoutes");
const adminRoutes = require("../admin/adminRoutes");
const investmentRoutes = require("../investment/investmentRoutes");
const userInvestments = require("../users_investment/usersInvestmentRoutes");
const payments = require("../Payment/flutterRoutes");

const router = express.Router();

router.use("/", authRoutes);

router.use("/", adminRoutes);

router.use("/", investmentRoutes);

router.use("/", userInvestments);

router.use("/", payments);

module.exports = router;
