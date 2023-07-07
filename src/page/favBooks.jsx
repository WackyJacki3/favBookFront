import React from "react";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import BookCard from "../component/bookCards";
import Navbar from "../component/navBar";
import { deleteFavBookLogic } from "../logic/book";
import { useNavigate } from "react-router";

function Home () {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const [receivedValue, setReceivedValue] = useState("");
    const [refreshPage, setRefreshPage] = useState(false);

    const handleValueChange = (value) => {
        setReceivedValue(value);
    }

    useEffect(() => {
        axios.defaults.headers.common['token'] = `${token}`;
        axios.get(import.meta.env.VITE_REACT_APP_BASE_URL + "/api/book/getFavBooks").then((res) => {
            console.log(res.data.favBooks);
            setBooks(res.data.favBooks);
        })
        setRefreshPage(false);
    }, [refreshPage]);

    useEffect(() => {

        const deleteFavBook = async() => {
            if(receivedValue === "") {
                return;
            }

            try {
                const data = await deleteFavBookLogic(receivedValue);
                console.log("FavBook deleted"); 
            } catch (error) {
                console.log(`fetching error deleteFavBookLogic ${error}`);
            }
        };
        deleteFavBook();
        setRefreshPage(true);

    }, [receivedValue]);

    return (
        <div>
        <Navbar />
        {token ?
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center">
                    <h2 className='my-5'>Favourite Books</h2>
                </div>
                <div className="d-flex flex-wrap justify-content-center"> 
                    {
                        books.map((book, index) => {
                            return (
                                <div className="m-3" key={index}>
                                    <BookCard key={index} {...book} onValueChange = {handleValueChange} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        :
            <h1>TOKEN INVALID. PLEASE LOG IN</h1>
        }
        </div>
    )
}

export default Home;
