import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductProvider"; // Ensure correct import path
import { CartContext } from "./CartProvider";

const Products = () => {
  const { cart, addToCart } = useContext(CartContext);
  const { products, loading } = useContext(ProductContext);

  const [reduce, setReduce] = useState(true); // State for limiting product display
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(true); // State to toggle categories visibility
  const categories = [...new Set(products.map((product) => product.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const limitedItems = reduce ? filteredProducts.slice(0, 4) : filteredProducts;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-xl text-gold animate-bounce">
          Loading Your Products...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full px-4 md:px-8">
      {/* Categories Section */}
      {isCategoriesVisible && (
        <aside className="md:w-1/4 p-4 bg-gray-50 rounded-lg shadow-md mb-6 md:mb-0 relative">
          <h2 className="text-xl font-bold text-gold mb-4">Categories</h2>
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => setIsCategoriesVisible(false)}
          >
            ✕
          </button>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            <button
              className={`text-left py-2 px-4 rounded-md ${
                selectedCategory === "All" ? "bg-gold text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`text-left py-2 px-4 rounded-md ${
                  selectedCategory === category
                    ? "bg-gold text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>
      )}

      {/* Enable Categories Button */}
      {!isCategoriesVisible && (
        <button
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition mt-4"
          onClick={() => setIsCategoriesVisible(true)}
        >
          Show Categories
        </button>
      )}

      {/* Products Section */}
      <main className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {limitedItems.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.images[0] || "/placeholder.jpg"}
              alt={product.thumbnail}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h3>
              <p className="text-gray-600 mt-2">${product.price}</p>
              <Link
                to={`/preview/${product.id}`}
                className="text-blue-500 hover:underline mt-2 block"
              >
                View Details
              </Link>
              <button
                className="mt-4 w-full px-4 py-2 bg-gold text-white rounded-md hover:bg-yellow-500 transition"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Products;
