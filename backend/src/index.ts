import express, { Express } from "express";
import dotenv from "dotenv";

var cors = require('cors')

const products = require('./routes/product');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use('/', products)

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});