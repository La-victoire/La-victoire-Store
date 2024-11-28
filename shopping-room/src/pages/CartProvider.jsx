import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const CartContext = createContext();

// CartProvider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState([]);
  useEffect(()=> {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(()=> {
    const storedCheckout = JSON.parse(localStorage.getItem('checkout ')) || [];
    setCheckout(storedCheckout);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('checkout', JSON.stringify(checkout));
  }, [checkout]);

  const proceedToCheckout = (product) => {
    setCheckout((prev) => {
      const itemInCheckout = prev.find((item) => item.id === product.id);
      if (itemInCheckout) {
        return prev.map((item) => item.id === product.id
        ? { ...item, quantity: item.quantity + 1 } : item
    )}else{
      return [...prev, { ...product, quantity: 1 }];
    }
  })
  }

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Basically this is the function that adds the product 
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => 
      prevCart.map((item) => item.id === productId
        ? {...item, quantity: item.quantity-1}  // Decrement quantity
        : item
  )
  .filter((item) => item.quantity > 0 ) // Remove items with quantity of 0
);
  };

  return (
    <CartContext.Provider value={{ cart, checkout,proceedToCheckout, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}