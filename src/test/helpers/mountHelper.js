/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

const renderConnectedComponent = (ComponentClass, props, store) => mount(
  <Provider store={store}>
    <ComponentClass {...props} />
  </Provider>
);

export default renderConnectedComponent;
