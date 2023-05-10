const express = require("express");
const {
  getUserInvestments,
  getInvestmentId,
  createInvestment,
  updateInvestment,
  deleteInvestment,
  uploadInvestments,
} = require("./investmentController");
const multer = require("multer");
const checkRole = require("../../middleware/authenticate");
const protect = require("../../middleware/auth");

const router = express.Router();

// Define the storage engine

const storage = multer.memoryStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
  destination: function (req, file, callback) {
    callback(null, "/src/fileStorage.js");
  },
});

// Configure the middleware options
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Only allow CSV files
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only CSV files are allowed."));
    }
  },
});

router.post(
  "/farm_investments",
  protect,
  checkRole("admin"),
  uploadInvestments,
  upload.single("file")
);

router.post("/farm-investment", protect, createInvestment);

router.get("/farm-investments", protect, getUserInvestments);

router.get("/farm-investment/:id", protect, getInvestmentId);

router.put("/farm-investment/:id", protect, updateInvestment);

router.delete("/farm-investment/:id", protect, deleteInvestment);

module.exports = router;
