"use client"

import Link from "next/link";

interface Product {
  productId: string;
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, category }) => {
  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link href={`/products/${product.productId}?category=${category}`}>
      <span className="productCard">
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
      </span>
    </Link>
  );
};

export default ProductCard;