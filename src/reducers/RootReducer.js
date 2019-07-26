import { combineReducers } from 'redux';
import cart from './CartReducer';
import products from './ProductsReducer';

export default combineReducers({
  cart,
  products,
});
