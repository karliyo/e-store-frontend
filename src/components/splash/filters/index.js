import React from 'react';

export default function FilterContainer(props) {
  return (
    <div id="filter-wrapper">
      <p id="filters-subtitle">{props.title}</p>
      <ul
        value={props.inStockFilter}
        style={props.dropDownMenuStyle}
        onChange={props.handleAvailabilityOptionChange}
      >
        {
          props.options
            .map((item, idx) => (
              <li
                style={props.menuItemStyle}
                value={idx}
                key={`filter-option-${item}`}
              >
                {item}
              </li>
            ))
        }
      </ul>
    </div>
  );
}
