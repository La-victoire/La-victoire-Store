import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartProvider";

const ItemPreview = ({ products }) => {
  const { id } = useParams(); // Get the product ID from the route params
  const productArray = Array.isArray(products) ? products : Object.values(products); // Ensure array
  const product = productArray.find((product) => product.id === parseInt(id)); // Find the
  const {addToCart} = useContext(CartContext)
  

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl text-gray-700">Product not found!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl overflow-hidden">
        {/* Product Image */}
        <div className="h-64 bg-gray-200 flex justify-center items-center">
          <img
            src={product.images}
            alt={product.title}
            className="object-cover h-full w-full"
          />
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-gray-600 my-4">{product.description}</p>

          {/* Price Section */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-2xl font-semibold text-yellow-600">
              ${product.price}
            </p>
            
            <button 
            onClick={() => {addToCart(product)}}
            className="px-6 py-2 text-white bg-yellow-600 hover:bg-yellow-500 rounded-lg transition">
              Add to Cart
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPreview;
