import axios from "axios";
import { BASE_URL } from "../../utils/url";

//! Login
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email, 
    password
  });
  //? return a promise
  return response.data;
};
