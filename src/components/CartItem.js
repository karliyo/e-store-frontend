import React, { Component } from 'react';

require('./stylesheets/CartItem.css');

export default class CartItem extends Component {
    render() {
        return (
            <div className="cart-item">
                <img alt='' src={this.props.image} />
                <div className="cart-item-info">
                    <p id="cart-item-price">{this.props.price + " " + this.props.currency}</p>
                    <p id="item-title">{this.props.name}</p>
                    <p><b>Qty:</b> {this.props.quantity !== undefined ? this.props.quantity : 1}</p>
                </div>
            </div>
        );
    }
};
