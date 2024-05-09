import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import "../styles.css";
import { CartItem } from "./CartItem";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EmptyCart from "./EmptyCart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Cart = () => {

    const navigator = useNavigate();
    const [sum, setSum] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [amount, setAmount] = useState(0);

    const cartItems = useSelector((state) => state.cart);

    useEffect(() => {
        let newSum = 0;
        let newDiscount = 0;

        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].price && cartItems[i].price.mrp != null && cartItems[i].price.cost != null) {
                newSum = newSum + cartItems[i].price.mrp*cartItems[i].quantity;
                newDiscount = newDiscount + (cartItems[i].price.mrp - cartItems[i].price.cost  );
            }
        }

        setSum(newSum);
        setDiscount(newDiscount);
        setAmount(newSum - newDiscount);
    }, [cartItems]);

    
  async function placeOrder(){

    if(!localStorage.getItem("userName")){
        navigator("/login")
        return;
    }

        try{
            const config = {
                headers:{
                    "content-type":"application/json",
                },
            }

            const data = {
                cartItems,
                username: localStorage.getItem("userName")
            }
            const response = await axios.post("http://localhost:8080/placeOrder",data,config);
            console.log(response.data.msg);
           
            navigator("/orders")
            window.location.reload();
            localStorage.removeItem("cart")
        }
        catch(e){
            console.log(`error ${e}`);
        }
    }
   
  
    return (
        <>
            {cartItems.length ? (
                <Grid container className="cart-container">
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <div className="cart-header">
                            <h3>My Cart ({cartItems.length})</h3>
                        </div>

                        <div className="carts-item-container">
                            {cartItems.map((item) => {
                                return <CartItem item={item} key={item.id} />;
                            })}
                        </div>

                        <div className="place-order-container">
                            <Button onClick={placeOrder} style={{ textTransform: "capitalize" }} disableElevation variant="contained">
                                Place Order
                            </Button>
                        </div>
                    </Grid>

                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <div className="bill-container" style={{ textAlign: "left" }}>
                            <Table>
                                <TableHead>
                                    <p> PRICE DETAILS</p>
                                </TableHead>

                                <TableRow>
                <TableCell>
                    Price (
                    {cartItems.map((item) => (
                        <span key={item.id}>
                            {item.quantity} {item.quantity > 1 ? "items" : "item"}
                        </span>
                    ))}
                    )
                </TableCell>
                <TableCell>&#8377;{sum}</TableCell>
            </TableRow>

                                <TableRow>
                                    <TableCell>Discount</TableCell>
                                    <TableCell style={{ color: "green", fontWeight: "500" }}>- &#8377;{discount}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Delivery Charges</TableCell>
                                    <TableCell style={{ color: "green", fontWeight: "500" }}>FREE</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ color: "black", fontWeight: "bolder", fontSize: "16px" }}>Total Amount</TableCell>
                                    <TableCell style={{ color: "black", fontWeight: "bolder", fontSize: "16px" }}>&#8377;{amount}</TableCell>
                                </TableRow>
                            </Table>

                            <p style={{ color: "green", fontFamily: "inter", fontWeight: "500" }}>
                                You will save{" "}
                                {cartItems.reduce((totalDiscount, item) => {
                                    if (item.price && item.price.mrp != null && item.price.cost != null) {
                                        return totalDiscount + (item.price.mrp - item.price.cost);
                                    }
                                    return totalDiscount;
                                }, 0)}{" "}
                                on this order
                            </p>

                        </div>
                    </Grid>
                </Grid>
            ) : (
                <EmptyCart />
            )}
        </>
    );
}

