const express = require("express");
const {
  getUserInvestments,
  getUserInvestment,
  createUserInvestment,
  updateUserInvestment,
  deleteUserInvestment,
} = require("./usersInvestmentController");

const router = express.Router();

router.get("/user_investment/getAllInvestment", getUserInvestments);

router.get("/user_investment/:id", getUserInvestment);

router.post("/user_investment", createUserInvestment);

router.put("/user_investment/:id", updateUserInvestment);

router.delete("/user_investment/:id", deleteUserInvestment);
