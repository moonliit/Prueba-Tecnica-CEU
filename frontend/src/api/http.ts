import axios from "axios";

const LOCAL_IP = "localhost";

export const http = axios.create({
  baseURL: `http://${LOCAL_IP}:8000/api`,
});
