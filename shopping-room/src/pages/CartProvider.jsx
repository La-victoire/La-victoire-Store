import React, { createContext, useState, useEffect } from "react";

// Create the context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState([]);

  // Initialize cart and checkout from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const storedCheckout = JSON.parse(localStorage.getItem("checkout")) || [];
    setCheckout(storedCheckout);
  }, []);

  // Save cart and checkout to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("checkout", JSON.stringify(checkout));
  }, [checkout]);

  // Add product to checkout
  const proceedToCheckout = (product) => {
    setCheckout((prevCheckout) => {
      const itemInCheckout = prevCheckout.find((item) => item.id === product.id);
      if (itemInCheckout) {
        return prevCheckout.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevCheckout, { ...product }];
      }
    });
  };

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
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, checkout, proceedToCheckout, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
