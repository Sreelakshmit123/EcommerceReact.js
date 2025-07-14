import React from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, Form, Button } from "react-bootstrap";
import google_logo from '../assets/images/GoogleLogo.png'
function SignUp() {
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
                            <h2 className="fw-bold mb-2">Welcome Back</h2>
                            <p className="text-muted mb-4">Simplify your online business</p>

                            <Button variant="outline-secondary" className="signup-google w-100 mb-3 d-flex align-items-center justify-content-center">
                                <img src={google_logo} alt="Google" width="20" className="me-2" />
                                Sign up with Google
                            </Button>

                            <p className="sign-up-email-text text-center mb-3">Or, sign up with your email</p>


                            <Row className="mb-3">
                                <Col>
                                    <Form.Control className='sign-up-form' placeholder="Your first name" />
                                </Col >
                                <Col>
                                    <Form.Control className='sign-up-form' placeholder="Your name" />
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Control className='sign-up-form' type="email" placeholder="Enter your E-mail" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control className='sign-up-form' type="password" placeholder="Enter your password" />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Control className='sign-up-form' type="password" placeholder="Retype your password" />
                            </Form.Group>

                            <Button className="sign-up-button w-100 pt-3 pb-3">
                                Sign Up
                            </Button>

                            <div className="d-flex justify-content-evenly align-items-center mt-3 text-muted small ">
                                <a href="#" className='text-dark text-decoration-none'>Customer Support</a>
                                <a href="#" className='text-dark text-decoration-none'>Terms of Service</a>
                            </div>
                        </Col>
                        {/* right col */}
                        <Col lg={6} className="d-block order-1 order-md-2  rounded-5 d-md-flex flex-column justify-content-end align-items-start bg-dark text-white p-5">
                            <h3 className="fw-bold">Simplify your <br /> online business</h3>
                            <p className="mt-2">Tasya and Xain</p>
                        </Col>
                    </Row>
                </div>
            </div>

        </>
    )
}

export default SignUp