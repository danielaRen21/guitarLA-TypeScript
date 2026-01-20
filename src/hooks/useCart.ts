/** @format */

import { useState, useEffect } from "react";
import type { CartItem, Guitar } from "../types";
export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [cart, setCart] = useState(initialCart());
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function removeFromCart(id: Guitar["id"]) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  return {
    cart,
    removeFromCart,
  };
};
