import React, { Fragment, useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
  const [btnHighlight, setBtnHighlight] =useState(false)
  const cartCtx = useContext(CartContext);

  const {items} = cartCtx

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item)=>{
    return curNumber + item.amount
  },0)

  const btnClasses = `${classes.button} ${btnHighlight ? classes.bump :''}`

useEffect(()=>{
 if( cartCtx.items.length === 0) {
  return;
 }
setBtnHighlight(true)

const timer = setTimeout(()=>{
 setBtnHighlight(false)
}, 300)

return ()=>{
  clearTimeout(timer);
}
},[items])

  return (
    <Fragment>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
      </button>
    </Fragment>
  );
};

export default HeaderCartButton;
