import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL


const getImages = (params = {}) => {
    const query = new URLSearchParams({...params, ...{page: 1, limit: 10}}).toString()
    return axios.get("https://picsum.photos/v2/list?"+ query);
};



const getItems = (params = {}) => {
    const query = new URLSearchParams({...params, ...{page: 1, limit: 10}}).toString()

    const config = {
        method: 'get',
        url: API_URL + "/items/?"+ query,
        headers: authHeader(),
    };

    return axios(config);
};


const updateItem = (id, data) => {

    var config = {
        method: 'patch',
        url: API_URL + '/items/'+ id +'/',
        headers: authHeader(),
        data : data
    };

    return axios(config);
};

export default {
    getImages,
    getItems,
    updateItem
};