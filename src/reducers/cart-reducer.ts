/** @format */

import { db } from "../data/db01";
import type { CartItem, Guitar } from "../types";

export type CartActions =
  | {
      type: "add-to-cart";
      payload: { item: Guitar };
    }
  | {
      type: "remove-from-cart";
      payload: { id: Guitar["id"] };
    }
  | {
      type: "decrease-quantity";
      payload: { id: Guitar["id"] };
    }
  | {
      type: "increase-quantity";
      payload: { id: Guitar["id"] };
    }
  | {
      type: "clear-quantity";
    };
export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};
export const initialState: CartState = {
  data: db,
  cart: [],
};
export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    const itemExists = state.cart.findIndex(
      (guitar) => guitar.id === action.payload.item.id
    );
    let updateCart: CartItem[] = [];

    if (itemExists >= 0) {
      updateCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < 1) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updateCart = [...state.cart, newItem];
    }
    return { ...state, cart: updateCart };
  }
  if (action.type === "remove-from-cart") {
    const updatedCart = state.cart.filter(
      (item) => item.id !== action.payload.id
    );
    return { ...state, cart: updatedCart };
  }
  if (action.type === "decrease-quantity") {
    return { ...state };
  }
  if (action.type === "increase-quantity") {
    return { ...state };
  }
  if (action.type === "clear-quantity") {
    return {};
  }
  return state;
};
