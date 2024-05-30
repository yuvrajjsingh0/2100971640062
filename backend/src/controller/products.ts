import Operations from "../../utils/operations";

const fs = require('fs');
const path = require('path');

let database: Array<any> = [];

fs.readFile(path.join(__dirname, '../../src/db/products.json'), 'utf8', (err:any, data:any) => {
   if (err) {
      console.log(err);
   } else {
      database = JSON.parse(data);
   }
});

const getAllProducts = async (req: any, res: any, next: any) => {
   try{
      console.log("Hello")
      const categoryName = req.params.categoryName;
      const resultPerPage = 10;
      let productsDB: any = [];
      try{
         productsDB = database.filter((obj:any) => obj.category == categoryName)[0].products;
      }catch(err){
         return res.status(200).json({
            success: true,
            products: [],
            productsCount: 0,
            resultPerPage,
            filteredProductsCount: 0
         });
      }
      const productsCount = productsDB.length;
   
      const apiFeature = new Operations(productsDB, req.query)
        .filter();
        
      let products = apiFeature.query;

      apiFeature.sort();
   
      let filteredProductsCount = products.length;
   
      apiFeature.pagination(resultPerPage);

      products = apiFeature.query;

      let totalPages = Math.ceil(filteredProductsCount / 10);
     
      return res.status(200).json({
         success: true,
         products,
         productsCount,
         resultPerPage,
         filteredProductsCount,
         totalPages
      });
   }catch(err){
      console.log(err);
      return res.status(500).json({success: false});
   }
   
};

const getSpecificProduct = async (req: any, res: any, next: any) => {
   const categoryName = req.params.categoryName;
   const productId = req.params.productId;

   const productIdx = database.filter((obj:any) => obj.category == categoryName)[0]?.products.findIndex((obj:any) => obj.productId == productId);

   if(productIdx == -1) return res.status(404).json({success: false});

   return res.status(200).json({
      success: true,
      product: database.filter((obj:any) => obj.category == categoryName)[0]?.products[productIdx]
   });
};

export { getAllProducts, getSpecificProduct }