import axios from "axios";

const LogoutUser = async (access) => {
  const header = { "auth-token": `Bearer ${access}` };
  const body = {};

  const url = "http://localhost:8000/api/users/logout";
  try {
    const response = await axios.post(url, body, { headers: header });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default LogoutUser;
