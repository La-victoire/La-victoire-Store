const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
  typescript: false,
  maxNetworkRetries: 2,}); // Add your Stripe secret key in .env file

app.use(cors());
app.use(express.json()); // Parse JSON requests

// Route to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body; // Amount in smallest currency unit, e.g., cents
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
