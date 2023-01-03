import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL

const getImages = (params = {}) => {
    const query = new URLSearchParams({...params, ...{page: 1, limit: 10}}).toString()

    const config = {
        method: 'get',
        url: API_URL + "/items?"+ query,
        headers: {
            'Authorization': 'TOKEN d0d6387204d47cd756d0b33f22858df7945fbb09'
        }
    };

    return axios(config);
};

export default {
    getImages
};