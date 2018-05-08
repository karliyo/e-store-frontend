import React, { Component } from 'react';
import ItemModal from "./ItemModal";

require('./stylesheets/Item.css');

export default class Item extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            modalOpen: false
        }
    }

    onClick(e) {
        e.preventDefault();
        this.setState({
            modalOpen: true
        });
    }

    closeModal(e) {
        e.preventDefault();
        this.setState({
            modalOpen: false
        });
    }

    render() {
        return (
            <div className="item">
                <p className="item-title">{this.props.name}</p>
                <p className="item-price">{this.props.price + " " + this.props.currency}</p>
                {/*<div id="add-to-cart">*/}
                    {/*<button><span>View</span></button>*/}
                {/*</div>*/}
                {this.state.modalOpen ?
                    <ItemModal {...this.props} modalOpen={this.state.modalOpen} onCloseModal={this.closeModal}/>
                    : null}
                <img className="item-image" onClick={this.onClick} src={this.props.image} alt=''/>
            </div>
        )
    }
}
