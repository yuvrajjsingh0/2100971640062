import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const products = require('./routes/product');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

let database: any = [];

// fs.readFile(path.join(__dirname, '../src/db/products.json'), 'utf8', (err:any, data:any) => {
//     if (err) {
//         process.exit();
//     } else {
//         database = data;
//     }
// });


app.use('/api', products)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});