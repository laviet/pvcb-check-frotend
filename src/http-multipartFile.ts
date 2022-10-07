import axios, { AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://10.1.136.185:1234/",
  headers: {
    "Content-type": "multipart/form-data",
  },
});
export default apiClient;