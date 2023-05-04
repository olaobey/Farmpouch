const express = require("express");
const {
  getallInvestments,
  getInvestmentById,
  createInvestment,
  getAllUsers,
  getUsersById,
  updateUsers,
  updateInvestment,
  deleteUsers,
  deleteInvestment,
} = require("./adminController");
const adminAuth = require("../../middleware/adminAuth");

const router = express.Router();

router.get("/admin/investments", adminAuth, getallInvestments);

router.get("/admin/investments/:id", adminAuth, getInvestmentById);

router.post("/admin/investments", adminAuth, createInvestment);

router.put("/admin/investments/:id", adminAuth, updateInvestment);

router.delete("/admin/investments/:id", adminAuth, deleteInvestment);

router.get("/admin/users", adminAuth, getAllUsers);

router.get("/admin/users/:id", adminAuth, getUsersById);

router.put("/admin/users/:id", adminAuth, updateUsers);

router.put("/admin/users/:id", adminAuth, deleteUsers);
