import React, { Component } from 'react';
import { connect } from 'react-redux';
import {increaseQuantity, reduceQuantity, removeItemFromCart} from '../actions/UserActions';

import CartItem from "./CartItem";

import { MuiThemeProvider, RaisedButton } from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

import './stylesheets/Cart.css';

const checkoutButton = {
    color: '#FFF',
    paddingBottom: '0',
    textAlign: 'center',
    width: '80%'
};

let totalPrice;

class Cart extends Component {

    componentDidUpdate() {
        this.calculateTotalPrice(this.props.cart);
    }

    calculateTotalPrice(cart) {
        totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price * cart[i].quantity; // assuming they are all in same currency.
        }
    }

    render() {
        const cartContent = this.props.cart.map((item, idx) => (
            <CartItem
                key={idx}
                onClickRemove={() => this.props.removeFromCart(item)}
                onClickReduce={() => this.props.reduceQuantity(item)}
                onClickIncrease={() => this.props.increaseQuantity(item)}
                {...item} />
        ));
        const emptyCart = () => { return (<div id="empty-cart">No items yet..</div>) };
        this.calculateTotalPrice(this.props.cart);
        return (
            <div className="cart">
                <p id="cart-title">Your shopping cart</p>

                <div className="cart-content">
                    <div className="cart-items">{ cartContent.length > 0 ? cartContent : emptyCart()}</div>
                    <div className="cart-total">
                        <p id="cart-total-title">Total</p>
                        <p id="cart-subtitle">Subtotal <p id="cart-total-price">{totalPrice} EUR</p></p>

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

const mapStateToProps = ({ cart }) =>  ({ cart });

const mapDispatchToProps = (dispatch) => ({
    removeFromCart: item => dispatch(removeItemFromCart(item)),
    reduceQuantity: item => dispatch(reduceQuantity(item)),
    increaseQuantity: item => dispatch(increaseQuantity(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
