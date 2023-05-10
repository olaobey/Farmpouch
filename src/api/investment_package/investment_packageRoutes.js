const express = require("express");
const {
  getInvestmentPackage,
  getInvestmentPackageById,
  createInvestmentPackage,
  updateInvestmentPackage,
  deleteInvestmentPackage,
} = require("./Investment_packageController");

const router = express.Router();

router.get("/investment_package/getAllInvestment", getInvestmentPackage);

router.get("/investment_package/:id", getInvestmentPackageById);

router.post("/investment_package", createInvestmentPackage);

router.put("/investment_package/:id", updateInvestmentPackage);

router.delete("/investment_package/:id", deleteInvestmentPackage);
