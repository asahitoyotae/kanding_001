import axios from "axios";

export const validateEmail = async (token) => {
  const url = "https://kanding-server.onrender.com/api/users/validate";
  const header = {
    "auth-token": token,
  };
  try {
    const response = await axios.post(url, {}, { headers: header });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
};
