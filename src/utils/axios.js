import axios from "axios";

export const BASE_URL =
  //  process.env.NODE_ENV === "development"
  //  ? "http://localhost:3500"
  //  : "https://lensifyco-backend-352f7d6d42d9.herokuapp.com";
  "https://lensifyco-backend-352f7d6d42d9.herokuapp.com";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
