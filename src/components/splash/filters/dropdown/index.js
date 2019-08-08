import React from 'react';

import Dropdown from './internal/dropdown';
import './Dropdown.scss';

export default props => (
  <div className="dropdown filter-wrapper">
    <p className="filters-subtitle">{props.title}</p>
    <div
      className="dropdown-content"
      style={props.dropDownMenuStyle}
      onChange={props.handleAvailabilityOptionChange}
    >
      <Dropdown
        options={
            props.options.map(item => ({
              ...item,
              value: item.name,
            }))
          }
        style={props.dropDownMenuStyle}
        onChange={props.handleAvailabilityOptionChange}
      />
    </div>
  </div>
);
