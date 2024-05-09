import { Button } from "@mui/material";
import {useNavigate} from "react-router-dom"

const EmptyCart = () => {
    const navigator = useNavigate()


    return (

        <div className="empty-cart-container">
            <div className="empty-cart">
                <img className="cart-img" src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" />

                <p className="cart-p" >Missing Cart Items?</p>
                <p className="cart-p1" >Login to see the items you added previously</p>
                <div className="place-order-container" style={{
                    boxShadow:"none",
                }} >
                    <Button onClick={()=>{
                        navigator("/")
                    }} disableElevation variant="contained">Buy Items</Button>
                </div>


            </div>
        </div>)
}


export default EmptyCart;