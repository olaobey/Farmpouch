const flutterwave = require("flutterwave-node-v3");
const flw = new flutterwave({
  publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY,
  secretKey: process.env.FLUTTERWAVE_SECRET_KEY,
  encryptionKey: process.env.FLUTTERWAVE_ENCRYPTION_KEY,
  isProduction: process.env.FLUTTERWAVE_IS_PRODUCTION,
});
const investment = require("../../model/investmentModel");
const {
  getInvestmentById,
  createInvestment,
} = require("../investment/investmentController");

exports.handlePayment = async (req, res) => {
  try {
    const { userId, investmentId, units } = req.body;

    // Calculate the total amount to be paid based on the units
    const investment = await getInvestmentById(investmentId);
    const amount = investment.amountPerUnit * units;

    // Create a Flutterwave payment
    const paymentData = {
      tx_ref: `investment-${investmentId}-${Date.now()}`,
      amount: amount,
      currency: "NGN",
      redirect_url: "http://localhost:3000/success",
      payment_options: "card",
      meta: {
        userId: userId,
        investmentId: investmentId,
        units: units,
      },
      customer: {
        email: req.user.email,
        phonenumber: req.user.phoneNumber,
        name: req.user.name,
      },
      customizations: {
        title: `Investment Payment for ${investment.farmpouch}`,
        description: `Investment in Farm ${investment.farmpouch}`,
        logo: "https://your-website.com/logo.png",
      },
    };

    const payment = await flw.Payment.initialize(paymentData);

    //  Redirect user to Flutterwave payment page
    res.redirect(payment.data.data.link);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment failed" });
  }
};

exports.verifyPayments = async (req, res) => {
  try {
    const { status, tx_ref, meta } = req.query;

    // Verify the payment status
    const payment = await flutterwave.Payment.verify(status, tx_ref, meta);

    if (payment.status === "successful") {
      const { userId, investmentId, units } = payment.meta;

      // Add the investment to the database
      await createInvestment(userId, investmentId, units);

      res.json({
        success: true,
        farmName: investment.farmpouch,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
