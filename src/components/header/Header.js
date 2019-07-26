import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default function Header() {
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
