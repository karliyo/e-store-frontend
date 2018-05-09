import { createStore } from 'redux';
import rootReducer from '../reducers/RootReducer';

export default function store() {
    return createStore(rootReducer);
}
