import axios from "axios";

const API = "http://localhost:3200/api/auth";

export const login = async (data) => {
  return await axios.post(`${API}/user/login`, data, {
    withCredentials: true,
  });
};