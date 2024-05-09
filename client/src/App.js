import React from "react";
import './App.css';
import Home from './Components/Home/Home.js';
import Login from './Components/Login/Login.js';
import Header from './Components/header/Header';
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js"
import { DetailsPage } from "./Components/Details/DetailsPage.js";
import { Cart } from "./Components/Cart/Cart.js";
import OrderHistory from "./Components/OrderHistory/OrderHistory.js";
import Footer from "./Components/Footer/Footer.jsx"
import { Wishlist } from './Components/Wishlist/Wishlist.js'
import { Checkout } from "./Components/Checkout/Checkout.js";


function App() {
  return (

    <div>
  <Provider store={store}>
    <Header />
    <Routes>

    <Route path='/' element={ <Home /> }  />    
    <Route path='/login' element={ <Login /> }  />
    <Route path='/product/:id' element={ <DetailsPage/> }  />
    <Route path='/cart' element={ <Cart/> }  />
    <Route path='/wishlist' element={ <Wishlist/> }  />
    <Route path='/orders' element={ <OrderHistory/> }  />
    <Route path='/checkout' element={ <Checkout/> }  />
    </Routes>
    </Provider>
    <Footer/>
    </div>
  )

}

export default App;
