import { Alert, Button, CircularProgress, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";



const LoginSignup = () => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);

    const [loading, setLoading] = useState(false);

    const [toOpen, setToOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackType, setSnackType] = useState("error");


    const Login = () => {
        const defaultValues = {
            email: "",
            password: "",
        }

        const [loginValues, setLoginValues] = useState(defaultValues)



        function showSnackBar(type, message) {

            setSnackMessage(message)
            setSnackType(type)
            setToOpen(true);
        }


        function onChangeValues(e) {
            setLoginValues({ ...loginValues, [e.target.name]: e.target.value })
        }


        async  function  onLoginClick() {

            

            if (!loginValues.email || !loginValues.password) {
                showSnackBar("error", "All fields are required!")

            }
            else {
                // sending post login validation to server

                try{
                    const config = {
                        headers:{
                            "content-type":"application/json"
                        }


                    }

                    const response = await axios.post("http://localhost:8080/login", loginValues, config);
                    setLoading(false);
                    showSnackBar("success", response.data.msg)
                   localStorage.setItem("userName",response.data.username)
                   localStorage.setItem("accessToken",`Bearer ${response.data.accessToken}`)
                   localStorage.setItem("firstName", response.data.firstName)
                   navigate("/")


                }catch(e){
                    setLoading(false);
                    showSnackBar("error", e.response.data.msg)
                }
               
            }

        }


        return (

            <div className="login">


                <Snackbar open={toOpen} autoHideDuration={6000} onClose={() => { setToOpen(false) }}>
                    <Alert onClose={() => setToOpen(false)} severity={snackType} sx={{ width: '100%' }}>
                        {snackMessage}
                    </Alert>
                </Snackbar>

                <div className="login-container">

                    <div className="img-container">
                        <div>
                            <h1>Login</h1>
                            <p> Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="" />
                    </div>

                    <div className="login-box">
                        <div style={{ flex: "1", width: "100%", display: "flex", flexDirection: "column" }}>
                            <TextField id="standard-basic" onChange={(e) => { onChangeValues(e) }} name="email" label="Enter Email" variant="standard" />  <br />
                            <TextField id="standard-basic" type="password" onChange={(e) => { onChangeValues(e) }} name="password" label="Enter Password" variant="standard" />
                            <br /><br />

                            <p style={{ fontSize: "12px" }}> By continuing, you agree to Flipkart's <span style={{ color: "#2874F0" }}> Terms of Use  </span> and  <span style={{ color: "#2874F0" }}>Privacy Policy </span>  .</p>
                            <Button style={{ backgroundColor: "#FB641B" }} onClick={onLoginClick} variant="contained">Login</Button>
                        </div>


                        <p onClick={() => { setShowLogin(false) }} style={{ color: "#2874F0", fontWeight: "500", fontSize: "14px", textAlign: 'center', cursor: "pointer" }}>New to Flipkart? Create an account</p>

                    </div>

                </div>


            </div>
        )

    }





    const SignUp = () => {

        const [loading, setLoading] = useState(false);

        const [toOpen, setToOpen] = useState(false);
        const [snackMessage, setSnackMessage] = useState("");
        const [snackType, setSnackType] = useState("error");

        function showSnackBar(type, message) {

            setSnackMessage(message)
            setSnackType(type)
            setToOpen(true);
        }

        const defaultValues = {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            phone: "",
        }


        const [formValues, setFormValues] = useState(defaultValues);


        function onChangeValue(e) {
            setFormValues({ ...formValues, [e.target.name]: e.target.value })
        }

        async function onFormSubmit() {
            setLoading(true)


            var isValidated = true;

            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            let strongRegExp = /(?=.*?[#?!@$%^&*-])/;
            let whitespaceRegExp = /^$|\s+/;

            let passwordValue = formValues.password;

            let strongPassword = passwordValue.match(strongRegExp);

            let whitespace = passwordValue.match(whitespaceRegExp);



            if (!formValues.userName || !formValues.email || !formValues.firstName || !formValues.lastName || !formValues.phone || !formValues.password) {
                isValidated = false;
                showSnackBar("error", "All fields are required! ")
                setLoading(false)
            }
            else if (!formValues.email.match(validRegex)) {
                isValidated = false;
                showSnackBar("error", "Enter Valid Email")
                setLoading(false)

            }

            else if (whitespace) {
                isValidated = false;
                showSnackBar("error", "Whitespaces are not allowed in password")
                setLoading(false)


            } else if (!strongPassword) {
                isValidated = false;
                showSnackBar("error", "Weak Password, Password length must be greater than 5 and must include any special character")
                setLoading(false)
            }


            if (isValidated) {

                const config = {
                    headers: {
                        "content-type": "application/json"
                    },
                }
                try {
                    const response = await axios.post("http://localhost:8080/signup", formValues, config);
                    setLoading(false);
                    showSnackBar("success", response.data.msg)
                    setShowLogin(true);

                }
                catch (e) {
                    console.log(e);
                    setLoading(false);
                    showSnackBar("error", e.response.data.msg)
                }

            }




        }
        return (

            <div className="login">

                <Snackbar open={toOpen} autoHideDuration={6000} onClose={() => { setToOpen(false) }}>
                    <Alert onClose={() => setToOpen(false)} severity={snackType} sx={{ width: '100%' }}>
                        {snackMessage}
                    </Alert>
                </Snackbar>

                <div className="login-container">

                    <div className="img-container">
                        <div>
                            <h1>Looks like you're new here!</h1>
                            <p> Sign up with your email add ress to get started

                            </p>
                        </div>
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="" />
                    </div>

                    <div className="login-box">
                        <div style={{ flex: "1", width: "100%", display: "flex", flexDirection: "column" }}>
                            <TextField id="standard-basic"
                                onChange={(e) => { onChangeValue(e) }}
                                name="firstName"
                                label="First Name"
                                variant="standard" />

                            <br />

                            <TextField
                                id="standard-basic"
                                onChange={(e) => { onChangeValue(e) }}
                                name="lastName"
                                label="Last Name"
                                variant="standard" />
                            <br />

                            <TextField inputProps={{ style: { textTransform: "lowercase" } }}
                                id="standard-basic"
                                onChange={(e) => { onChangeValue(e) }}
                                name="userName"
                                label="Username"
                                variant="standard" />
                            <br />

                            <TextField
                                id="standard-basic"
                                onChange={(e) => { onChangeValue(e) }}
                                name="email"
                                label="Enter Email"
                                variant="standard" />

                            <br />

                            <TextField
                                id="outlined-password-input"
                                onChange={(e) => { onChangeValue(e) }}
                                type={"password"}
                                name="password"
                                label="Enter Password"
                                variant="standard" />

                            <br />

                            <TextField
                                id="standard-basic"
                                onChange={(e) => { onChangeValue(e) }}
                                label="Phone Number"
                                name="phone"
                                variant="standard" />

                            <br />

                            <br /><br />

                            <p style={{ fontSize: "12px" }}> By continuing, you agree to Flipkart's <span style={{ color: "#2874F0" }}> Terms of Use  </span> and  <span style={{ color: "#2874F0" }}>Privacy Policy </span>  .</p>
                            <Button style={{ backgroundColor: "#FB641B" }} onClick={onFormSubmit} variant="contained">
                                {loading ? <CircularProgress /> : "Continue"}

                            </Button> <br />
                            <Button onClick={() => { setShowLogin(true) }} style={{ backgroundColor: "white", color: "#2874F0" }} variant="contained">Existing User? Log In</Button>

                        </div>



                    </div>

                </div>


            </div>
        )

    }




    return (showLogin ? <Login /> : <SignUp />)




}

export default LoginSignup;