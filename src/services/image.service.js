import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://picsum.photos/v2/";

const getImages = (params = {}) => {
    const query = new URLSearchParams({...params, ...{page: 1, limit: 10}}).toString()
    return axios.get(API_URL + "list?"+ query);
};

export default {
    getImages
};