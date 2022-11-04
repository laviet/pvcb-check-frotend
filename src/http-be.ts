import axios, { AxiosInstance } from "axios";
import authHeader from '@/check/interface/Authentication';
const apiClient: AxiosInstance = axios.create({
  // baseURL: "http://10.1.136.185:1234/",
  baseURL: "https://eway-api-app-nhs-digitech.apps.ocp4-dev03.pvcomtestocp.com/",
  headers: {
    "Content-type": "application/json",
    "company": "VN0010001",
    "x-fapi-interaction-id": "123456",
  },
});
apiClient.interceptors.request.use(function (config) {
  const authKey = authHeader()
  if (authKey != null && config.headers != undefined) {
    config.headers["Authorization"] = authKey.Authorization!;
    return config;
  }
})
//thông tin trả về sau khi gọi api
apiClient.interceptors.response.use(function (response) {
  console.log("response 1")
  return response;
}, function (error) {
  const status = error.response.status;
  //không có quyền truy cập trang này
  if (status == 403) {
    alert("Không có quyền truy cập")
    throw null;
  }
  //lỗi xác thực, xóa token=>quay về trang login
  else if (status == 401) {
    alert("Lỗi xác thực")
    // localStorage.removeItem("user")
    throw null;
  }
  else if (status == 404) {
    alert("Đường dẫn không tồn tại: " + error.config.url)
    throw null;
  }
  console.log("response 2")
  throw error.response;
})
export default apiClient;