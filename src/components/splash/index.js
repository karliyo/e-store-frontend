import React, { useEffect, useState, useContext } from 'react';
import { cartAction } from '@actions/UserActions';
import {
  fetchProducts, fetchDepartments, fetchStores,
} from '@data/FetchActions';
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
  {
    name: 'In stock',
  },
  {
    name: 'Out of stock',
  },
];

export default function Posts() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(32);

  const {
    products: {
      action: productAction,
      state: productState,
    },
    cart: {
      action: updateCart,
    },
    departments: {
      action: departmentAction,
      state: departmentState,
    },
    stores: {
      action: storeAction,
      state: storeState,
    },
  } = useContext(StoreContext);

  useEffect(() => {
    fetchProducts({
      size, page,
    })(productAction);
  }, []);

  useEffect(() => {
    fetchDepartments({
      size, page,
    })(departmentAction);
  }, []);

  useEffect(() => {
    fetchStores({
      size, page,
    })(storeAction);
  }, []);

  const initialState = {
    shownItems: 32, // number of items shown initially
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
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="posts">
      <div className="product-filters">
        <>
          <FilterContainer
            menuItemStyle={menuItemStyle}
            style={dropDownMenuStyle}
            onChange={handleStoreOptionChange}
            options={storeState.stores}
            title="Country"
          />
          <FilterContainer
            menuItemStyle={menuItemStyle}
            style={dropDownMenuStyle}
            onChange={handleAvailabilityOptionChange}
            options={availabilityOptions}
            title="Stock"
          />
          <FilterContainer
            menuItemStyle={menuItemStyle}
            style={dropDownMenuStyle}
            onChange={handleCategoryOptionChange}
            options={departmentState.departments}
            title={window.innerWidth > 768 ? 'Department' : 'Dpt'}
          />
        </>
      </div>
      {
        productState.items
          .slice(0, state.shownItems) // shows only a certain amount of items at once
          .map(item => (
            <Item
              key={`${item.id}-${item.name}`}
              {...item}
              isFetching={productState.isFetching}
              addToCartClick={() => updateCart({ ...cartAction.ADD, item })}
            />
          ))
      }
    </div>
  );
}
