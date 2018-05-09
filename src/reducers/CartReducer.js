import initialState from './InitialState';

export default function cart(state = initialState.cart, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.item];
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.item.id);
        default:
            return state;
    }
};
