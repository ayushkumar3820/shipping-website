import * as ActionType from "../Constants/productsConstants"
import axios from "axios";

export const getProducts = () => async (dispatch) => {


    // making get request to server for fetching products
    const config = {
        headers: {  
            "content-type": "application/json",
        }
    }
    try {

        const { data } = await axios.get("http://localhost:8080/fetchProducts", config);
        console.log(data);

        dispatch({ type: ActionType.PRODUCT_SUCCESS_MSG, payload: data.products })
    }
    catch (e) {
        dispatch({ type: ActionType.PRODUCT_ERROR_MSG, payload: e.message })
    }
}