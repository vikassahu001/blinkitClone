const Stripe = require("stripe");
const Order = require("../models/Order");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY is missing in .env");
    return res.status(500).json({ error: "Server Configuration Error" });
  } 

  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses lowest currency unit (cents/paise)
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// NEW: Save order after successful payment
exports.confirmOrder = async (req, res) => {
  try {
    let { paymentIntentId, cartItems, totalAmount, deliveryAddress } = req.body;

    if (!deliveryAddress) {
      // console.log("No address in body, checking User database...");

      const user = await User.findById(req.user.id);

    
      if (user && user.savedAddresses && user.savedAddresses.length > 0) {

        const defaultAddress = user.savedAddresses.find(
          (addr) => addr.isDefault
        );

   
        deliveryAddress = defaultAddress || user.savedAddresses[0];

        // console.log("Found address in DB:", deliveryAddress);
      } else {
        return res.status(400).json({
          success: false,
          message: "No delivery address found. Please select an address.",
        });
      }
    }

    // 1. Verify Payment Status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res
        .status(400)
        .json({ success: false, message: "Payment not successful" });
    }

    // 2. Map frontend cart items to your Schema structure
    const orderItems = cartItems.map((item) => ({
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      product: item._id, // Assuming item._id is the Product ID
    }));

    // 3. Create Order
    const newOrder = await Order.create({
      user: req.user.id,
      items: orderItems, // Pass the mapped array, not schema types
      totalAmount,
      status: "Processing",
      paymentMethod: "Online",
      paymentId: paymentIntentId,
      deliveryAddress: deliveryAddress,
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Order Confirmation Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
