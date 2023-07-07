import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { changeNameLogic, changeEmailLogic, changePasswordLogic } from '../logic/user.js';
import Navbar from '../component/navBar.jsx';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [changeName, setChangeName] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [token, setToken] = useState(sessionStorage.getItem('token'));

    useEffect(() => {
        if(!name === "") {
            return;
        }

        axios.defaults.headers.common['token'] = `${token}`;

        axios.get(import.meta.env.VITE_REACT_APP_BASE_URL + "/api/user/me").then((res) => {
            setName(res.data.user.fullName);
            setEmail(res.data.user.email);
        })
    }, []);


    // Name
    const handleChangeName = (e) => {
        e.preventDefault();
        setChangeName(true);
    };

    const confirmChangeName = async (e) => {
        e.preventDefault();
        try {
            const data = await changeNameLogic(name, token);
            setChangeName(false);
        } catch (error) {
            console.log(`confirmChangeName: ${error}`);
        }
    }

    const cancelChangeName = (e) => {
        e.preventDefault();
        setChangeName(false);
    }

    // Email
    const handleChangeEmail = (e) => {
        e.preventDefault();
        setChangeEmail(true);
    };

    const confirmChangeEmail = async (e) => {
        e.preventDefault();
        try {
            const data = await changeEmailLogic(email);
            setChangeEmail(false);
        } catch (error) {
            console.log(`confirmChangeEmail: ${error}`);
        }
    }

    const cancelChangeEmail = (e) => {
        e.preventDefault();
        setChangeEmail(false);
    }

    // Password
    const handleChangePassword = (e) => {
        e.preventDefault();
        setChangePassword(true);
    }

    const confirmChangePassword = async (e) => {
        e.preventDefault();

        const changePassword = async () => {
            try {
                const data = await changePasswordLogic(oldPassword, newPassword);
    
                if(!data) {
                    return setWrongPassword(true);
                }
    
                setChangePassword(false);
                setWrongPassword(false);
            } catch (error) {
                console.log(`confirmChangePassword: ${error}`);
            }
        }

        changePassword();
    }

    const cancelChangePassword = (e) => {
        e.preventDefault();
        setChangePassword(false);
    }

    return (
        <div>
            <Navbar />
            {token ?
                <div className='d-flex flex-column'>
                    <div className='d-flex justify-content-center'>
                        <h2 className='my-5'>Profile</h2>
                    </div>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className="col-lg-6 row justify-content-center">
                            <div className="card mb-3" style={{ maxWidth: "540px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="https://books.google.com/books/content?id=SITSNAEACAAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api" className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8 row align-items-center">
                                <ul className="list-group list-group-flush">
                                    {!changeName ? 
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h6>Name: {name}</h6>
                                            <button type='submit' onClick={handleChangeName} className='btn btn-primary btn-sm'>Change</button>
                                        </li> : 
                                        <li className="list-group-item d-flex justify-content-between">
                                            <div className='d-flex '>
                                                <label htmlFor="changeName" className='col-form-label'>Name: </label>
                                                <input type='text' style={{ width: '7rem', fontSize: '14px' }} id='changeName' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className='d-flex gap-2 '>
                                                <button type='submit' onClick={confirmChangeName}
                                                className='btn btn-success btn-sm'>Confirm</button>
                                                <button type='submit' onClick={cancelChangeName}
                                                className='btn btn-danger btn-sm'>Cancel</button>
                                            </div>
                                        </li>}
                                    {changeEmail ? 
                                        <li className="list-group-item d-flex justify-content-between">
                                            <div className='d-flex'>
                                                <label htmlFor="changeEmail" className='col-form-label'>Email: </label>
                                                <input type='email' style={{ width: '7rem', fontSize: '14px' }} id='changeEmail' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className='d-flex gap-2'>
                                                <button type='submit' onClick={confirmChangeEmail}
                                                className='btn btn-success btn-sm'>Confirm</button>
                                                <button type='submit' onClick={cancelChangeEmail}
                                                className='btn btn-danger btn-sm'>Cancel</button>
                                            </div>
                                        </li> :
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h6>Email: {email}</h6>
                                            <button type='submit' onClick={handleChangeEmail} className='btn btn-primary btn-sm'>Change</button>
                                        </li> }
                                    {changePassword ?
                                        <div>
                                            <li className="list-group-item d-flex flex-column">
                                                <div className='d-flex'>
                                                    <label htmlFor="changeOldPassword" className='col-form-label'>oldPassword: </label>
                                                    <input type='text' style={{ width: '15rem', fontSize: '14px' }} id='changeOldPassword' className='form-control' onChange={(e) => setOldPassword(e.target.value)} />
        
                                                </div>
                                                {wrongPassword && <span className='text-danger'>wrong Password</span>}
                                                <div className='d-flex'>
                                                    <label htmlFor="changeNewPassword" className='col-form-label'>newPassword: </label>
                                                    <input type='text' style={{ width: '15rem', fontSize: '14px' }} id='changeNewPassword' className='form-control' onChange={(e) => setNewPassword(e.target.value)} />
                                                </div>
                                                <div className='d-flex gap-2 justify-content-start'>
                                                    <button type='submit' onClick={confirmChangePassword}
                                                    className='btn btn-success btn-sm'>Confirm</button>
                                                    <button type='submit' onClick={cancelChangePassword}
                                                    className='btn btn-danger btn-sm'>Cancel</button>
                                                </div>
                                            </li>
                                        </div> 
                                        :
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h6>Password: *******</h6>
                                            <button type='submit' onClick={handleChangePassword} className='btn btn-primary btn-sm'>Change</button>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            :
                <h1>TOKEN INVALID. PLEASE LOG IN</h1>
            }
        </div>
    );
};

export default Profile;
