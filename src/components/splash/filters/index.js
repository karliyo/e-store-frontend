import React from 'react';
import './dropdown.scss';
import Dropdown from './dropdown';

export default function FilterContainer(props) {
  const data = props.options.map((item) => {
    return {
      ...item,
      value: item.name,
    };
  });
  return (
    <div className="dropdown filter-wrapper">
      <p className="filters-subtitle">{props.title}</p>
      <div
        className="dropdown-content"
        style={props.dropDownMenuStyle}
        onChange={props.handleAvailabilityOptionChange}
      >
        <Dropdown
          options={data}
          style={props.dropDownMenuStyle}
          onChange={props.handleAvailabilityOptionChange}
        />
      </div>
    </div>
  );
}
