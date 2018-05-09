export function addItemToCart(item) {
  return {
      type: 'ADD_TO_CART',
      item
  };
}

export function removeItemFromCart(item) {
  return {
      type: 'REMOVE_FROM_CART',
      item
  };
}
