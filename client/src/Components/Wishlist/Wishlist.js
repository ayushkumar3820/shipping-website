import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux"
import "../styles.css"
import CartItem  from "./WishIteams";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EmptyCart from "./Emptywishlist";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Wishlist = () => {
    
    const navigator = useNavigate();
    var sum = 0;
    var discount = 0;
    var amount = 0;


    const wishlistIteams = useSelector(state => state.wishlist);
    
for (var i = 0; i < wishlistIteams.length; i++) {
    if (wishlistIteams[i].price && wishlistIteams[i].price.mrp != null && wishlistIteams[i].price.cost != null) {
        sum = sum + wishlistIteams[i].price.mrp;
        discount = discount + (wishlistIteams[i].price.mrp - wishlistIteams[i].price.cost);
    }
}

   amount = sum - discount;

    
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
                wishlistIteams,
                username: localStorage.getItem("userName")
            }
            const response = await axios.post("http://localhost:8080/placeOrders",data,config);
            console.log(response.data.msg);
           
            navigator("/cart")
            window.location.reload();
            localStorage.removeItem("wishlist");
        }
        catch(e){
            console.log(`error ${e}`);
        }
    }
   
  
    return (
        <>

            {
                wishlistIteams.length ?
                    <Grid container className="cart-container">
                        <Grid item lg={9} md={9} sm={12} xs={12}>

                            <div className="cart-header">
                                <h3>Your Order&nbsp;({wishlistIteams.length})</h3>
                            </div>

                            <div className="carts-item-container">


                                {wishlistIteams.map(item => {
                                    return <CartItem item={item} key={Math.random()} />
                                })}


                            </div>

                            <div className="place-order-container" >
                                <Button 
                                 
                                 onClick={placeOrder}

                                style={{
                                    textTransform:"capitalize"
                                }} disableElevation variant="contained">Place Order</Button>
                            </div>

                        </Grid >

                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <div className="bill-container" style={{textAlign:"left"}}>

                                <Table>
                                    <TableHead >
                                        <p> PRICE DETAILS</p>
                                    </TableHead>
                                    

                                    <TableRow >
                                        <TableCell>
                                            Price ({wishlistIteams.length} item)
                                        </TableCell>
                                        <TableCell>
                                        &#8377;{sum}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            Discount
                                        </TableCell>
                                        <TableCell style={{color:"green",fontWeight:"500"}}>
                                            - &#8377;{discount}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                                    Delivery Charges
                                        </TableCell>
                                        <TableCell style={{color:"green",fontWeight:"500"   }}>
                                            FREE
                                        </TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell style={{color:"black",fontWeight:"bolder",fontSize:"16px"}}>
                                           Total Amount
                                        </TableCell>
                                        <TableCell  style={{color:"black",fontWeight:"bolder",fontSize:"16px"}}>
                                        &#8377;{amount}
                                        </TableCell>
                                    </TableRow>


                                </Table>
                                <p style={{color:"green",fontFamily:"inter",fontWeight:"500"}}>You will save {discount} on this order</p>
                            

                            </div>
                          
                           
                        </Grid>



                    </Grid>
                    :
                <EmptyCart />

            }
        </>
    )

}

