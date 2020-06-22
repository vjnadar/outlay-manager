import axios from "axios";

const axios_main = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_END_POINT_URL_DEV
      : "",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axios_main;
