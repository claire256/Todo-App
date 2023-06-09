import React, {useReducer}from "react";

import CartContext from "./cart-context";
// import { useReducer } from "react";

const defaultCartState ={
  items:  [],
  totalAmount: 0
}

const cartReducer =(state, action)=> {
  if(action.type === 'ADD'){
    const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
    
    const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.payload.id)
    const existingCartItem = state.items[existingCartItemIndex]
    let updatedItems;
    
    if(existingCartItem){
     const updatedItem= {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex]= updatedItem
    }else{
      updatedItems = state.items.concat(action.payload )
    }
    
  return {
    items: updatedItems,
    totalAmount: updatedTotalAmount
    }
  }
  if(action.type === 'REMOVE'){
    const existingCartItemIndex = state.items.findIndex(
     (item)=> item.id === action.payload.id
    )
    const existingItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount-existingItem.price
   let updatedItems;
   if(existingItem===1){
     updatedItems = state.items.filter(item => item.id!== action.id)
   }else{
     const updatedItem = {...existingItem, amount: existingItem.amount -1}
     updatedItems = [...state.items];
     updatedItems[existingCartItemIndex] = updatedItem
    }
    return{
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState;
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction]= useReducer(cartReducer, defaultCartState)
  
  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', payload: item})
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', payload: id})
  };
  // let totalA = 0;
  // for (let i of cartState.items){
  //   totalA = (totalA + i.price)
  // }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    // totalAmount:totalA.toFixed(2),
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
