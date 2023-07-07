import React from "react";
import { useState, useEffect } from 'react'
import { login, register } from "../logic/auth.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router";
import axios from "axios";
import Navbar from "../component/navBar.jsx";


function Login () {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState(false);

    function setToken(token) {
        return axios.defaults.headers.common['token'] = `${token}`;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ email, password });

        if (!data) {
            return setAuthError(true);
        }

        let token = data.token;

        setToken(token);

        sessionStorage.setItem('token', token);
        
        navigate("/");

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='Login'>
            <Navbar />
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center">
                    <h2 className="my-5">Login</h2>
                </div>
                <div className="d-flex justify-content-center vh-100">
                    <div className="col-sm-8 col-md-6 col-lg-4">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                            </div>
                            {authError && <div className="text-danger">Email or Password is incorrect. Please try again.</div>}
                            <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                        </form>
                    </div> 
                </div>
            </div>
        </div>
    )
    }

export default Login
