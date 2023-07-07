import React from "react";
import { useEffect, useState } from 'react';

function SearchBar({ onSearch }) {

    const [search, setSearch] = useState("");

    const handleSearch = () => {
        onSearch(search);
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
            </button>
        </div>
    )
}

export default SearchBar