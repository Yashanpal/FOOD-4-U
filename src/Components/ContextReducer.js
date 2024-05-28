import React, { createContext, useContext, useReducer, useEffect } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

export const handleLogout = (dispatch) => {
  // Dispatch the LOGOUT action to clear the cart
  dispatch({ type: "LOGOUT" });
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          price: action.price,
          img: action.img,
          size: action.size,
        },
      ];

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      return state.map((food) => {
        if (food.id === action.id) {
          return {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: parseInt(action.price) + food.price,
          };
        }
        return food;
      });
    case "DROP":
      let emptyArr = [];
      return emptyArr;

    case "SET_CART":
      return action.cart;

      case "LOGOUT":
        return [];

    default:
      console.log("Error");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    // Check authentication status and dispatch LOGOUT if needed
    const isAuthenticated = localStorage.getItem("authtoken");
    if (!isAuthenticated) {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatch = () => useContext(cartDispatchContext);
