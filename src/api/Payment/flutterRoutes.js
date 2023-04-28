const express = require("express");
const { handlePayment, verifyPayments } = require("./flutterController");

const router = express.Router();

router.post("/investment-payments", handlePayment);

router.get("/payments/callback", verifyPayments);

module.exports = router;
