const express = require("express");
const {
  getUserInvestments,
  getInvestmentId,
  createInvestment,
  updateInvestment,
  deleteInvestment,
} = require("./investmentController");
const multer = require("multer");
const Authenticate = require("../../middleware/authenticate");

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
  Authenticate.auth,
  Authenticate.checkRole("ROLE_ADMIN"),
  createInvestment,
  upload.single("file"),
  async (req, res) => {
    // Get the file data from the request object
    const fileData = req.file.buffer.toString("utf-8");

    // Process the file data and insert new investments into the database
    const newInvestments = parseInvestmentsFromCSV(fileData);
    await createInvestment(newInvestments);

    // Send a success response
    res.status(200).send("Investments uploaded successfully");
  },
  createInvestment
);

router.post("/farm-investment", Authenticate.auth, createInvestment);

router.get("/farm-investment", Authenticate.auth, getUserInvestments);

router.get("/farm-investment/:id", Authenticate.auth, getInvestmentId);

router.put("/farm-investment/:id", Authenticate.auth, updateInvestment);

router.delete("/farm-investment/:id", Authenticate.auth, deleteInvestment);

module.exports = router;
