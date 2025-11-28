const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
const homeRoutes = require("./routes/homeRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const port = process.env.PORT || 5000;
const app = express();

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:5173", // Local Frontend
    "https://grocify-gilt.vercel.app", // Your Production Frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow only necessary methods
  credentials: true, // Allow sending tokens/cookies
};

app.use(cors(corsOptions));  // Allow frontend requests
app.use(express.json());    // Parse JSON bodies

// Routes
app.use("/api", homeRoutes);
app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

console.log("Attempting to connect to Database...");

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is up`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to Database. Server not started.", err);
  });