import axios, { AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:1234/",
  headers: {
    "Content-type": "application/json",
  },
});
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
  else if(status == 404){
    alert("Đường dẫn không tồn tại: "+error.config.url)
    throw null;
  }
  console.log("response 2")
  throw error.response;
})
export default apiClient;