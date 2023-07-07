import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../logic/auth.js";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from "../component/navBar.jsx";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  function setToken(token) {
    axios.defaults.headers.common['token'] = `${token}`;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await register({ name, email, password });

      if (!data) {
        return setAuthError(true);
      }

      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='Register'>
        <Navbar />
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-center">
                <h2 className="my-5">Register</h2>
            </div>
            <div className="d-flex justify-content-center vh-100">
            <div className="col-sm-8 col-md-6 col-lg-4">
                <form className="mt-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputName1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputName1" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleRegister}>Register</button>
                </form>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Register;
