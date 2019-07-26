import React, { useState, useEffect, useContext } from 'react';

import CartItem from './CartItem';
import { increaseQuantity, reduceQuantity, removeItemFromCart } from '../actions/UserActions';
import StoreContext from './store/store.context';
import './stylesheets/Cart.scss';
import NinjaButton from './NinjaButton';

export default function Cart() {
  const [totalPrice, updatePrice] = useState(0);

  const {
    cart: {
      items: cart,
      action: updateCart,
    },
  } = useContext(StoreContext);

  const calculateTotalPrice = () => {
    updatePrice(0);
    cart.forEach(({
      price, quantity,
    }) => updatePrice(prevPrice => prevPrice + price * quantity));
  };

  useEffect(() => {
    calculateTotalPrice(cart);
  }, [cart]);

  const cartContent = cart.map((item, idx) => (
    <CartItem
      key={idx}
      onClickRemove={() => updateCart(removeItemFromCart(item))}
      onClickReduce={() => updateCart(reduceQuantity(item))}
      onClickIncrease={() => updateCart(increaseQuantity(item))}
      {...item}
    />
  ));

  const emptyCart = () => (<div id="empty-cart">No items yet..</div>);

  return (
    <div className="cart">
      <p id="cart-title">Your shopping cart</p>

      <div className="cart-content">
        <div className="cart-items">{cartContent.length > 0 ? cartContent : emptyCart()}</div>
        <div className="cart-total">
          <p id="cart-total-title">Total</p>
          <div id="cart-subtitle">
                Subtotal <p id="cart-total-price">{totalPrice} EUR</p>
          </div>
          <div id="button-wrapper">
            <NinjaButton text="Checkout" />
          </div>
        </div>
      </div>
    </div>
  );
}
