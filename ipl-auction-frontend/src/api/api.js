import axios from "axios";

const API = axios.create({
  baseURL: "https://ipl-auction-m1p6.onrender.com/api"
});

export default API;
