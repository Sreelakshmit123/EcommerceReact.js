import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button } from "react-bootstrap";
import google_logo from '../assets/images/GoogleLogo.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { googleLoginAPI, registerAPI, sendVerificationAPI, verifyTokenAPI } from '../Services/allAPIs';
import { GoogleLogin } from '@react-oauth/google';


function SignUp() {
    const [showPassword, setshowPassword] = useState(false);
    const [showCPassword, setshowCPassword] = useState(false);
    const navigate = useNavigate()
    const [otp, setOtp] = useState("");
    const [otpMode, setOtpMode] = useState(false)
    const [inputs, setInputs] = useState({
        firstname: "",
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })
    console.log(inputs);

    const [error, setError] = useState({})

    const validation = (value) => {
        let newerror = {}

        if (!value.firstname) {
            newerror.firstname = "firstname is required";
        } else if (value.firstname.length < 3) {
            newerror.firstname = "first name must be atleast 3 characters"

        } else if (/\s/.test(value.firstname)) {
            newerror.firstname = "firstname must not contain spaces"
        }

        if (!value.name) {
            newerror.name = "name is requried";
        } else if (value.name.length < 1) {
            newerror.name = "name must have atleast 1 character"
        }

        if (!value.email) {
            newerror.email = "email is required";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z][a-zA-Z.-]*\.[a-zA-Z]{2,}$/.test(value.email)) {
            newerror.email = "email address is invalid. eg: name123@gmail.com"
        }

        if (!value.password) {
            newerror.password = "password is required";
        } else if (value.password.length < 6) {
            newerror.password = "password must be atleast 6 characters"
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{6,}$/.test(value.password)) {
            newerror.password = "Must include Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        }
        if (!value.cpassword) {
            newerror.cpassword = "confirm password is required";
        } else if (value.cpassword !== value.password) {
            newerror.cpassword = "password is not matching"
        }
        return newerror;
    }



    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        const errors = validation(inputs);
        setError(errors);

        if (JSON.stringify(errors) === "{}") {
            try {
                const result = await sendVerificationAPI({
                    email: inputs.email
                })
                if (result.status === 200) {
                    toast.success("OTP send to Email")
                    setOtpMode(true)
                }else if(result.status === 403){
                    toast.info("This email is already registered with an active account. Please login.")
                    setTimeout(() => {
                        navigate("/login")
                    }, 3000);
                }
            } catch (error) {
                console.log("OTP Send Error:", error);
                
            }
        }
    }

    const handleOtpVerification = async () => {
        try {
            const otpResponse = await verifyTokenAPI({
                email: inputs.email, otp: otp.trim(),
            });

            if (otpResponse.status === 200) {
                localStorage.setItem("username", inputs.email);
                const result = await registerAPI({
                    first_name: inputs.firstname,
                    name: inputs.name,
                    email: inputs.email,
                    password: inputs.password,
                    otp: otp.trim(),
                });

                if (result.status === 200 || result.status === 201) {
                    console.log("Registration complete");
                    sessionStorage.setItem("access_token", result.data.access_token);
                    localStorage.setItem("firstname", inputs.firstname);
                    localStorage.setItem("name", inputs.name);
                    localStorage.setItem("password", inputs.password);
                    localStorage.setItem("username", inputs.email);
                    toast.success(`${result.data.name} has registered successfully`);
                    navigate("/login");
                } else {
                    console.log(error);

                }
            }
        } catch (err) {
            console.log(err);
            toast.error("OTP verification or registration failed");
        }
    }

    const handleGoogleLogin = async () => {
        const dummyGoogleUser = {
            first_name: "",
            last_name: "",
            email: "@gmail.com",
            login_id: "",
        };

        try {
            const result = await googleLoginAPI(dummyGoogleUser);
            if (result.status === 200 || result.status === 201) {
                toast.success(`${result.data.name} logged in with Google`);
                sessionStorage.setItem("access_token", result.data.access_token);
                localStorage.setItem("name", result.data.name);
                localStorage.setItem("username", result.data.email);
                navigate("/");
            } else {
                toast.error("Google login failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong during Google login");
        }
    };


    return (
        <>
            <div className='sign-up'>
                <div className='signup-background'>
                    <Link className='brandname' to={'/'}><h5 className='brandname fw-bolder ms-5 mt-5 pt-4'>EBrands</h5></Link>
                    <div className='circle-gradient0-sign-up'></div>
                    <div className='circle-gradient1-sign-up'></div>
                    <div className='circle-gradient2-sign-up'></div>
                </div>

                <div className="sign-up-container container d-flex justify-content-center align-items-center w-100 h-100">
                    <Row className="sign-up-box shadow-lg rounded-5 overflow-hidden w-100" >
                        {/* left col */}
                        <Col lg={6} className="sign-up-padding order-2 order-md-1 bg-white ">
                            {!otpMode ? (
                                <>
                                    <h2 className="fw-bold">Welcome Back</h2>
                                    <p className="text-muted mb-3">Simplify your online business</p>
                                    {/* continue with goole login */}
                                    <Button onClick={handleGoogleLogin} variant="outline-secondary" className="signup-google w-100 mb-2 d-flex align-items-center justify-content-center">
                                        <img src={google_logo} alt="Google" width="20" className="me-2" />
                                        Sign up with Google
                                    </Button>
                                    <p className="sign-up-email-text text-center mb-3">Or, sign up with your email</p>
                                    <Row className="mb-2">
                                        <Col>
                                            <Form.Control className='sign-up-form ' autoComplete="off"   placeholder="Your first name" name='firstname' value={inputs.firstname} onChange={e => setInputs({ ...inputs, firstname: e.target.value })} required />
                                            {error.firstname && <span className='text-danger small'>{error.firstname}</span>}
                                        </Col>
                                        <Col>
                                            <Form.Control className='sign-up-form' autoComplete="off" placeholder="Your name" name='name' value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} required />
                                            {error.name && <span className='text-danger small'>{error.name}</span>}

                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-2">
                                        <Form.Control className='sign-up-form'  autoComplete="off" type="email" placeholder="Enter your E-mail" name='email' value={inputs.email} onChange={e => setInputs({ ...inputs, email: e.target.value })} required />
                                        {error.email && <span className='text-danger small'>{error.email}</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <div className='password-eyeicon'>
                                            <Form.Control className='sign-up-form '  autoComplete="off" type={showPassword ? "text" : "password"} placeholder="Enter your password" name='password' value={inputs.password} onChange={e => setInputs({ ...inputs, password: e.target.value })} required />
                                            <i className={`password-eye fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                                onClick={() => setshowPassword(!showPassword)}
                                            ></i>
                                        </div>
                                        {error.password && <span className='text-danger small'>{error.password}</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <div className='password-eyeicon'>
                                            <Form.Control className='sign-up-form ' autoComplete="off" type={showCPassword ? "text" : "password"} placeholder="Retype your password" name='cpassword' value={inputs.cpassword} onChange={e => setInputs({ ...inputs, cpassword: e.target.value })} required />
                                            <i className={`password-eye fa-solid ${showCPassword ? "fa-eye-slash" : "fa-eye"}`}
                                                onClick={() => setshowCPassword(!showCPassword)}
                                            ></i>
                                        </div>
                                        {error.cpassword && <span className='text-danger small'>{error.cpassword}</span>}
                                    </Form.Group>

                                    <Button onClick={handleSubmitSignUp} className="sign-up-button w-100 pt-3 pb-3">
                                        Sign Up
                                    </Button>

                                    <div className="d-flex justify-content-evenly align-items-center mt-3 text-muted small ">
                                        <a href="#" className='text-dark text-decoration-none'>Customer Support</a>
                                        <a href="#" className='text-dark text-decoration-none'>Terms of Service</a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="fw-bold mb-4">Verify OTP</h2>
                                    <p className="text-muted mb-3">Please enter OTP here, We have sent a verification code to <strong>{inputs.email}</strong></p>

                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" placeholder="Enter 4-digit OTP" className='sign-up-form' value={otp} onChange={(e) => setOtp(e.target.value)} required />
                                    </Form.Group>
                                    <Button onClick={handleOtpVerification}
                                        // () => {
                                        //     if (otp === "1234") {
                                        //         toast.success("OTP verified. Account created!");
                                        //         setTimeout(() => {
                                        //             navigate("/login");
                                        //         }, 3000);
                                        //     } else {
                                        //         toast.warning("Invalid OTP");
                                        //     }
                                        // }
                                        className="sign-up-button w-100 pt-3 pb-3"> Verify OTP</Button>
                                    <div className="text-center mt-3 small">
                                        Didn't get OTP? <a href="#" className='text-decoration-none'>Resend</a>
                                    </div>
                                </>
                            )}
                        </Col>
                        {/* right col */}
                        <Col lg={6} className="d-block order-1 order-md-2 rounded-5 d-md-flex flex-column justify-content-end align-items-start bg-dark text-white p-5">
                            <h3 className="fw-bold">Simplify your <br /> online business</h3>
                            <p className="mt-2">Tasya and Xain</p>
                        </Col>
                    </Row>
                </div> 
            </div>
                              <ToastContainer position="top-right" autoClose={3000} />

        </>
    )
}

export default SignUp