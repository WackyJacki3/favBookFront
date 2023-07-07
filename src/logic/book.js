import axios from "axios";

const addToFavLogic = async({ id, volumeInfo: {title, subTitle, imageLinks, authors, description, publishedDate, publisher, categories, pageCount } }, token) => {
    let coverPic = imageLinks?.thumbnail || "";
    axios.defaults.headers.common['token'] = `${token}`;

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

    coverPic = emptyThumbnail(coverPic);

    try {
        const response = await axios.post(
            import.meta.env.VITE_REACT_APP_BASE_URL + "/api/book/addFavBook",
            { id, title, subTitle, coverPic, author: authors, description, publishDate: publishedDate, publisher, categories, pageCount }
        );
        console.log("passed fetch");
        return response.data;
    } catch (error) {
        console.log(`addToFavLogic ${error}`);
    }
}

const deleteFavBookLogic = async(id) => {
    try {
        const response = await axios.post(
            import.meta.env.VITE_REACT_APP_BASE_URL + "/api/book/deleteFavBook",
            { id }
        );
        return response.data;
    } catch (error) {
        console.log(`deleteFavBookLogic ${error}`);
    }
}

export {
    addToFavLogic,
    deleteFavBookLogic,
}