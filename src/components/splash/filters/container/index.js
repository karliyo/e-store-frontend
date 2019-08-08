import React from 'react';
import DropdownFilter from '../dropdown';

export default ({ menus }) => (
  <div className="product-filters">
    <>
      {
        menus.map((menu) => {
          const { options, title, onChange } = menu;
          return (
            <DropdownFilter
              onChange={onChange}
              options={options}
              title={title}
            />
          );
        })
      }
    </>
  </div>
);
