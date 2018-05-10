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

export function reduceQuantity(item) {
    return {
        type: 'DECREASE_QUANTITY',
        item
    };
}

export function increaseQuantity(item) {
    return {
        type: 'INCREASE_QUANTITY',
        item
    };
}
