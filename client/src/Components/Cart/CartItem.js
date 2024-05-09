import { ButtonGroup } from "@mui/material";
import { Button, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { addEllipsis } from "../../utils/commonUtils";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, deleteFromCart } from "../../Redux/Actions/cartActions";
import { useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link }from 'react-router-dom'

const Remove = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    display: 'flex',
    marginTop: '9%',
    [theme.breakpoints.down('sm')]: {
        marginTop: '-7%'
    },
    [theme.breakpoints.down('mid')]: {
        marginTop: '-7%'
    }
}));

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`;

export const CartItem = ({ item }) => {
    
    const cart = useSelector(state => state.cart);
    const selectedItem = cart.find(cartItem => cartItem.id === item.id);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const removeItem = (id) => {
        dispatch(deleteFromCart(id));
    };

    const incrementItemQuantity = (id) => {
        dispatch(incrementQuantity(id, selectedItem.quantity + 1));
    };

    const decrementItemQuantity = (id) => {
        if (selectedItem.quantity > 1) {
            dispatch(decrementQuantity(id, selectedItem.quantity - 1));
        }
    };

    
    return <div className="cart-item-container">
        <div className="img-button-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
             
             <Link to={`/product/${item.id}`}>
            <img className="cart-image-container" src={item.url} alt="" />
            </Link>
            <br />

            <Component>
                <Button onClick={() => decrementItemQuantity(item.id)} style={{ border: 'none' }} variant="contained" color="success">-</Button>
                <Button style={{ border: 'none' }}>{selectedItem ? selectedItem.quantity : 0}</Button>
                <Button onClick={() => incrementItemQuantity(item.id)} style={{ border: 'none' }} variant="contained" color="error">+</Button>
            </Component>

        </div>

        <div className="cart-text-container">
            <p> {addEllipsis(item.title.longTitle)}</p>



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

                <s style={{
                    color: "#878787",
                }}> <p style={{
                    color: "#878787",

                }}> &#8377; {item.price.mrp}</p> </s>


                <p style={{
                    fontSize: "18px",
                    fontFamily: 'inter',
                    fontWeight: 550,
                    margin: "0px"

                }} >&#8377; {item.price.cost}</p>


                <p style={{
                    color: "#388E3C",
                    fontFamily: 'Inter',
                    fontWeight: "600"
                }}>{item.price.discount} off</p>
            </div>

            <Remove onClick={()=>{removeItem(item.id)}}>
                <IconButton  size="large">
                    <DeleteOutlineIcon fontSize="inherit" style={{color:"#2874f0"}}/>
                </IconButton>
                </Remove>

        </div>
    </div>




}