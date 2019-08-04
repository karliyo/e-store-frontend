import React, { useEffect, useState, useContext } from 'react';
import { addItemToCart } from '@actions/UserActions';
import StoreContext from '@context/store.context';
import Item from './item/Item';
import FilterContainer from './filters';
import './Splash.css';
import './filters/Filters.css';

const dropDownMenuStyle = {
  margin: '0em 0em 0.25em 0.25em',
  padding: '0',
};

const menuItemStyle = {
  color: 'black',
};

const availabilityOptions = [
  'In stock',
  'Out of stock',
];

export default function Posts() {
  const {
    products: {
      items: products,
    },
    cart: {
      action: updateCart,
    },
  } = useContext(StoreContext);

  const initialState = {
    items: products,
    shownItems: 32, // number of items shown initially
    countries: [],
    departments: [],
    storeValue: 0,
    inStockFilter: 0,
    departmentFilter: 0,
  };

  const [state, setState] = useState(initialState);

  const showMoreItems = () => {
    setState(prevState => ({
      ...prevState,
      shownItems: prevState.shownItems >= prevState.items.length
        ? prevState.shownItems
        : prevState.shownItems + 5, // shows 5 more items when this is called
    }));
  };

  const mapStoreCountriesAndItemDepartments = () => {
    const countries = [];
    const departments = [];
    state.items.forEach(({ store, department }) => {
      if (countries.indexOf(store) === -1) countries.push(store);
      if (departments.indexOf(department) === -1) departments.push(department);
    });
    setState({ ...state, countries, departments });
  };

  const handleScroll = (e) => {
    return;
    if (bottom !== null) {
      const n = bottom.getBoundingClientRect().top;
      const m = window.innerHeight;
      if (n <= m) { // when scrolled to bottom, it tries to show more items
        showMoreItems();
      }
    }
  };

  const filterItems = () => {
    const result = [];
    const inStock = state.inStockFilter === 0;

    state.items.forEach((item) => {
      // compares item attributes to filter opts
      if (item.store === state.countries[state.storeValue]
                && item.instock === inStock
                && item.department === state.departments[state.departmentFilter]) {
        result.push(item);
      }
    });
    return result;
  };

  const handleStoreOptionChange = (event, index, value) => setState({
    ...state,
    storeValue: value,
  });

  const handleAvailabilityOptionChange = (event, index, value) => setState({
    ...state,
    inStockFilter: value,
  });

  const handleCategoryOptionChange = (event, index, value) => setState({
    ...state,
    departmentFilter: value,
  });

  useEffect(() => {
    mapStoreCountriesAndItemDepartments();
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="posts">
      <div className="product-filters">
        <>
          <p id="filters-main-title">SORT BY</p>
          <FilterContainer
            value={state.countries}
            menuItemStyle={menuItemStyle}
            style={dropDownMenuStyle}
            onChange={handleStoreOptionChange}
            options={state.countries}
            title="Country"
          />
          <FilterContainer
            value={state.storeValue}
            menuItemStyle={menuItemStyle}
            style={dropDownMenuStyle}
            onChange={handleAvailabilityOptionChange}
            options={availabilityOptions}
            title="Stock"
          />
          <FilterContainer
            value={state.departmentFilter}
            menuItemStyle={menuItemStyle}
            style={dropDownMenuStyle}
            onChange={handleCategoryOptionChange}
            options={state.departments}
            title={window.innerWidth > 768 ? 'Department' : 'Dpt'}
          />
        </>
      </div>
      {
          filterItems()
            .slice(0, state.shownItems) // shows only a certain amount of items at once
            .map((item, idx) => (
              <Item
                {...item}
                key={idx}
                addToCartClick={() => updateCart({ ...addItemToCart, item })}
              />
            ))
        }
    </div>
  );
}
