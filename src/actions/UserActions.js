const action = (type, item) => ({ type, item });

export const addItemToCart = item => action('ADD_TO_CART', item);
export const removeItemFromCart = item => action('REMOVE_FROM_CART', item);
export const reduceQuantity = item => action('DECREASE_QUANTITY', item);
export const increaseQuantity = item => action('INCREASE_QUANTITY', item);
