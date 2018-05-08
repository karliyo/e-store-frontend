import React, { Component } from 'react';

export default class Item extends Component {
    render() {
        return (
            <div className="item">
                <img src={this.props.image} alt=''/>
                <p>{this.props.name}</p>
            </div>
        )
    }
}