import React, { Component } from 'react';

import { Dialog, MuiThemeProvider, RaisedButton } from "material-ui";
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

require('./stylesheets/ItemModal.css');

let oosButton = {
    color: '#000',
    paddingBottom: '10px'
};

let instockButton = {
    color: '#FFF',
    paddingBottom: '0'
};

let dialogStyle = {
    width: '90%'
};

let closeButtonStyle = {
    marginLeft: '2rem'
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
                    contentStyle={dialogStyle}
                >
                    <div className="modal-content-wrapper">
                        <div className="modal-left-column">
                            <p className="item-title">{this.props.name}</p>
                            <p className="item-price">{this.props.price + " " + this.props.currency}</p>
                            <img className="item-image" src={this.props.image} alt=''/>
                        </div>
                        <div className="modal-right-column">
                            <p className="subtitle">Description</p>
                            <p className="item-description">{this.props.description}</p>
                            <p className="subtitle">Location</p>
                            <p className="item-store-location">{this.props.store}</p>

                            <RaisedButton
                                label="Add to cart"
                                backgroundColor={this.props.instock ? '#03DAC6' : '#FF0000'}
                                style={this.props.instock ? instockButton : oosButton}
                                labelStyle={instockButton}
                                disabled={!this.props.instock}
                                onClick={this.props.onButtonClick}
                            />
                            <RaisedButton
                                label="Close"
                                primary={true}
                                style={closeButtonStyle}
                                onClick={this.props.onCloseModal}
                            />
                        </div>
                    </div>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}