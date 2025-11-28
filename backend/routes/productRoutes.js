const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET /api/products (can pass ?categoryId=...)
router.get("/products", productController.getProducts);

// GET /api/products/:id 
router.get("/products/:id", productController.getProductById);

// POST /api/products
router.post("/products", productController.createProduct);

module.exports = router;
