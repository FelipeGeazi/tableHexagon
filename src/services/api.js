import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5105/",
  timeout: 8 * 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
