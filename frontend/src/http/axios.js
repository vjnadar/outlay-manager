import axios from "axios";

const axios_main = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json"
  }
});
export default axios_main;
