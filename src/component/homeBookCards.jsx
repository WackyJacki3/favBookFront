import React from "react"

function HomeBookCard({ volumeInfo: { title, subtitle, authors, imageLinks = {}, description, publishedDate, publisher, categories, pageCount } }) {
    
    let thumbnail = imageLinks?.thumbnail || "";

    function emptyThumbnail(thumbnail) {
        if(!thumbnail) {
           console.log(thumbnail);
           thumbnail =  "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png";
           return thumbnail;
        }
        console.log(thumbnail);
        let imgZoom = thumbnail.replace('zoom=1', 'zoom=0');
        thumbnail = imgZoom.replace('http', 'https');
        console.log(`After: ${thumbnail}`);
        return thumbnail
    }

    thumbnail = emptyThumbnail(thumbnail);

    return (
        <div className="card h-100" style={{ width: "18rem" }}>
            <img src={thumbnail} className="card-img-top" alt="Book Cover" />
            <div className="card-body">
                <h5 className="card-title">{
                    subtitle ? `${title}: ${subtitle}` : title
                }</h5>
                 <ul className="list-group list-group-flush">
                    {!authors ?
                        <li className="list-group-item p-0">Author: N/A</li> 
                    :
                        <li className="list-group-item p-0">Author: {authors.join(", ")}</li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default HomeBookCard;