import * as cartActions from "../Constants/wishlistConstent";


// Retrieve the cart state from local storage
const initialState = JSON.parse(localStorage.getItem('wishlist')) || [];

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActions.ADD_TO_WISHLIST_SUCCESS:
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
        localStorage.setItem('wishlist', JSON.stringify(newState));
        return newState;
      }

      case cartActions.REMOVE_FROM_WISHLIST:
        const productIdToRemove = action.payload;
        const indexToRemove = state.findIndex(product => product.id === productIdToRemove);
      
        if (indexToRemove !== -1) {
          const updatedWishItems = state.map((item, index) =>
            index === indexToRemove
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ).filter(item => item.quantity > 0);
      
          localStorage.setItem('wishlist', JSON.stringify(updatedWishItems));
          return updatedWishItems;
        } else {
          return state;
        }
      

      case cartActions.INCREMENT_QUANTITY:
        const { id: incrementId, quantity: incrementQuantity } = action.payload;
        const incrementedState = state.map(product =>
          product.id === incrementId ? { ...product, quantity: product.quantity + 1 } : product
        );
        localStorage.setItem('wishlist', JSON.stringify(incrementedState));
        return incrementedState;

    case cartActions.DECREMENT_QUANTITY:
      const { id: decrementId, quantity: decrementQuantity } = action.payload;
      const decrementedState = state.map(product =>
        product.id === decrementId ? { ...product, quantity: product.quantity - 1 } : product
      );
      localStorage.setItem('wishlist', JSON.stringify(decrementedState));
      return decrementedState;

    case "remove":
      localStorage.removeItem('wishlist');
      return [];

      case 'UPDATE_CART_ITEM_TOTAL_PRICE':
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, totalPrice: action.payload.newTotalPrice }
            : item
        );
        
    default:
      return state;
  }
};
