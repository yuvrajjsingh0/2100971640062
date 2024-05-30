import express from 'express';
import { getAllProducts, getSpecificProduct } from "../controller/products";

const router = express.Router();

router.route("/company/:companyName/categories/:categoryName/products").get(getAllProducts);

router.route("/company/:companyName/categories/:categoryName/products/:productId").get(getSpecificProduct);

module.exports = router;