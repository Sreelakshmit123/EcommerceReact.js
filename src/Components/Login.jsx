import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { loginAPI } from '../Services/allAPIs';

function Login() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    console.log(inputs);

    const [error, setError] = useState({})

    const validation = (value) => {
        let newerror = {}

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

        return newerror;
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validation(inputs);
        setError(errors);

        if (JSON.stringify(errors) === '{}') {
            try {
                const response = await loginAPI({
                    username: inputs.email,
                    password: inputs.password
                });
                if (response.status === 200) {
                    const data = response.data;
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    localStorage.setItem("user_type", data.user_type);
                    localStorage.setItem("email", inputs.email);
                    if (data.name) {
                        localStorage.setItem("name", data.name);
                        localStorage.setItem("firstname", data.firstname )
                    }
                     console.log("Access Token Saved:", data.access_token);
                    toast.success(`${data.name || inputs.email} has successfully Logged In`);
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                } else {
                    toast.warning(response.response.data)
                }
            } catch (err) {
                toast.error("login failed")
            }
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
                    <Row className="sign-up-boxs shadow-lg rounded-5 overflow-hidden w-100" >
                        {/* left col */}
                        <Col lg={6} className=" order-2 order-md-1 bg-white p-5">
                            <h2 className="fw-bold mb-2">Hello Friend,</h2>
                            <p className="text-muted mb-4">Simplify your online business</p>

                            <Form.Group className="mb-3">
                                <Form.Control className='sign-up-form' type="email" placeholder="Enter your E-mail" name='email' value={inputs.email} onChange={e => setInputs({ ...inputs, email: e.target.value })} required />
                                {error.email && <span className='text-danger small'>{error.email}</span>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control className='sign-up-form' type="password" placeholder="Enter your password" name='password' value={inputs.password} onChange={e => setInputs({ ...inputs, password: e.target.value })} required />
                                {error.password && <span className='text-danger small'>{error.password}</span>}
                            </Form.Group>


                            <Button onClick={handleSubmit} className="sign-up-button w-100 pt-3 pb-3">
                                Login
                            </Button>

                            <div className="d-flex justify-content-evenly align-items-center mt-3 text-muted small ">
                                <a href="#" className='text-dark text-decoration-none'>Customer Support</a>
                                <a href="#" className='text-dark text-decoration-none'>Terms of Service</a>
                            </div>
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

export default Login