import axios from "axios";

const API_URL = "https://dummyjson.com/";

const register = (username, email, password) => {
  // return axios.post(API_URL + "users/add", {
  //   username,
  //   email,
  //   password,
  // });

  return axios.post(API_URL + "users/add", {
    firstName: 'Muhammad',
    lastName: 'Ovi',
    age: 250,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "auth/login", {
      username,
      password,
    })
    .then((response) => {
      console.log({response})
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
