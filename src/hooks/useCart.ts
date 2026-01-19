/** @format */

import { useState, useEffect } from "react";
import type { CartItem, Guitar } from "../types";
export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [cart, setCart] = useState(initialCart());
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 2;
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function removeFromCart(id: Guitar["id"]) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }
  function increaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }
  function decrementQuantity(id: Guitar["id"]) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity >= MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }
  function clearCart() {
    setCart([]);
  }

  return {
    cart,
    removeFromCart,
    decrementQuantity,
    increaseQuantity,
    clearCart,
  };
};
