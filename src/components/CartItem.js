import React, { Component } from 'react';
import { MuiThemeProvider } from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import { ActionDelete, ContentAdd, ContentRemove } from "material-ui/svg-icons/index";
import { fullBlack } from "material-ui/styles/colors";

require('./stylesheets/CartItem.css');

const style = {
    margin: '0.1em',
};

export default class CartItem extends Component {
    render() {
        return (
            <div className="cart-item">
                <img alt='' src={this.props.image} />
                <div className="cart-item-info">
                    <p id="cart-item-price">{this.props.price + " " + this.props.currency}</p>
                    <p id="item-title">{this.props.name}</p>

                    <div className="cart-quantity-wrapper">
                        <div id="cart-controls">
                            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                                <ContentRemove onClick={this.props.onClickReduce} style={style} color={fullBlack} />
                                <ActionDelete onClick={this.props.onClickRemove} style={style} color={fullBlack} />
                                <ContentAdd onClick={this.props.onClickIncrease} style={style} color={fullBlack} />
                            </MuiThemeProvider>
                        </div>
                        <p id="cart-item-quantity"><b>QTY:</b> {this.props.quantity !== undefined ? this.props.quantity : 1}</p>
                    </div>
                </div>
            </div>
        );
    }
};
