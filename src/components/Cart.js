import React, { Component } from 'react';

require('./stylesheets/Cart.css');

export default class Cart extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cart">
                <p id="cart-title">
                    Your shopping cart
                </p>

                <div className="cart-content">
                    content
                </div>
            </div>
        );
    };
}