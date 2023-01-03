import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

const register = (user) => {
  return axios.post(API_URL + "/users/register/", user);
};

const login = (username, password) => {
  const config = {
    method: 'post',
    url: `${API_URL}/api-token-auth/`,
    data : {
      username,
      password
    }
  };

  return axios(config)
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
