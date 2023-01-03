import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL

const getImages = (params = {}) => {
    const query = new URLSearchParams({...params, ...{page: 1, limit: 10}}).toString()
    return axios.get(API_URL + "/items?"+ query);
};

export default {
    getImages
};