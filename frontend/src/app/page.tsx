
"use client"

import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const backendURL = "http://localhost:4000";

const categories = [
  'Electronics',
  'Home & Kitchen',
  'Health & Fitness',
  'Computers & Accessories',
  'Mobile & Accessories',
  'Personal Care',
  'Sports & Outdoors',
  'Office Products',
  'Photography',
  'Home Appliances'
];

interface Product {
  productId: string;
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
  image?: string;
}

const Products: React.FC<{ match: { params: { keyword: string } } }> = ({ match }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [price, setPrice] = useState<[number, number]>([0, 2000]);
  const [category, setCategory] = useState<string>('');
  const [ratings, setRatings] = useState<[number, number]>([0, 10]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const setCurrentPageNo = (e: number) => {
    setCurrentPage(e);
  };

  const priceHandler = (event: any, newPrice: number | number[]) => {
    setPrice(newPrice as [number, number]);
  };

  const ratingHandler = (event: any, newRating: number | number[]) => {
    setRatings(newRating as [number, number]);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let link = `${backendURL}/company/AMZ/categories/Electronics/products?page=${currentPage}&priceUpper=${price[1]}&priceLower=${price[0]}&ratingsUpper=${ratings[1]}&ratingsLower=${ratings[0]}`;
      console.log(link)
      if (category) {
        link = `${backendURL}/company/AMZ/categories/${category}/products?page=${currentPage}&priceLower=${price[1]}&priceUpper=${price[0]}&ratingsLower=${ratings[1]}&ratingsUpper=${ratings[0]}`;
      }

      const { data } = await axios.get<{ products: Product[] }>(link);
      setProducts(data.products);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={2000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Rating</Typography>
              <Slider
                value={ratings}
                onChange={ratingHandler}
                aria-labelledby="range-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {false && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={5} 
                totalItemsCount={10} 
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

          
          <div className="products">
            {products &&
              products.map((product) => <ProductCard category={category} key={product.productId} product={product} />)}
          </div>

        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
