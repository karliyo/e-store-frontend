import React, { Component } from 'react';

require('./stylesheets/Item.css');

export default class Item extends Component {
    render() {
        return (
            <div className="item">
                <p className="item-title">{this.props.name}</p>
                <p className="item-price">{this.props.price + this.props.currency}</p>
                <img className="item-image" src={this.props.image} alt=''/>
            </div>
        )
    }
}