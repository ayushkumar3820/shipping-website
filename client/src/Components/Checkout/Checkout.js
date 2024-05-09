import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import "../styles.css";
import { CheckoutIteam } from "./CheckoutItem";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EmptyCart from "./EmptyCheckout";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import {Box,TextField, Typography,styled, AppBar } from '@mui/material';
import {addDeliveryAddress} from '../../Redux/Actions/checkoutAction'



const DeliveryAddress = {
    firstname: '',
    lastname: '',
    Address: '',
    pincode: '',
    phone: '',
    country:'',
    state:''
};
const LoginButton = styled(Button)`
    display: flex;
    margin-left: 86%;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    font-weight:600;
    top:-30px;
`;
const Delivery = styled(Box)`
    padding: 10px 24px;
    box-shadow: 0 -2px 10px 0 rgb(0 123 0 / 10%);
    border: 1px solid #f0f0f0;
    margin-bottom:2px;
    background: #fff;
    margin-right:20px;
    margin-bottom:10px;


`;
const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 68px;
`;
const SUbHeading = styled(Typography)`
  font-size: 10px;
  margin-top: -9px;
  margin-left:3%;
  font-style: italic;
  font-weight:600
`;
const PlusImage = styled("img")({
    marginLeft: 1,
    marginTop: -8,
    width:10,
    height:10
  });

const Wrapper = styled(Box)(({ theme }) => ({

    padding: '10px 35px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '29px',

    [theme.breakpoints.down('lg')]: {
        marginTop: '29px'
    }
}));
const Components = styled(Link)`
  margin-left: 15%;
  margin-top: -1.2%;
  text-decoration:none;
  color:inherit;
`;

export const Checkout = () => {

     const logoURL ="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
    const subURL  ="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

    const navigator = useNavigate();
    const [sum, setSum] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [amount, setAmount] = useState(0);

    const checkoutIteams = useSelector((state) => state.checkout);
    const dispatch = useDispatch()

    useEffect(() => {
        let newSum = 0;
        let newDiscount = 0;

        for (var i = 0; i < checkoutIteams.length; i++) {
            if (checkoutIteams[i].price && checkoutIteams[i].price.mrp != null && checkoutIteams[i].price.cost != null) {
                newSum = newSum + checkoutIteams[i].price.mrp*checkoutIteams[i].quantity;
                newDiscount = newDiscount + (checkoutIteams[i].price.mrp - checkoutIteams[i].price.cost  );
            }
        }

        setSum(newSum);
        setDiscount(newDiscount);
        setAmount(newSum - newDiscount);
    }, [checkoutIteams]);

    
    // if(!localStorage.getItem("userName")){
    //     navigator("/login")
    //     return;
    // }


    const [expanded, setExpanded] = useState(false);
      
    const handleButtonClick = () => {
      setExpanded(!expanded);
    };

    const [ signup, setSignup ] = useState(DeliveryAddress);
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const submitAddress = () => {  
        dispatch(addDeliveryAddress(signup))
      };
       

      const userName = localStorage.getItem("userName");
      const date = new Date();
      const [quantity, setQuantity] = useState(1);
      
      const [product, setPoduct] = useState();
  
      //    fetching data from backend-----
      useEffect(() => {
  
          window.scrollTo(0, 0);
  
          const data = async () => {
  
              const config = {
                  headers: {
                      "content-type": "application/json",
                  }
              }
  

              const data = {
                id: checkoutIteams[0].id
              };
                
              try {
                  const response = await axios.post("http://localhost:8080/productDetails",data, config);
  
                  setPoduct(response.data.productDetails);
  
  
              }
              catch (e) {
  
                  console.log(`${e} : while making post request`);
              }
          }
  
          data();
      }, [])
  

      const buyProduct = async () => {

        if(!localStorage.getItem("userName")){
       navigator("/login")
       return;
   }

       try {
           const config = {
               headers: {
                   "content-type": "application/json",
               }
           }

           const orderData = {
               username: userName,
               product: product,

           }

           const { data: { key } } = await axios.get("http://localhost:8080/getKey");

           const { data } = await axios.post("http://localhost:8080/buyProduct", orderData, config);
           const order = data.order;



           var options = {
               "key": key,
               "amount": order.amount, // 50000 refers to 50000 paise
               "currency": "INR",
               "name": "Ayush Sharma",
               "description": "Flipkart Clone Test Transaction",

               "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
               "handler": async function (response) {

                   const config = {
                       headers: {
                           "content-type": "application/json"
                       }
                   }
                   const razorpay_payment_id = (response.razorpay_payment_id);
                   const razorpay_order_id = (response.razorpay_order_id);
                   const razorpay_signature = (response.razorpay_signature)

                   try {

                       const { data } = await axios.post("http://localhost:8080/paymentVerification", {
                           razorpay_order_id,
                           razorpay_payment_id,
                           razorpay_signature,
                           product,
                           userName,
                       }, config);
                   
                       if (data.success) {
                           alert("Payment successful!");
                           navigator("/orders");
                       } else {
                       }
                   } catch (error) {
                       console.error("Error during payment verification:", error);
                   }
               },
               "prefill": {
                   "name": "Ayush Sharma",
                   "email": "AyushSharma@example.com",
                   "contact": "8382823058"
               },
               "notes": {
                   "address": "Razorpay Corporate Office"
               },
               "theme": {
                   "color": "#3399cc"
               }
           };

           const razor = new window.Razorpay(options);
           razor.on('payment.failed', function (response) {
               alert("payment failed, try again")
           });
           razor.open();
       }


       catch (e) {
           console.log(e);
       }
   }
   
  
    return (
        <>
        <StyledHeader>
        <Components style={{marginRight:15}} to="/">
          <img src={logoURL} alt="logo" style={{ marginTop:27, width: 75 }} />
          <Box style={{ display: "flex" }}>
            <SUbHeading>
              Explore&nbsp;
              <Box component="Box" style={{ color: "#FFE500" }}>
                Plus
              </Box>
            </SUbHeading>
            <PlusImage src={subURL} alt="logo" />
          </Box>
        </Components>
        </StyledHeader>
            {checkoutIteams.length ? (
                <Grid container className="cart-container">
                    <Grid item lg={9} md={9} sm={12} xs={12}>

                     
                        <div className="cart-header">
                            <h3>
                                Login Id:&nbsp; 
                                {(localStorage.getItem("userName")) ? (
                                    <React.Fragment>
                                        {localStorage.getItem('userName')}
                                        <CheckCircleOutlinedIcon style={{color:'green'}}/>
                                    </React.Fragment>
                                ) : null}
                            </h3>
                        </div>
                        <Delivery>
                        <Typography style={{ display:'flex',fontWeight: 600, fontSize: 18}}>Delivery Address </Typography>
                        <LoginButton  variant="contained" onClick={handleButtonClick}>
                            {expanded ? 'Collapse' : 'Expand'}
                            </LoginButton>
                            {expanded && (

                            <Box style={{ marginTop: '10px', border: '1px solid #ddd', padding: '10px' }}>
                             
                        <strong>Enter Delivery Address :</strong>
                        <Wrapper>  
                            <TextField required id="outlined-password-input" autoComplete="current-password" onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                            <TextField required id="outlined-password-input" autoComplete="current-password" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                            <TextField required id="outlined-password-input" autoComplete="current-password" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                            <TextField required id="outlined-password-input" autoComplete="current-password" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                            <TextField required id="outlined-password-input" autoComplete="current-password" onChange={(e) => onInputChange(e)} name='Address' label='Enter Adress' />
                            <TextField required id="outlined-password-input" autoComplete="current-password" onChange={(e) => onInputChange(e)} name='pincode' label='Enter Pincode' />
                            <TextField required id="outlined-password-input" autoComplete="current-password" onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                            <TextField required id="outlined-password-input" autoComplete="current-password" onChange={(e) => onInputChange(e)} name='state' label='Enter State' />
                            <TextField required id="outlined-password-input" autoComplete="current-password" onChange={(e) => onInputChange(e)} name='country' label='Enter Country' />
                            <LoginButton  onClick={submitAddress} style={{ marginTop:'14%',marginLeft:'5%', width:130}} variant="contained" >Submit</LoginButton>

                        </Wrapper>
                        </Box>)}
                    </Delivery>
                        <div className="cart-header">
                            <h3>Your Order Iteams&nbsp;({checkoutIteams.length})</h3>
                        </div>

                        <div className="carts-item-container">
                            {checkoutIteams.map((item) => {
                                return <CheckoutIteam item={item} key={item.id} />;
                            })}
                        </div>

                        <div className="place-order-container">
                            <Button onClick={buyProduct} style={{ textTransform: "capitalize" }} disableElevation variant="contained">
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
                    {checkoutIteams.map((item) => (
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
                                {checkoutIteams.reduce((totalDiscount, item) => {
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

