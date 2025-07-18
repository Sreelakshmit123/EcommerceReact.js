import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button } from "react-bootstrap";
import google_logo from '../assets/images/GoogleLogo.png'

import { ToastContainer, toast } from 'react-toastify';
import { registerAPI, sendVerificationAPI, verifyTokenAPI } from '../Services/allAPIs';

function SignUp() {
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
        } else if (value.name.length < 3) {
            newerror.name = "name must have include 3-16 characters"
        } else if (/\s/.test(value.name)) {
            newerror.name = "name must not contain spaces"
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
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(value.password)) {
            newerror.password = "Must include Minimum six characters, at least one uppercase letter, one lowercase letter and one number"
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

        if (JSON.stringify(errors).length === 0) {
            try {
                const result = await sendVerificationAPI({
                    email: inputs.email
                })
                if (result.status === 200) {
                    toast.success("OTP send to Email")
                    setOtpMode(true)
                }

            } catch (error) {
                toast.error("OTP send failed!!")
            }
        }
    }

    const handleOtpVerification = async () => {
        try {
            const otpResponse = await verifyTokenAPI({
                email: inputs.email, otp
            });

            if (otpResponse.status === 200 && register?.status === 200) {
                const register = await registerAPI({
                    firstname: inputs.firstname,
                    name: inputs.name,
                    email: inputs.email,
                    password: inputs.password,
                });

                if (register.status === 200) {
                    toast.success(`${result.data.name} has registered successfully`)
                    setInputs({
                        firstname: "",
                        name: "",
                        email: "",
                        password: "",
                        cpassword: ""
                    })
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000);
                }
            }
        } catch (err) {
            console.log(err);           
            toast.error("OTP verification or registration failed");
        }
    }

    return (
        <>
            <div className='sign-up'>
                <div className='signup-background'>
                    <Link className='brandname' to={'/'}><h5 className='brandname fw-bolder ms-5 mt-5'>EBrands</h5></Link>
                    <div className='circle-gradient0-sign-up'></div>
                    <div className='circle-gradient1-sign-up'></div>
                    <div className='circle-gradient2-sign-up'></div>
                </div>

                <div className="sign-up-container container d-flex justify-content-center align-items-center w-100 h-100">
                    <Row className="sign-up-box shadow-lg rounded-5 overflow-hidden w-100" >
                        {/* left col */}
                        <Col lg={6} className=" order-2 order-md-1 bg-white p-5">
                            {!otpMode ? (
                                <>
                                    <h2 className="fw-bold mb-2">Welcome Back</h2>
                                    <p className="text-muted mb-4">Simplify your online business</p>

                                    <Button variant="outline-secondary" className="signup-google w-100 mb-3 d-flex align-items-center justify-content-center">
                                        <img src={google_logo} alt="Google" width="20" className="me-2" />
                                        Sign up with Google
                                    </Button>
                                    <p className="sign-up-email-text text-center mb-3">Or, sign up with your email</p>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control className='sign-up-form' placeholder="Your first name" name='firstname' value={inputs.firstname} onChange={e => setInputs({ ...inputs, firstname: e.target.value })} required />
                                            {error.firstname && <span className='text-danger small'>{error.firstname}</span>}
                                        </Col >
                                        <Col>
                                            <Form.Control className='sign-up-form' placeholder="Your name" name='name' value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} required />
                                            {error.name && <span className='text-danger small'>{error.name}</span>}

                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Control className='sign-up-form' type="email" placeholder="Enter your E-mail" name='email' value={inputs.email} onChange={e => setInputs({ ...inputs, email: e.target.value })} required />
                                        {error.email && <span className='text-danger small'>{error.email}</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Control className='sign-up-form' type="password" placeholder="Enter your password" name='password' value={inputs.password} onChange={e => setInputs({ ...inputs, password: e.target.value })} required />
                                        {error.password && <span className='text-danger small'>{error.password}</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Control className='sign-up-form' type="password" placeholder="Retype your password" name='cpassword' value={inputs.cpassword} onChange={e => setInputs({ ...inputs, cpassword: e.target.value })} required />
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
            <ToastContainer />
        </>
    )
}

export default SignUp