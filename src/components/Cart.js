import React, { useReducer, useEffect } from 'react';

import CartItem from './CartItem';
import { increaseQuantity, reduceQuantity, removeItemFromCart } from '../actions/UserActions';
import CartReducer, { initialState } from '../reducers/CartReducer';
import StoreContext from './store/store.context';
import './stylesheets/Cart.scss';

const checkoutButton = {
  color: '#FFF',
  paddingBottom: '0',
  textAlign: 'center',
  width: '80%',
};

let totalPrice;

export default function Cart() {
  const [cart, updateCart] = useReducer(CartReducer, initialState.cart);

  const calculateTotalPrice = () => {
    totalPrice = 0;
    for (let i = 0; i < cart.length; i += 1) {
      totalPrice += cart[i].price * cart[i].quantity; // assuming they are all in same currency.
    }
  };

  useEffect(() => {
    calculateTotalPrice(cart);
  }, cart);

  const cartContent = cart.map((item, idx) => (
    <CartItem
      key={idx}
      onClickRemove={() => updateCart(removeItemFromCart(null))}
      onClickReduce={() => updateCart(reduceQuantity(null))}
      onClickIncrease={() => updateCart(increaseQuantity(null))}
      {...item}
    />
  ));
  const emptyCart = () => (<div id="empty-cart">No items yet..</div>);
  calculateTotalPrice(cart);
  return (
    <StoreContext.Provider value={updateCart}>
      <div className="cart">
        <p id="cart-title">Your shopping cart</p>

        <div className="cart-content">
          <div className="cart-items">{ cartContent.length > 0 ? cartContent : emptyCart()}</div>
          <div className="cart-total">
            <p id="cart-total-title">Total</p>
            <div id="cart-subtitle">
              Subtotal <p id="cart-total-price">{totalPrice} EUR</p>
            </div>
            <div id="button-wrapper">
              <div className="button-wrapper">
                <button type="button" label="Checkout" className="ninja-button">
                  <p>Checkout</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoreContext.Provider>
  );
}
