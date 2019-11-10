import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Posts from "./components/Posts";
import Cart from "./components/Cart";
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div className="main-wrapper">
                <Header/>
                <Switch>
                    <Route exact path={'/'} component={Posts} />
                    <Route exact path={'/cart'} component={Cart} />
                </Switch>
            </div>
        );
    }
}

