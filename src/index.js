import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Store from './helpers/store';
import App from './App';
import './index.css';
import { saveState } from './helpers/localstorage';

const storeInstance = Store();

storeInstance.subscribe(() => {
  saveState(
    storeInstance.getState()
  );
});

ReactDOM.render((
  <Provider store={storeInstance}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>),
document.getElementById('root'));
