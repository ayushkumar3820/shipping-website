import { useEffect, useId, useState } from "react";
import NotLoginContainer from "./NotLoginContainer";
import axios from "axios"
import { Button } from "@mui/material";
import { addEllipsis } from "../../utils/commonUtils";
import { Link,useNavigate } from "react-router-dom";


const OrderHistory = () => {

    const [isLogin, setLogin] = useState(true);
    const [orderItems, setOrderItems] = useState([])


    useEffect(() => {

        const username = localStorage.getItem("userName");

        const fetchOrderHistory = async () => {
            try {
                const config = {
                    headers: {
                        "content-type": "application/json"
                    }
                }
                const response = await axios.post("http://localhost:8080/orderHistory", {
                    username
                },
                    config)

                setOrderItems(response.data.order)
            } catch (e) {
                console.log("Error", e);
            }
        }


        if (!username) {
            setLogin(false);
        } else {
            fetchOrderHistory();
        }
    }, [])



    return (

        <div>


            {isLogin ? <OrderHistoryArea orders={orderItems} /> : <NotLoginContainer />}

        </div>
    )

}


const OrderHistoryArea = ({ orders }) => {

    const navigator = useNavigate();


    if (orders.length==0) {
        return (

            <div className="empty-cart-container">
                <div className="empty-cart">
                    <img className="cart-img" src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" />

                    <p className="cart-p" >Missing Order History</p>
                    <p className="cart-p1" >You Have not Purchased Anything Yet.</p>
                    <div className="place-order-container" style={{
                        boxShadow: "none",
                    }} >
                        <Button onClick={() => {
                            navigator("/")
                        }} disableElevation variant="contained">Buy Items</Button>
                    </div>


                </div>
            </div>)
    } else {


        return <div style={{ margin: "100px 25px 25px 25px", boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>


            {
                orders.map(order => {
                    

                    return <div key={Math.random()} className="cart-item-container">

                        <div className="img-button-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
                            <Link to={`/product/${order.id}`}>
                            <img className="cart-image-container" src={order.url} alt="" />
                            </Link>
                        </div>

                        <div className="cart-text-container">
                            <p> {addEllipsis(order.title.longTitle)}</p>



                            <p style={{
                                color: "#878787",
                                fontSize: "14px"
                            }}>Seller:RetailNet <img style={{ width: "55px" }} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="" /> </p>


                            <div style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                                justifyContent: "start"
                            }}>

                                <p>Purchased for</p>


                                <p style={{
                                    fontSize: "16px",
                                    fontFamily: 'inter',
                                    fontWeight: 550,
                                    margin: "0px"

                                }} >&#8377; {order.price.cost}</p>

                                <p>on {order.purchasedDate}</p>


                            </div>


                        </div>
                    </div>

                })
            }

        </div>




    }
}

export default OrderHistory;