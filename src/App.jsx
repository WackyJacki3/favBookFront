import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './page/login.jsx';
import FavBooks from './page/favBooks.jsx';
import Home from './page/home.jsx';
import Profile from './page/profile.jsx';
import Register from './page/register.jsx';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favBooks' element={<FavBooks />} />
        <Route path ='/login' element={<Login />} />
        <Route path ='/register' element={<Register />} />
        <Route path ='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
