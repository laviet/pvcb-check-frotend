import axios, { AxiosInstance } from "axios";
import authHeader from '@/check/interface/Authentication';
import { urlBE } from "@/functionCommon/DataConstant"
import { urlFEFees } from "@/functionCommon/DataConstant"
import TokenReponse, { DecodedToken } from "@/check/interface/DataModel";

const apiClient: AxiosInstance = axios.create({
  baseURL: urlBE,
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
  return response;
}, async function (error) {
  const status = error.response.status;
  const errorResponse = error.response.data;
  const originalConfig = error.config;
  //không có quyền truy cập trang này
  if (status == 403) {
    alert("Không có quyền truy cập")
    throw null;
  }
  //lỗi xác thực
  else if (status == 401) {
    if (errorResponse.code == "10") {
      const user = JSON.parse(localStorage.getItem('userInfo')!);
      const refreshToken = user.refresh_token;
      const responseToken = await axios.get(urlBE + `keycloak/token/refresh?refreshToken=${refreshToken}`).then((resp) => {
        return resp;
      }).catch(err => {
        if (err.response.data.code == "11") {
          localStorage.removeItem("userInfo")
          const redirectUri = urlFEFees + "/login";
          window.location.href = `https://connect-internal.pvcb.vn/auth/realms/pvcombank-internal/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;
        }
        alert("Phiên giao dịch đã hết hạn. Quý khách vui lòng đăng nhập lại.")
        throw null;
      })
      const mydata: TokenReponse = responseToken.data.payload;
      localStorage.setItem('userInfo', JSON.stringify(mydata));
      return apiClient(originalConfig);
    }
    Promise.reject(error.response)
  }
  else if (status == 404) {
    alert("Đường dẫn không tồn tại: " + error.config.url)
    Promise.reject(error.response)
  }
  Promise.reject(error.response)
})
export default apiClient;