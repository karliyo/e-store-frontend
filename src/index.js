import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import Store from './store';
import App from './App';
import './index.css';
import { saveState } from './localstorage';

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

registerServiceWorker();
