"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';

import { useRouter, useSearchParams } from 'next/navigation'

const backendURL = "http://localhost:4000";


interface Product {
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
  image?: string;
}

interface PageProps {
    params: {
      slug: string
    }
  }

  const ProductDetailPage: React.FC<PageProps> = ({ params }) => {

    const { slug } = params;
    const searchParams = useSearchParams()
 
  const category = searchParams.get('category')

  const router = useRouter();
  const productId  = slug
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data }:any = await axios.get<Product>(`${backendURL}/company/AMZ/categories/${category}/products/${productId}`);
        console.log(data.product)
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError('Product not found');
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, category]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <div>
      <img src={"https://picsum.photos/200?k="+product.productName} alt={product.productName} />
        <p>{product.productName}</p>
        {/* <div>
          <Rating {...options} />
        </div> */}
        <span>{`₹${product.price}`}</span><br />
        <span>{`Discount: ₹${product.discount}`}</span><br />
        <span>{`Final Price: ₹${product.price - product.discount}`}</span><br />
        <span>{`Rating: ${product.rating}`}</span><br />
        <span>{`Availability: ${product.availability}`}</span><br />
        <span>{`Discount: ${product.discount}`}</span><br />
    </div>
  );
};

export default ProductDetailPage;