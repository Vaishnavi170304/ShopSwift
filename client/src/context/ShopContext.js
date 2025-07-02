import React, { createContext, useReducer, useEffect } from "react";
 
const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
};

function reducer(state, action) {
    switch (action.type) {

        case "ADD_TO_CART":
        return { ...state, cart: [...state.cart, action.payload] };
        
        case "ADD_TO_WISHLIST":
        return { ...state, wishlist: [...state.wishlist, action.payload] };

        case "REMOVE_FROM_WISHLIST":
        return { ...state, wishlist: state.wishlist.filter(item => item._id !== action.payload), };

        case "REMOVE_FROM_CART":
        return { ...state, cart: state.cart.filter(item => item._id !== action.payload), };

        default:
        return state;
    }
}

export const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

     useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    }, [state.cart, state.wishlist]);
    
    return (
        <ShopContext.Provider value={{ state, dispatch }}>
            {children}
        </ShopContext.Provider>
  );
}
