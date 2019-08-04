import React, { useReducer, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '@components/header/Header';
import Posts from '@components/splash';
import Cart from '@components/cart/container';
import StoreContext from '@context/store.context';
import CartReducer, { initialState as initialCart } from '@reducers/CartReducer';
import ProductsReducer, { initialState as initialProducts } from '@reducers/ProductsReducer';
import { saveState } from '@utils/localstorage';

export default function App() {
  const [cart, updateCart] = useReducer(CartReducer, initialCart.cart);
  const [products, updateProducts] = useReducer(ProductsReducer, initialProducts);

  useEffect(() => {
    saveState(cart);
  }, [cart]);

  return (
    <StoreContext.Provider value={{
      cart: {
        items: cart,
        action: updateCart,
      },
      products: {
        items: products,
        action: updateProducts,
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
