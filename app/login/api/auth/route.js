import axios from "axios";

const getAcess = async (e) => {
  const url = "https://kanding-server.onrender.com/api/users/login";
  const body = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  try {
    const response = await axios.post(url, body);

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
};

export default getAcess;
