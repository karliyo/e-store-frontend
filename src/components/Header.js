import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <nav id="header-nav-right">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/results">Map</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}
