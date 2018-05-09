import React, { Component } from 'react';
import axios from 'axios';
import items from '../mock/mock_items_less.json';
import Item from "./Item";

require('./stylesheets/Posts.css');

export default class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: items,
            shownItems: 12
        };
        this.showMoreItems = this.showMoreItems.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    showMoreItems() {
        this.setState({
            shownItems: this.state.shownItems >= this.state.items.length ?
                this.state.shownItems : this.state.shownItems + 5
        })
    }

    handleScroll = (e) => {
        if (this.bottom !== null) {
            let n = this.bottom.getBoundingClientRect().top;
            let m = window.innerHeight;
            if (n <= m) {
                this.showMoreItems();
            }
        }
    };

    getStoreItems() {
        let API_KEY = 'fae7b9f6-6363-45a1-a9c9-3def2dae206d';
        let config = {'AUTH': { API_KEY }};
        axios.get('http://erply-challenge.herokuapp.com/list', config).
        then((res) => {
            console.log(res);
        });
    }

    render() {
        const items = this.state.items
            .slice(0, this.state.shownItems) // shows only a certain amount of items at once
            .map((item) => <Item {...item}/>);
        return (
            <div className="posts">
                {items}
                <div ref={(el) => this.bottom = el}/>
            </div>
        )
    }

}