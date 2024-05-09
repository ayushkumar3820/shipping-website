import * as cartActions from "../Constants/cartConstants";


// Retrieve the cart state from local storage
const initialState = JSON.parse(localStorage.getItem('cart')) || [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActions.ADD_TO_CART_SUCCESS:
      const newItem = action.payload;
      const existingItem = state.find(product => product.id === newItem.id);

      if (existingItem) {
        // If the item with the same ID already exists, update the quantity
        return state.map(product =>
          product.id === existingItem.id
            ? { ...product, quantity: product.quantity + newItem.quantity }
            : product
        );
      } else {
        const newState = [...state, newItem];
        localStorage.setItem('cart', JSON.stringify(newState));
        return newState;
      }

    case cartActions.REMOVE_FROM_CART:
      const updatedState = state.filter(product => product.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(updatedState));
      return updatedState;

      case cartActions.INCREMENT_QUANTITY:
        const { id: incrementId, quantity: incrementQuantity } = action.payload;
        const incrementedState = state.map(product =>
          product.id === incrementId ? { ...product, quantity: product.quantity + 1 } : product
        );
        localStorage.setItem('cart', JSON.stringify(incrementedState));
        return incrementedState;

    case cartActions.DECREMENT_QUANTITY:
      const { id: decrementId, quantity: decrementQuantity } = action.payload;
      const decrementedState = state.map(product =>
        product.id === decrementId ? { ...product, quantity: product.quantity - 1 } : product
      );
      localStorage.setItem('cart', JSON.stringify(decrementedState));
      return decrementedState;

    case "remove":
      localStorage.removeItem('cart');
      return [];

      case 'UPDATE_CART_ITEM_TOTAL_PRICE':
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, totalPrice: action.payload.newTotalPrice }
            : item
        );
        case cartActions.UPDATE_ALL_ITEM_COSTS:
        localStorage.setItem('cart', JSON.stringify(action.payload));
        return updatedState;
    default:
      return state;
  }
};
