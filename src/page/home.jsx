import React from 'react';
import { useEffect, useState } from 'react';
import SearchBar from '../component/searchBar';
import HomeBookCard from '../component/homeBookCards';
import HomeBookCardToken from '../component/homeBookCardToken';
import Navbar from '../component/navBar';
import { addToFavLogic } from '../logic/book.js';
import axios from 'axios';
import { useNavigate } from "react-router";

const home = () => {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState("");
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const [receivedValue, setReceivedValue] = useState("");

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
    };

    // Grab ID value for favBook from component
    const handleValueChange = (value) => {
        setReceivedValue(value);
    }

    // Delete token from header so google book api works
    useEffect(() => {
            delete axios.defaults.headers.common['token'];
    }, []);

    // Run API everytime I search something new
    useEffect(() => {
        if(query === "") {
            return;
        }

        const fetchData = async () => {
          try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            console.log(response.data.items);
            setBooks(response.data.items);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, [query]);

    // Run backend addFavBook everytime I like a book
    useEffect(() => {

        const handleAddToFav = async () => {
            if(receivedValue === "") {
                return;
            }
    
            let favBook = books.find(book => book.id === receivedValue);
            console.log(favBook.volumeInfo.title);
    
            try {
                const data = await addToFavLogic({ ...favBook}, token);
                console.log("data worked...");
            } catch(error) {
                console.log(`fetching error addToFavLogic ${error}`);
            }
    
            delete axios.defaults.headers.common['token'];
            navigate("/favbooks");
        };

        handleAddToFav();
        
    }, [receivedValue]);

    return (
        <div>
            <Navbar />
            {token?
                <div className='d-flex flex-column align-items-center'>
                    <div className='searchBar col-sm-8 col-md-6 col-lg-4 my-5'>
                        <SearchBar onSearch={handleSearch}/>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {books.map((book, index) => {
                            return (
                            <div key={index} className='m-3'>
                                <HomeBookCardToken {...book} onValueChange={handleValueChange} />
                            </div>
                            );
                        })}
                        </div>
                    {/* <div className='movie-list d-flex'>
                        {
                            books.map((book, index) => {
                                return (
                                    <HomeBookCardToken key={index} {...book} onValueChange={handleValueChange} />
                                )
                            })
                        }
                    </div>                    */}
                </div>
            :    
                <div className='d-flex flex-column align-items-center'>
                    <div className='searchBar col-sm-8 col-md-6 col-lg-4 my-5'>
                        <SearchBar onSearch={handleSearch}/>
                    </div>
                    <div className='movie-list d-flex flex-wrap justify-content-center'>
                        {
                            books.map((book, index) => {
                                console.log(book);
                                return (
                                    <div key={index} className='m-3'>
                                        <HomeBookCard {...book} />
                                    </div>
                                )
                            })
                        }
                    </div>                   
                </div>
            }
        </div>
    )
}

export default home