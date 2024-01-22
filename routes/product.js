const express = require("express");
const productController = require("../controller/product");
const router = express.Router();

//Create POST /products
// Read GET products
// Read GET products/:id
// Update PUT /products/:id -- overwrites exixting data
// Update Patch /products/:id
// Delete /products/:id
router
  .post("/", productController.createProduct)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProduct)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

exports.router = router;
