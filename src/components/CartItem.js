import React from 'react';
import { MuiThemeProvider } from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import { ActionDelete, ContentAdd, ContentRemove } from "material-ui/svg-icons/index";
import { fullBlack } from "material-ui/styles/colors";

require('./stylesheets/CartItem.css');

const style = {
    margin: '0.1em',
};

export default props => (
    <div className="cart-item">
        <img alt='' src={props.image} />
        <div className="cart-item-info">
            <p id="cart-item-price">{props.price + " " + props.currency}</p>
            <p id="item-title">{props.name}</p>

            <div className="cart-quantity-wrapper">
                <div id="cart-controls">
                    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                        <ContentRemove onClick={props.onClickReduce} style={style} color={fullBlack} />
                        <ActionDelete onClick={props.onClickRemove} style={style} color={fullBlack} />
                        <ContentAdd onClick={props.onClickIncrease} style={style} color={fullBlack} />
                    </MuiThemeProvider>
                </div>
                <p id="cart-item-quantity"><b>QTY:</b> {props.quantity !== undefined ? props.quantity : 1}</p>
            </div>
        </div>
    </div>
);
