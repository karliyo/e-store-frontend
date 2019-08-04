import React from 'react';
import { getFirstImage } from '@components/goodies/helpers/ImageHelper';
import PlusSign from '@icons/plus.svg';
import DeleteSign from '@icons/delete.svg';
import MinusSign from '@icons/minus.svg';
import CartButton from './button';
import './CartItem.scss';

export default function cartItem(props) {
  return (
    <div className="cart-item">
      {getFirstImage(props.image)}
      <div className="cart-item-info">
        <p id="cart-item-price">{`${props.price} ${props.currency}`}</p>
        <p id="item-title">{props.name}</p>

        <div className="cart-quantity-wrapper">
          <div id="cart-controls">
            <CartButton icon={MinusSign} className="remove" onClick={props.onClickReduce} />
            <CartButton icon={DeleteSign} className="action" onClick={props.onClickRemove} />
            <CartButton icon={PlusSign} className="add" onClick={props.onClickIncrease} />
          </div>
          <p id="cart-item-quantity"><b>QTY:</b> {props.quantity !== undefined ? props.quantity : 1}</p>
        </div>
      </div>
    </div>
  );
}
