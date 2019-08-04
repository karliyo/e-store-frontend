import React, { useContext } from 'react';

import CartItem from '@components/cart/item/CartItem';
import { cartAction } from '@actions/UserActions';
import StoreContext from '@context/store.context';
import NinjaButton from '@components/goodies/ninjaButton';
import './Cart.scss';

export default function Cart() {
  const {
    cart: {
      items: cartState,
      action: updateCart,
    },
  } = useContext(StoreContext);

  const { cart } = cartState;

  const cartContent = cart.map(item => (
    <CartItem
      key={`cart-item-${item.id}-${item.name}`}
      onClickRemove={() => updateCart({ ...cartAction.REMOVE, item })}
      onClickReduce={() => updateCart({ ...cartAction.DECREASE, item })}
      onClickIncrease={() => updateCart({ ...cartAction.INCREASE, item })}
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
                Subtotal <p id="cart-total-price">{cartState.total} EUR</p>
          </div>
          <div id="button-wrapper">
            <NinjaButton text="Checkout" />
          </div>
        </div>
      </div>
    </div>
  );
}
