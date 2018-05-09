import { combineReducers } from 'redux';
import cart from './CartReducer';
import products from './ProductsReducer';

const rootReducer = combineReducers({
    cart,
    products,
});

export default rootReducer;
