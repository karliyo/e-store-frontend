import React, { Component } from 'react';
import {Link} from 'react-router-dom';

require('./stylesheets/Header.css');

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/cart">Shopping cart</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}
