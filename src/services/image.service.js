import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://picsum.photos/v2/";

const getImages = () => {
    return axios.get(API_URL + "list?page=1&limit=10");
};

export default {
    getImages
};