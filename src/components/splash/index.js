import React, { useEffect, useState, useContext } from 'react';
import { InfiniteScroll } from 'react-simple-infinite-scroll';
import availabilityOptions from '@constants/availabilityOptions';
import { cartActionTypes as cartAction } from '@actionTypes';
import {
  fetchProducts, fetchDepartments, fetchStores,
} from '@data/FetchActions';
import StoreContext from '@context/store.context';
import Item from './item/Item';
import FilterContainer from './filters/container';
import './Splash.scss';
import './filters/Filters.css';

export default function Posts() {
  const [size] = useState(30);
  const [hasMore, setHasMore] = useState(true);

  const [visibleProducts, setVisibleProducts] = useState([]);

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

  const [page] = useState(0);
  const [productsPage, setProductsPage] = useState(productState.pagination.currentPage);

  useEffect(() => {
    fetchProducts({
      size,
      page: productsPage,
    })(productAction);
  }, [size, productsPage]);

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

  useEffect(() => {
    setVisibleProducts([...visibleProducts, ...productState.items
      .slice(size * productsPage, size * productsPage + size) // shows only a certain amount of items at once
      .map(item => (
        <Item
          key={`${item.id}-${item.name}`}
          {...item}
          isFetching={productState.isFetching}
          addToCartClick={() => updateCart({ ...cartAction.ADD, item })}
        />
      ))]);
  }, [productState.items]);

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

  const loadMore = () => {
    setProductsPage(prevPage => prevPage + 1);
    if (productsPage === productState.pagination.totalPages) {
      setHasMore(false);
    }
  };

  return (
    <div className="posts">
      <FilterContainer
        menus={
          [
            {
              options: storeState.stores,
              title: 'Country',
              onChange: handleStoreOptionChange,
            },
            {
              options: availabilityOptions,
              title: 'Stock',
              onChange: handleAvailabilityOptionChange,
            },
            {
              options: departmentState.departments,
              title: window.innerWidth > 768 ? 'Department' : 'Dpt',
              onChange: handleCategoryOptionChange,
            },
          ]
        }
      />
      <InfiniteScroll
        onLoadMore={loadMore}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        throttle={1000}
        threshold={100}
      >
        {visibleProducts}
      </InfiniteScroll>
    </div>
  );
}
