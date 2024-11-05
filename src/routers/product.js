import express from "express";
import ProductController from "../controllers/product.js";
const Product = express.Router();
Product.get("/", ProductController.get);
export default Product;
