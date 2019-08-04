import React, { useReducer, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '@components/header/Header';
import Posts from '@components/splash';
import Cart from '@components/cart/container';
import StoreContext from '@context/store.context';
import CartReducer, { initialState as initialCart } from '@reducers/CartReducer';
import ProductsReducer, { initialState as initialProducts } from '@reducers/ProductsReducer';
import DepartmentReducer, { initialState as initialDepartments } from '@reducers/DepartmentReducer';
import StoreReducer, { initialState as initialStores } from '@reducers/StoreReducer';
import { saveState } from '@utils/localstorage';

export default function App() {
  const [cart, cartAction] = useReducer(CartReducer, initialCart);
  const [products, productAction] = useReducer(ProductsReducer, initialProducts);
  const [departments, departmentAction] = useReducer(DepartmentReducer, initialDepartments);
  const [stores, storeAction] = useReducer(StoreReducer, initialStores);

  useEffect(() => {
    saveState(cart);
  }, [cart]);

  return (
    <StoreContext.Provider value={{
      cart: {
        items: cart,
        action: cartAction,
      },
      products: {
        state: products,
        action: productAction,
      },
      departments: {
        state: departments,
        action: departmentAction,
      },
      stores: {
        state: stores,
        action: storeAction,
      },
    }}
    >
      <div className="main-wrapper">
        <Header />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </div>
    </StoreContext.Provider>
  );
}
