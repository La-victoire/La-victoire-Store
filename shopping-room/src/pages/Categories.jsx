
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
// remember o sort out this category page
const Categories = ({products}) => {
  const { category } = useParams();
  const filteredProducts = products.filter((product) => product.category === category);
  return (
    <>
    <div>
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4 capitalize">{category} Products</h1>
      {filteredProducts.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <li key={product.id} className="bg-white shadow-md p-4 rounded-lg">
              <img
                src={product.images}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
    </>
  )
}

export default Categories