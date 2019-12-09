import axios from "axios";

const axios_main = axios.create({
  baseURL: "http://49.205.139.196:8080/",
  headers: {
    "Content-Type": "application/json"
  }
});
export default axios_main;
