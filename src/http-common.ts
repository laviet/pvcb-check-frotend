import axios, { AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL: "https://62a7f43da89585c17709f863.mockapi.io/eway/v1/",
  headers: {
    "Content-type": "application/json",
  },
});
export default apiClient;