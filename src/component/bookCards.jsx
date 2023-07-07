import React from "react";

function BookCard({ _id, id, title, subTitle, coverPic, author, description, publishDate, publisher, categories, pageCount, onValueChange }) {

    const handleClick = (e) => {
        let id = e.target.dataset.id;
        onValueChange(id); 
    }

    return (
        <div className="card h-100" style={{ width: "18rem" }}>
            <img src={coverPic} className="card-img-top" alt="Book Cover" />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{
                    subTitle ? `${title}: ${subTitle}` : title
                }</h5>
                {!author?
                    <p className="card-text">Author: N/A</p>
                :
                    <p className="card-text">Author: {author.join(", ")}</p>
                }
                <div className="mt-auto px-0">
                    <a className="btn btn-danger" href="#" data-id={id} onClick={handleClick}>Delete</a>
                </div>
                
            </div>
        </div>
    )
}

export default BookCard;

