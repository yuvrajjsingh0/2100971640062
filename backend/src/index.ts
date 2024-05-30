import express, { Express } from "express";
import dotenv from "dotenv";

const products = require('./routes/product');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use('/', products)

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});