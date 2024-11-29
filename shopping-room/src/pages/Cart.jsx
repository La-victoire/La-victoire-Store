import React, { useContext } from 'react';
import { CartContext } from './CartProvider';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Cart = () => {
  const { proceedToCheckout,cart, removeFromCart } = useContext(CartContext);
  

  return (
    <div className="container mx-auto py-10">
  <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
  {cart.length === 0 ? (
    <p className="text-center text-gray-600 text-lg">Your cart is empty!</p>
  ) : (
    <ul className="space-y-6">
      {cart.map((item) => (
        <li
          key={item.id}
          className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-lg border border-gray-200"
        >
          {/* Product Image */}
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-24 h-24 object-cover rounded-md"
          />

          {/* Product Details */}
          <div className="flex-1 md:ml-6 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Price:</span> $
              {item.price * item.quantity}
              <br />
              <span className="font-medium text-gray-800">Quantity:</span> {item.quantity}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 md:mt-0 flex flex-col space-y-4">
           <Link to='/checkout'>
            <button
              className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 
                text-white font-semibold text-sm md:text-base px-6 py-2 rounded-md shadow-md 
                hover:shadow-lg transition-transform transform hover:scale-105 
                focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={() => proceedToCheckout(item)}
            >
              Proceed to Checkout
            </button>
           </Link>
           
            <button
              className="px-6 py-2 bg-red-600 text-white font-semibold text-sm md:text-base 
                rounded-md shadow-md hover:bg-red-700 hover:shadow-lg 
                transition-transform transform hover:scale-105 
                focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default Cart;
