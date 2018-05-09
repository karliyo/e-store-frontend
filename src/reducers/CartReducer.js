import initialState from './InitialState';

export default function cart(state = initialState.cart, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            if (state.length === 0) { // if no items in cart yet
                action.item.quantity = 1;
                return [...state, action.item];
            }
            let itemIndexInCart = state.indexOf(action.item);
            if (itemIndexInCart === -1) { // item not yet in cart
                action.item.quantity = 1;
                return [...state, action.item];
            } else { // item already in cart and increasing its quantity
                state[itemIndexInCart].quantity++;
                return [...state];
            }
        case 'REMOVE_FROM_CART':
            let itemToRemove = state[state.indexOf(action.item)];
            if (itemToRemove.quantity === 1) { // removes item completely if there's on
                return state.filter(item => item.id !== action.item.id);
            } else {
                itemToRemove.quantity--;
                return [...state];
            }
        default:
            return state;
    }
};
