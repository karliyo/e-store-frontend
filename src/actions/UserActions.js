const types = {
  addItemToCart: 'ADD_TO_CART',
  removeItemFromCart: 'REMOVE_FROM_CART',
  reduceQuantity: 'DECREASE_QUANTITY',
  increaseQuantity: 'INCREASE_QUANTITY',
};

export const addItemToCart = { type: types.addItemToCart };
export const removeItemFromCart = { type: types.removeItemFromCart };
export const reduceQuantity = { type: types.reduceQuantity };
export const increaseQuantity = { type: types.increaseQuantity };
