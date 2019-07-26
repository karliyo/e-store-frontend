import React from 'react';

require('./stylesheets/CartItem.css');

const style = {
  margin: '0.1em',
};

export default function cartItem(props) {
  return (
    <div className="cart-item">
      <img alt="" src={props.image} />
      <div className="cart-item-info">
        <p id="cart-item-price">{`${props.price} ${props.currency}`}</p>
        <p id="item-title">{props.name}</p>

        <div className="cart-quantity-wrapper">
          <div id="cart-controls">
            <button className="remove" onClick={props.onClickReduce} style={style} color="black" />
            <button className="action" onClick={props.onClickRemove} style={style} color={"black"} />
            <button className="add" onClick={props.onClickIncrease} style={style} color={"black"} />
          </div>
          <p id="cart-item-quantity"><b>QTY:</b> {props.quantity !== undefined ? props.quantity : 1}</p>
        </div>
      </div>
    </div>
  );
}
