export const initialState = {
  cart: [],
};

export default function cart(state = initialState.cart, action) {
  console.log(action, state);
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.length === 0) { // if no items in cart yet
        action.item.quantity = 1;
        console.log([...state, action.item]);
        return [...state, action.item];
      }
      const itemIndexInCart = state.indexOf(action.item);
      if (itemIndexInCart === -1) { // item not yet in cart
        action.item.quantity = 1;
        return [...state, action.item];
      } // item already in cart and increasing its quantity
      state[itemIndexInCart].quantity += 1;
      return [...state];

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.item.id);
    case 'DECREASE_QUANTITY':
      const itemToReduce = state[state.indexOf(action.item)];
      if (itemToReduce.quantity === 1) { // removes item completely if there's only one
        return state.filter(item => item.id !== action.item.id);
      }
      itemToReduce.quantity -= 1;
      return [...state];

    case 'INCREASE_QUANTITY':
      state[state.indexOf(action.item)].quantity += 1;
      return [...state];
    default:
      return state;
  }
}
