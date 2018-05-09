import React, { Component } from 'react';
import items from '../mock/mock_items.json';
import Item from "./Item";

import { connect } from 'react-redux';
import { addItemToCart } from '../actions/UserActions';
import axios from "axios";

require('./stylesheets/Posts.css');

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: items,
            shownItems: 32 // number of items shown initially
        };
        this.showMoreItems = this.showMoreItems.bind(this);
        this.getStoreItems = this.getStoreItems.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.getStoreItems();
    }

    showMoreItems() {
        this.setState({
            shownItems: this.state.shownItems >= this.state.items.length ?
                this.state.shownItems : this.state.shownItems + 5 // shows 5 more items when this is called
        })
    }

    // Sends a GET request for items data to API.
    getStoreItems() {
        let API_KEY = process.env.REACT_APP_HEROKU_API_KEY;
        axios.get('http://erply-challenge.herokuapp.com/list?AUTH=' + API_KEY)
            .then((res) => {
                this.setState({items: res.data})
            }).catch((err) => {
                console.log(err);
        });
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

function mapStateToProps(state) {
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
