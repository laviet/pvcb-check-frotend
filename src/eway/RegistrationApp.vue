<template>
  <div
    style="
      width: 800px;
      margin: 0 auto;
      border: 1px solid gray;
      padding: 20px;
      margin-top: 50px;
    "
  >
    <div style="text-align: center">
      <h3>Hướng dẫn tải và xác thực Authentication</h3>
      <span class="blur-class"
        >Ứng dụng Google Authenticator bảo vệ tài khoản của bạn và các giao dịch
        rút/chuyển tiền.</span
      >
    </div>
    <hr />
    <div>
      <b>Bước 1</b>
      <br />
      <br />
      <div>
        Tải và cài đặt Google Authenticator
        <span class="color-yellow"> (Androi - iOS)</span> trên điện thoại hoặc
        máy tính bảng của bạn.
      </div>
      <br />
      <b style="margin-right: 20px">Bước 2</b>
      <span> Chọn 1 trong 2 cách sau:</span>
      <br />
      <br />
      <el-row :gutter="20">
        <el-col :span="12"
          ><div>
            <span style="margin-right: 24px" class="color-yellow">Cách 1 </span
            ><span> Quét QR Code </span>
          </div>
          <br />
          <div>
            Mở ứng dụng Authentication, nhấn biểu tượng “ + ” ở góc phải màn
            hình, và thực hiện quét QR Code bằng camera.
          </div>
          <div style="text-align: center">
            <img style="width: 200px" src="@/assets/qacode.png" />
          </div>
        </el-col>
        <el-col :span="12" style="border-left: 1px solid #c4c4c4">
          <div>
            <span style="margin-right: 24px" class="color-yellow">Cách 2 </span
            ><span> Nhập khóa thiết lập </span>
          </div>
          <br />
          <div>
            Mở ứng dụng Authentication, nhấn biểu tượng “ + ” ở góc phải màn
            hình, chọn Nhập khóa thiết lập và nhập mã số dưới đây.
          </div>
          <br />
          <div>
            <i class="blur-class" style="">
              Hãy lưu lại mã số này. Nó sẽ giúp bạn khôi phục Google
              Authenticator trong trường hợp mất thiết bị.
            </i>
            <br />
            <br />
            <el-input size="large" v-model="QACode">
              <template #append>
                <el-button @click="copyMethod()"
                  ><span class="color-yellow">SAO CHÉP</span></el-button
                >
              </template>
            </el-input>
          </div>
          <br />
          <br />
          <br />
          <el-button type="primary" style="float: right" @click="OKMethod()"
            >Tôi đã hiểu</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ElMessage } from "element-plus";
const QACode = "04GA24EW23";
const copyMethod = () => {
  navigator.clipboard.writeText(QACode);
  ElMessage({
    showClose: true,
    message: "Sao chép thành công",
    type: "success",
  });
};
const OKMethod = () => {
  router.push({ name: "transferName", params: { message: "chim" } });
};
</script>

<style lang="scss" scoped>
.blur-class {
  color: #848282;
}
.color-yellow {
  color: #ffb803;
}
.el-input__inner {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>