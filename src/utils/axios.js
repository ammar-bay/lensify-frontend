import axios from "axios";

export const BASE_URL =
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:3500"
  //   :
     "https://lensify-backend-5b63ad16c806.herokuapp.com";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
