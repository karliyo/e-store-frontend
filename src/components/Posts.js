import React, { Component } from 'react';
import axios from 'axios';
import items from '../mock/mock_items_less.json';
import Item from "./Item";

import { connect } from 'react-redux';
import { addItemToCart } from '../actions/UserActions';

require('./stylesheets/Posts.css');

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: items,
            shownItems: 16 // number of items shown initially
        };
        this.showMoreItems = this.showMoreItems.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    showMoreItems() {
        this.setState({
            shownItems: this.state.shownItems >= this.state.items.length ?
                this.state.shownItems : this.state.shownItems + 5 // shows 5 more items when this is called
        })
    }

    handleScroll = () => {
        if (this.bottom !== null) {
            let n = this.bottom.getBoundingClientRect().top;
            let m = window.innerHeight;
            if (n <= m) { // when scrolled to bottom, it tries to show more items
                this.showMoreItems();
            }
        }
    };

    render() {
        const items = this.state.items
            .slice(0, this.state.shownItems) // shows only a certain amount of items at once
            .map((item, idx) =>
                <Item
                    {...item}
                    key={idx}
                    addToCartClick={() => this.props.addToCart(item)}
                />
            );
        return (
            <div className="posts">
                {items}
                <div ref={(el) => this.bottom = el}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        items: state.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: item => dispatch(addItemToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
