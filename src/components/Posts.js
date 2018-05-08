import React, { Component } from 'react';
import axios from 'axios';
import items from '../mock/mock_items_less.json';
import Item from "./Item";

export default class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: items
        }
    }

    componentDidMount() {
        //this.getStoreItems();
    }

    getStoreItems() {
        let API_KEY = 'fae7b9f6-6363-45a1-a9c9-3def2dae206d';
        let config = {'AUTH': { API_KEY }};
        axios.get('http://erply-challenge.herokuapp.com/list', config).
        then((res) => {
            console.dir(res);
        });
    }

    render() {
        const items = this.state.items.map((item) => <Item {...item}/>);
        //console.log(items);
        return (
            <div>
                {items}
            </div>
        )
    }

}