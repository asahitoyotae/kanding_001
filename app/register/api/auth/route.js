import axios from "axios";

export const createNewUser = async (e) => {
  const url = "https://kanding-server.onrender.com/api/users/create";
  const header = {
    "auth-key": e.target.access_key.value,
  };
  const body = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };

  try {
    const response = await axios.post(url, body, { headers: header });
    const data = response.data;

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
};
