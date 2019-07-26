import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import Cart from './components/Cart';
import StoreContext from './components/store/store.context';

import './App.css';

export default function App() {
  return (
    <div className="main-wrapper">
      <Header />
      <StoreContext.Provider>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </StoreContext.Provider>
    </div>
  );
}
