import React, { Component } from 'react';

import {Dialog, MuiThemeProvider, RaisedButton} from "material-ui";
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

require('./stylesheets/ItemModal.css');

let oosButton = {
    color: '#000',
    paddingBottom: '10px'
};

let instockButton = {
    color: '#FFF',
    paddingBottom: '10px'
};

export default class ItemModal extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Dialog
                    id="item-modal"
                    open={this.props.modalOpen}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                >
                    <p className="item-title">{this.props.name}</p>
                    <p className="item-price">{this.props.price + " " + this.props.currency}</p>
                    <img className="item-image" src={this.props.image} alt=''/>

                    <p className="subtitle">Description</p>
                    <p className="item-description">{this.props.description}</p>

                    <p className="subtitle">Location</p>
                    <p className="item-store-location">{this.props.store}</p>
                    <RaisedButton
                        label="Add to cart"
                        backgroundColor={this.props.instock ? '#00FF00' : '#FF0000'}
                        style={this.props.instock ? instockButton : oosButton}
                        labelStyle={instockButton}
                        disabled={!this.props.instock}
                    />
                </Dialog>
            </MuiThemeProvider>
        );
    }
}