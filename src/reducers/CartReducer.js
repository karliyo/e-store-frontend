export const initialState = {
  cart: [],
  total: 0,
};

const updateQuantityInCart = (
  cart, newItem, changeAmount
) => {
  if (cart.length === 0) {
    return {
      cart: [{
        ...newItem,
        quantity: changeAmount,
      }],
      total: changeAmount * newItem.price,
    };
  }

  let total = 0;
  return {
    cart: Object.assign([], cart.map((cartItem) => {
      const targetItem = cartItem;
      if (cartItem.id === newItem.id) {
        if (!cartItem.quantity) {
          targetItem.quantity = changeAmount;
        } else {
          targetItem.quantity += changeAmount;
        }
        total += targetItem.quantity * newItem.price;
      }
      return targetItem;
    })),
    total,
  };
};

export default function cartReducer(state = initialState, action) {
  const { item } = action;
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        ...updateQuantityInCart(state.cart, action.item, 1),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(cartItem => cartItem.id !== item.id),
        total: state.total - item.quantity * item.price,
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        ...updateQuantityInCart(state.cart, action.item, -1),
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        ...updateQuantityInCart(state.cart, action.item, 1),
      };
    default:
      return state;
  }
}
