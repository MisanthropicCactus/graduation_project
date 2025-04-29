// C:\Users\aimen\car-rental\src\context\CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext(undefined); // Initialize with undefined

export const CartProvider = ({ children }) => {
  const loadInitialCart = () => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        console.log("CONTEXT: Initial cart loaded from localStorage:", parsedCart);
        return Array.isArray(parsedCart) ? parsedCart : [];
      }
    } catch (error) {
      console.error("CONTEXT: Error loading cart from localStorage:", error);
    }
    console.log("CONTEXT: No initial cart found in localStorage, returning [].");
    return [];
  };

  const [cartItems, setCartItems] = useState(loadInitialCart);

  useEffect(() => {
    try {
      console.log("CONTEXT EFFECT: Saving cart to localStorage:", cartItems);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("CONTEXT EFFECT: Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (car) => {
    console.log("CONTEXT FN: addToCart - Adding/Updating car:", car);
    const duration = parseInt(car.duration, 10) || 1;
    const price = parseFloat(car.price) || 0;

    setCartItems(prevCart => {
      const existingCarIndex = prevCart.findIndex(item => item.id === car.id);
      let newCart;
      if (existingCarIndex > -1) {
        console.log("CONTEXT FN: addToCart - Updating existing item:", car.id);
        newCart = [...prevCart];
        newCart[existingCarIndex] = {
          ...newCart[existingCarIndex],
          duration: duration,
          price: price,
          totalPrice: price * duration
        };
      } else {
        console.log("CONTEXT FN: addToCart - Adding new item:", car.id);
        newCart = [...prevCart, {
          ...car,
          duration: duration,
          price: price,
          totalPrice: price * duration
        }];
      }
      console.log("CONTEXT FN: addToCart - New cart state:", newCart);
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    console.log("CONTEXT FN: removeFromCart - Removing item:", id);
    setCartItems(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    console.log("CONTEXT FN: clearCart - Clearing cart");
    setCartItems([]);
    // No need to remove localStorage item here, useEffect will save the empty array
  };

  const updateCartItemDuration = (id, newDuration) => {
    const duration = parseInt(newDuration, 10);
    if (isNaN(duration) || duration <= 0) {
      console.warn("CONTEXT FN: updateDuration - Invalid duration:", newDuration);
      return;
    }
    console.log(`CONTEXT FN: updateDuration - Updating ${id} to duration ${duration}`);
    setCartItems(prevCart =>
      prevCart.map(item => {
        if (item.id === id) {
          const price = parseFloat(item.price) || 0;
          return { ...item, duration: duration, totalPrice: price * duration };
        }
        return item;
      })
    );
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItemDuration
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};