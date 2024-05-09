import axios from "axios";
import * as actionType from "../Constants/cartConstants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post("http://localhost:8080/productDetails", { id: id }, config);
    const { productDetails } = data;
    
    const existingItem = getState().cart.find(product => product.id === productDetails.id && product.quantity === quantity);

    if (existingItem) {
      // If the item with the same ID and quantity exists, update the quantity
      dispatch({ type: actionType.INCREMENT_QUANTITY, payload: { id, quantity } });
    } else {
      // If not, dispatch the action to add the item
      dispatch({ type: actionType.ADD_TO_CART_SUCCESS, payload: { ...productDetails, quantity } });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: actionType.ADD_TO_CART_ERROR, payload: error.message });
  }
};

export const deleteFromCart = (id) => async (dispatch) => {
  dispatch({ type: actionType.REMOVE_FROM_CART, payload: id });
};

export const deleteCart = () => async (dispatch) => {
  dispatch({ type: "remove", payload: "" });
};

export const incrementQuantity = (id, quantity) => (dispatch) => {
  dispatch({ type: actionType.INCREMENT_QUANTITY, payload: { id, quantity } });
};

export const decrementQuantity = (id, quantity) => (dispatch) => {
  dispatch({ type: actionType.DECREMENT_QUANTITY, payload: { id, quantity } });
};

export const updateCartItemTotalPrice = (id, newTotalPrice) => ({
  type: 'UPDATE_CART_ITEM_TOTAL_PRICE',
  payload: {
      id,
      newTotalPrice,
  },
});
export const updateAllItemCosts = (updatedItems) => {
  return {
      type:'UPDATE_ALL_ITEM_COSTS ',
      payload: updatedItems,
  };
};
