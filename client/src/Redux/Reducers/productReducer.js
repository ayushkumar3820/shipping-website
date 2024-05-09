import * as ActionType from "../Constants/productsConstants";

export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ActionType.PRODUCT_SUCCESS_MSG:
      const uniqueProducts = action.payload.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
      );
      return { products: uniqueProducts };

    case ActionType.PRODUCT_ERROR_MSG:
      return { error: action.payload };

    default:
      return state;
  }
};
