import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItemFromCart } from '../actions/UserActions';

import CartItem from "./CartItem";

import {MuiThemeProvider, RaisedButton} from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

require('./stylesheets/Cart.css');

let checkoutButton = {
    color: '#FFF',
    paddingBottom: '0',
    textAlign: 'center',
    width: '80%'
};

class Cart extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const cartContent = this.props.cart.map((item, idx) => {
            return <CartItem
                key={idx}
                onClick={() => this.props.removeFromCart(item)}
                {...item} />
        });

        return (
            <div className="cart">
                <p id="cart-title">Your shopping cart</p>

                <div className="cart-content">
                    <div className="cart-items">{ cartContent }</div>
                    <div className="cart-total">
                        <p id="cart-total-title">Total</p>
                        <p id="cart-subtitle">Subtotal <p id="cart-total-price">5 EUR</p></p>

                        <div id="button-wrapper">
                            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                                <RaisedButton
                                    label="Checkout"
                                    backgroundColor={'#03DAC6'}
                                    style={checkoutButton}
                                    labelStyle={checkoutButton}
                                />
                            </MuiThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return { cart: state.cart };
}

function mapDispatchToProps(dispatch) {
    return { removeFromCart: item => dispatch(removeItemFromCart(item)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
