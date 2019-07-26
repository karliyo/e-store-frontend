/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';

const renderConnectedComponent = (ComponentClass, props) => mount(
  <ComponentClass {...props} />
);

export default renderConnectedComponent;
