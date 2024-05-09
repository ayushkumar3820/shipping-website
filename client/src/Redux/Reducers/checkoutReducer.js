import * as cartActions from "../Constants/checkoutConstant";


const initialState = JSON.parse(localStorage.getItem('checkout')) || [];

export const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActions.ADD_TO_CHECKOUT_SUCCESS:
      const newItem = action.payload;
      const existingItem = state.find(product => product.id === newItem.id);

      if (existingItem) {

        return state.map(product =>
          product.id === existingItem.id
            ? { ...product, quantity: product.quantity + newItem.quantity }
            : product
        );
      } else {
        const newState = [...state, newItem];
        localStorage.setItem('checkout', JSON.stringify(newState));
        return newState;
      }

    case cartActions.REMOVE_FROM_CHECKOUT:
      const updatedState = state.filter(product => product.id !== action.payload);
      localStorage.setItem('checkout', JSON.stringify(updatedState));
      return updatedState;

      case cartActions.INCREMENT_QUANTITY:
        const { id: incrementId, quantity: incrementQuantity } = action.payload;
        const incrementedState = state.map(product =>
          product.id === incrementId ? { ...product, quantity: product.quantity + 1 } : product
        );
        localStorage.setItem('checkout', JSON.stringify(incrementedState));
        return incrementedState;

    case cartActions.DECREMENT_QUANTITY:
      const { id: decrementId, quantity: decrementQuantity } = action.payload;
      const decrementedState = state.map(product =>
        product.id === decrementId ? { ...product, quantity: product.quantity - 1 } : product
      );
      localStorage.setItem('checkout', JSON.stringify(decrementedState));
      return decrementedState;

    case "remove":
      localStorage.removeItem('checkout');
      return [];

      case 'UPDATE_CART_ITEM_TOTAL_PRICE':
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, totalPrice: action.payload.newTotalPrice }
            : item
        );
        case cartActions.UPDATE_ALL_ITEM_COSTS:
        localStorage.setItem('checkout', JSON.stringify(action.payload));
        return updatedState;
    default:
      return state;
  }
};
