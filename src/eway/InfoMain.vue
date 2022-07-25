<template>
  <div style="
      width: 800px;
      margin: 0 auto;
      border: 1px solid gray;
      padding: 20px;
      margin-top: 20px;
    ">
    <el-steps :active="activeHorizontal" finish-status="success">
      <el-step title="Hoàn thiện hồ sơ" />
      <el-step title="Xác thực giao dịch" />
      <el-step title="Hoàn tất đăng kí" />
    </el-steps>

    <div v-if="activeHorizontal == 0">
      <div style="text-align: center">
        <h3>Hoàn thiện hồ sơ đăng ký theo danh mục bên dưới</h3>
        <span>Mã hồ sơ: PVCB10_20042022</span>
      </div>
      <br />
      <br />
      <el-steps direction="vertical" finish-status="success" :active="activeVertical">
        <el-step :title="dataChangeTarget.title1" :description="dataChangeTarget.description1" />
        <div v-if="activeVertical == 0" style="margin: 15px 30px">
          <el-upload class="upload-demo" drag multiple :auto-upload="false" :limit="3" :on-exceed="handleExceed1"
            :file-list="fileList1">
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              Kéo/thả nhiều tài liệu vào đây hoặc
              <br />
              <em>chọn từ máy tính</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">Hỗ trợ jpg, jpeg, tif, pdf</div>
            </template>
          </el-upload>
          <el-form ref="formRef1" :model="inputForm.inputData1" :rules="rulesData1" label-width="140px"
            class="demo-ruleForm" label-position="top">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Họ và tên người thụ hưởng" prop="fullName">
                  <el-input v-model="inputForm.inputData1.fullName" placeholder="Nhập họ và tên người thụ hưởng" />
                </el-form-item>
                <el-form-item label="Số Tài khoản/ số IBAN thụ hưởng" prop="accountNumber">
                  <el-input v-model="inputForm.inputData1.accountNumber"
                    placeholder="Nhập số Tài khoản/ số IBAN thụ hưởng" />
                </el-form-item>
                <el-form-item label="Mã Ngân hàng" prop="bankCode">
                  <el-input v-model="inputForm.inputData1.bankCode" placeholder="Nhập mã Ngân hàng" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="Địa chỉ" prop="address">
                  <el-input v-model="inputForm.inputData1.address" placeholder="Nhập địa chỉ" />
                </el-form-item>
                <el-form-item label="Tên Ngân hàng thụ hưởng" prop="bankName">
                  <el-input v-model="inputForm.inputData1.bankName" placeholder="Nhập tên Ngân hàng thụ hưởng" />
                </el-form-item>
                <el-form-item label="Email liên hệ (nếu có)" prop="email">
                  <el-input v-model="inputForm.inputData1.email" placeholder="Nhập email liên hệ" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="float: right">
            <el-button type="primary" @click="submitForm1(formRef1)">Tiếp tục</el-button>
          </div>
        </div>
        <el-step :title="dataChangeTarget.title2" :description="dataChangeTarget.description2" />
        <div v-if="activeVertical == 1" style="margin: 15px 30px">
          <el-upload class="upload-demo" drag multiple :auto-upload="false" :limit="3" :on-exceed="handleExceed2"
            :file-list="fileList2">
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              Kéo/thả nhiều tài liệu vào đây hoặc
              <br />
              <em>chọn từ máy tính</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">Hỗ trợ jpg, jpeg, tif, pdf</div>
            </template>
          </el-upload>
          <el-form ref="formRef2" :model="inputForm.inputData2" :rules="rulesData2" label-width="140px"
            class="demo-ruleForm" label-position="top">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Họ và tên du học sinh" prop="fullName">
                  <el-input v-model="inputForm.inputData2.fullName" placeholder="Nhập họ và tên du học sinh" />
                </el-form-item>
                <el-form-item label="Số điện thoại liên hệ" prop="phone">
                  <el-input v-model="inputForm.inputData2.phone" placeholder="Nhập số điện thoại liên hệ" />
                </el-form-item>
                <el-form-item label="Số Visa" prop="visa">
                  <el-input v-model="inputForm.inputData2.visa" placeholder="Nhập số visa" />
                </el-form-item>
                <el-form-item label="Email liên hệ (nếu có)" prop="email">
                  <el-input v-model="inputForm.inputData2.email" placeholder="Nhập email liên hệ" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="Địa chỉ" prop="address">
                  <el-input v-model="inputForm.inputData2.address" placeholder="Nhập địa chỉ" />
                </el-form-item>
                <el-form-item label="Số hộ chiếu" prop="identifyNumber">
                  <el-input v-model="inputForm.inputData2.identifyNumber" placeholder="Nhập số hộ chiếu" />
                </el-form-item>

                <el-form-item label="Ngày hết hạn Visa" prop="visaExpire">
                  <el-date-picker style="width: 100%" v-model="inputForm.inputData2.visaExpire" type="date"
                    placeholder="Chọn ngày hết hạn Visa" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div style="float: right">
            <el-button type="primary" @click="backVerticalMethod">Quay lại</el-button>
            <el-button type="primary" @click="submitForm2(formRef2)">Tiếp tục</el-button>
          </div>
        </div>
        <el-step v-if="dataChangeTarget.showStep3" :title="dataChangeTarget.title3"
          :description="dataChangeTarget.description3" />
        <div v-if="activeVertical == 2" style="margin: 15px 30px">
          <el-upload class="upload-demo" drag multiple :limit="3" :auto-upload="false" :on-exceed="handleExceed3"
            :file-list="fileList3">
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              Kéo/thả nhiều tài liệu vào đây hoặc
              <br />
              <em>chọn từ máy tính</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">Hỗ trợ jpg, jpeg, tif, pdf</div>
            </template>
          </el-upload>
          <el-form ref="formRef3" :model="inputForm.inputData3" :rules="rulesData3" label-width="140px"
            class="demo-ruleForm" label-position="top">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Họ và tên nhân thân" prop="fullName">
                  <el-input v-model="inputForm.inputData3.fullName" placeholder="Nhập họ và tên người chuyển tiền" />
                </el-form-item>
                <el-form-item label="Số điện thoại liên hệ" prop="phone">
                  <el-input v-model="inputForm.inputData3.phone" placeholder="Nhập số điện thoại liên hệ" />
                </el-form-item>
                <el-form-item label="Ngày cấp" prop="dateRelease">
                  <el-date-picker style="width: 100%" v-model="inputForm.inputData3.dateRelease" type="date"
                    placeholder="Chọn ngày cấp" />
                </el-form-item>
                <el-form-item label="Email liên hệ (nếu có)" prop="email">
                  <el-input v-model="inputForm.inputData3.email" placeholder="Nhập email liên hệ" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="Địa chỉ" prop="address">
                  <el-input v-model="inputForm.inputData3.address" placeholder="Nhập địa chỉ" />
                </el-form-item>
                <el-form-item label="Số CMND/CCCD/HC" prop="identifyNumber">
                  <el-input v-model="inputForm.inputData3.identifyNumber" placeholder="Nhập số CMND/CCCD/HC" />
                </el-form-item>
                <el-form-item label="Nơi cấp" prop="addressRelease">
                  <el-input v-model="inputForm.inputData3.addressRelease" placeholder="Nhập nơi cấp" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="float: right">
            <el-button type="primary" @click="backVerticalMethod">Quay lại</el-button>
            <el-button type="primary" @click="submitForm3(formRef3)">Tiếp tục</el-button>
          </div>
        </div>
        <el-step v-if="dataChangeTarget.showStep4" :title="dataChangeTarget.title4"
          :description="dataChangeTarget.description4" />
        <div v-if="activeVertical == 3" style="margin: 15px 30px">
          <el-upload class="upload-demo" drag multiple :limit="3" :auto-upload="false" :on-exceed="handleExceed4"
            :file-list="fileList4">
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              Kéo/thả nhiều tài liệu vào đây hoặc
              <br />
              <em>chọn từ máy tính</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">Hỗ trợ jpg, jpeg, tif, pdf</div>
            </template>
          </el-upload>
          <el-form ref="formRef4" :model="inputForm.inputData3" :rules="rulesData3" label-width="140px"
            class="demo-ruleForm" label-position="top">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Tên loại giấy tờ chứng minh quan hệ thân nhân" prop="fullName">
                  <el-input v-model="inputForm.inputData4.abc" placeholder="Nhập tên loại giấy tờ" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="Quan hệ giữa người chuyển và người thụ hưởng " prop="address">
                  <el-select style="width: 100%" v-model="inputForm.inputData4.def" placeholder="Vui lòng chọn">
                    <el-option label="Bố mẹ đẻ/Bố mẹ nuôi/Bố dượng/Mẹ kế" value="a" />
                    <el-option label="Vợ/Chồng" value="b" />
                    <el-option label="Con đẻ/Con nuôi" value="c" />
                    <el-option label="Anh/Chị/Em ruột" value="d" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="float: right">
            <el-button type="primary" @click="backVerticalMethod">Quay lại</el-button>
            <el-button type="primary" @click="checkContinueStepMethod(formRef4)">Tiếp tục</el-button>
          </div>
        </div>
      </el-steps>
    </div>
    <div v-else-if="activeHorizontal == 1" style="margin: 15px 30px">
      <div style="text-align: center">
        <h3>XÁC THỰC OTP</h3>
        <div>Cho giao dịch số: 123457</div>
        <br />
        <div>Mã OTP đã được gửi đến số điện thoại 0987****21</div>
        <div>Mã OTP để xác nhận giao dịch:</div>
        <br />
        <el-form ref="formRef21" :model="inputForm.inputData21" :rules="rulesData21" label-width="100px"
          class="demo-ruleForm" label-position="left" style="margin: 0 auto; width: 60%">
          <el-form-item label="Mã OTP" prop="verifyCode">
            <el-input style="width: 70%" v-model="inputForm.inputData21.verifyCode" type="number"
              placeholder="Nhập mã OTP" />
            &nbsp;&nbsp;&nbsp;
            <el-button type="text"><u>Gửi lại OTP</u></el-button>
          </el-form-item>
        </el-form>
        <div>OTP sẽ hết hiệu lực sau {{ countDown }} giây</div>
        <br />
        <el-button type="primary" @click="submitForm21(formRef21)">Xác thực</el-button>
      </div>
    </div>
    <div v-else-if="activeHorizontal == 2" style="margin: 15px 30px">
      <div style="text-align: center">
        <el-icon :size="60" class="icon-color">
          <SuccessFilled />
        </el-icon>
        <h2>ĐĂNG KÝ GIAO DỊCH THÀNH CÔNG!</h2>
      </div>
      <div style="margin: 50px">
        <div>
          <el-icon :size="15" class="icon-color">
            <SuccessFilled />
          </el-icon>
          &nbsp;
          <span>Mã giao dịch: 75497027</span>
        </div>
        <br />
        <div>
          <el-icon :size="15" class="icon-color">
            <SuccessFilled />
          </el-icon>
          &nbsp;
          <span>Số tiền: 230,600,000.00 VND</span>
        </div>
        <br />
        <div>
          <el-icon :size="15" class="icon-color">
            <SuccessFilled />
          </el-icon>
          &nbsp;
          <span>Thời gian xử lý dự kiến: Từ ngày 05/8/2021 đến hết ngày
            06/8/2021.</span>
        </div>
        <br />
        <div>
          Kích vào đây để tải: <a target="_blank" href="https://google.com">"Hợp đồng mua bán ngoại tệ, Đăng ký kiêm
            điều khoản, điều kiện dịch vụ chuyển tiền đi quốc tế"</a>
        </div>
        <br />
        <div>
          Số tiền đăng ký giao dịch nêu trên sẽ được tạm giữ để chờ duyệt giao
          dịch.<br /><br />
          Sau thời gian trên, Quý khách vẫn chưa nhận được thông báo hoàn thành giao dịch hoặc cần hỗ trợ về dịch vụ,
          vui lòng liên hệ hotline của PVcomBank 1900555592 để được giải đáp và hỗ trợ.<br /><br />
          Vui lòng chọn “HOÀN THÀNH” và trải nghiệm các dịch vụ khác của Eway.
        </div>
        <br />
        <div style="text-align: center">
          <el-button type="primary" @click="completeMethod()">Hoàn thành</el-button>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="Điều khoản hợp đồng" width="70%" :before-close="handleClose"
    :close-on-click-modal="false">
    <div>HỢP ĐỒNG MUA BÁN NGOẠI TỆ</div>
    <div>
      ĐĂNG KÝ KIÊM ĐIỀU KHOẢN, ĐIỀU KIỆN DỊCH VỤ CHUYỂN TIỀN ĐI QUỐC TẾ TRÊN
      KÊNH SỐ PVCOMBANK
    </div>
    <br />
    <div>
      <el-radio v-model="confirmRadio" label="true">Tôi xác nhận đã đọc hiểu, chấp nhận và cam kết tuân thủ theo đúng
        các điều kiện & điều khoản đã cam kết với PVcomBank</el-radio>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" :disabled="confirmRadio == false" @click="confirmDialogMethod()">Đồng ý</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import httpbe from "@/http-be";
// import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import type { UploadProps, UploadUserFile } from "element-plus";
// import { AnyTypeAnnotation } from "@babel/types";
const formRef1 = ref<FormInstance>();
const formRef2 = ref<FormInstance>();
const formRef3 = ref<FormInstance>();
const formRef4 = ref<FormInstance>();
const formRef21 = ref<FormInstance>();
const inputForm = reactive({
  inputData1: {
    fullName: "",
    address: "",
    accountNumber: "",
    bankName: "",
    bankCode: "",
    email: "",
  },
  inputData2: {
    fullName: "",
    address: "",
    phone: "",
    identifyNumber: "",
    visaExpire: "",
    visa: "",
    email: "",
  },
  inputData3: {
    fullName: "",
    address: "",
    phone: "",
    identifyNumber: "",
    paperName: "",
    email: "",
    dateRelease: "",
    addressRelease: ""
  },
  inputData4: {
    abc: "",
    def: "",
  },
  inputData21: {
    verifyCode: "",
  },
});
const dataChangeTarget = reactive({
  title1: "",
  title2: "",
  title3: "",
  title4: "",
  description1: "",
  description2: "",
  description3: "",
  description4: "",
  showStep3: false,
  showStep4: false,
})

let targetTransfer: any;
let objectTransfer: any;
const idTransfer = ref();

function changeDataTransfer() {
  targetTransfer = route.params.targetTransferSelect;
  objectTransfer = route.params.objectTransferSelect;
  idTransfer.value = route.query.id;
  if (targetTransfer == 'A') {
    dataChangeTarget.title1 = "Thông báo học phí/sinh hoạt phí của du học sinh"
    dataChangeTarget.description1 = "Thông báo của cơ sở đào tạo nước ngoài có thể hiện tên của du học sinh"
    dataChangeTarget.title2 = "Hộ chiếu du học sinh"
    if (objectTransfer == 'nome') {
      dataChangeTarget.showStep3 = true
      dataChangeTarget.showStep4 = true
      dataChangeTarget.title3 = "Giấy tờ tùy thân của người chuyển"
      dataChangeTarget.title4 = "Giấy tờ chứng minh quan hệ nhân thân"
    }
  }
  else if (targetTransfer == 'B') {
    dataChangeTarget.title1 = "Thông báo viện phí/dự tính chi phí của cơ sở chữa bệnh"
    dataChangeTarget.description1 = "Thông báo  của cơ sở chữa bệnh có thể hiện tên người bệnh"
    dataChangeTarget.title2 = "Hộ chiếu người bệnh"
    if (objectTransfer == 'nome') {
      dataChangeTarget.showStep3 = true
      dataChangeTarget.showStep4 = true
      dataChangeTarget.title3 = "Giấy tờ tùy thân của người chuyển"
      dataChangeTarget.title4 = "Giấy tờ chứng minh quan hệ nhân thân"
    }
  }
  else if (targetTransfer == 'C') {
    dataChangeTarget.title1 = "Giấy tờ chứng minh người hưởng trợ cấp ở nước ngoài"
    dataChangeTarget.title2 = "Giấy tờ tùy thân của người chuyển"
    dataChangeTarget.title3 = "Giấy tờ chứng minh quan hệ nhân thân"
    dataChangeTarget.description1 = "(Visa, Sổ xanh...)"
    dataChangeTarget.showStep3 = true
  }
  else if (targetTransfer == 'D') {
    dataChangeTarget.title1 = "Văn bản xác nhận đặt phòng/đặt tour/…"
    dataChangeTarget.title2 = "Hóa đơn/chứng từ đòi tiền"
    dataChangeTarget.title3 = "Hộ chiếu người đi du lịch"
    dataChangeTarget.description1 = "Văn bản xác nhận của đơn vị cung ứng dịch vụ nước ngoài"
    dataChangeTarget.showStep3 = true
  }
  else if (targetTransfer == 'E') {
    dataChangeTarget.title1 = "Quyết định cử đi công tác"
    dataChangeTarget.title2 = "Giấy thông báo chi phí"
    dataChangeTarget.title3 = "Hộ chiếu người đi công tác"
    dataChangeTarget.showStep3 = true
  }
  else if (targetTransfer == 'F') {
    dataChangeTarget.title1 = "Giấy thông báo chi phí"
    dataChangeTarget.title2 = "Giấy tờ tùy thân của người chuyển"
  }
  else if (targetTransfer == 'G') {
    dataChangeTarget.title1 = "Văn bản về việc phân chia thừa kế/Di chúc"
    dataChangeTarget.title2 = "Giấy tờ chứng minh người hưởng thừa kế ở nước ngoài"
    dataChangeTarget.title3 = "Giấy tờ tùy thân của người chuyển"
    dataChangeTarget.description1 = "Văn bản của cơ quan có thẩm quyền/Văn bản thỏa thuận phân chia thừa kế giữa những người thừa kế hợp pháp/Di chúc"
    dataChangeTarget.description2 = "(Visa, Sổ xanh...)"
    dataChangeTarget.showStep3 = true
  }
  else if (targetTransfer == 'H') {
    dataChangeTarget.title1 = "Văn bản/Giấy tờ chứng minh được phép định cư nước ngoài"
    dataChangeTarget.title2 = "Hộ chiếu người định cư"
    dataChangeTarget.description1 = "Văn bản của cơ quan có thẩm quyền của nước ngoài cho phép định cư hoặc Giấy tờ chứng minh được phép định cư nước ngoài"
  }
}

const confirmRadio = ref(false);
const rulesData1 = reactive<FormRules>({
  //   fullName: [{ required: true, message: "Thông tin không được để trống" }],
  //   address: [{ required: true, message: "Thông tin không được để trống" }],
  //   accountNumber: [{ required: true, message: "Thông tin không được để trống" }],
  //   bankName: [{ required: true, message: "Thông tin không được để trống" }],
  //   bankCode: [{ required: true, message: "Thông tin không được để trống" }],
});
const rulesData2 = reactive<FormRules>({
  //   fullName: [{ required: true, message: "Thông tin không được để trống" }],
  //   address: [{ required: true, message: "Thông tin không được để trống" }],
  //   phone: [{ required: true, message: "Thông tin không được để trống" }],
  //   identifyNumber: [
  //     { required: true, message: "Thông tin không được để trống" },
  //   ],
});
const rulesData3 = reactive<FormRules>({
  //   fullName: [{ required: true, message: "Thông tin không được để trống" }],
  //   address: [{ required: true, message: "Thông tin không được để trống" }],
  //   phone: [{ required: true, message: "Thông tin không được để trống" }],
});
const rulesData21 = reactive<FormRules>({
  verifyCode: [
    { required: true, message: "Thông tin không được để trống" },
    {
      min: 6,
      max: 6,
      message: "Mã xác thực bao gồm 6 chữ số",
      trigger: "blur",
    },
  ],
  //   address: [{ required: true, message: "Thông tin không được để trống" }],
  //   phone: [{ required: true, message: "Thông tin không được để trống" }],
});

const activeHorizontal = ref(0);
const activeVertical = ref(0);

const nextHorizontalMethod = () => {
  if (activeHorizontal.value++ > 2) {
    activeHorizontal.value = 2;
  }
};

const nextVerticalMethod = () => {
  if (activeVertical.value++ > 3) {
    activeVertical.value = 3;
  }
};
function backVerticalMethod() {
  if (activeVertical.value-- < 1) {
    activeVertical.value = 0;
  }
}

const countDown = ref(120);

function countDownTimer() {
  if (countDown.value > 0) {
    setTimeout(() => {
      countDown.value -= 1;
      countDownTimer();
    }, 1000);
  }
}

function submitForm1(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      checkBeforceInput();
      nextVerticalMethod();
    }
  });
}
const submitForm2 = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      nextVerticalMethod();
    }
  });
};
const submitForm3 = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      nextVerticalMethod();
    }
  });
};
const submitForm4 = () => {
  nextVerticalMethod();
  nextHorizontalMethod();
  countDownTimer();
};
const dialogVisible = ref(false);
function checkContinueStepMethod(formEl: FormInstance | undefined) {
  console.log(formEl)
  dialogVisible.value = true;
  confirmRadio.value = false;
}
function confirmDialogMethod() {
  dialogVisible.value = false;
  submitForm4();
}
const handleClose = (done: () => void) => {
  //   ElMessageBox.confirm('Are you sure to close this dialog?')
  //     .then(() => {
  //       done()
  //     })
  //     .catch(() => {
  //       // catch error
  //     })
  dialogVisible.value = false;
};
const submitForm21 = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (countDown.value == 0) {
        ElMessage({
          message: "OTP đã hết hiệu lực",
          type: "error",
        });
        return;
      }
      if (inputForm.inputData21.verifyCode == "112233") {
        alert(idTransfer.value)
        httpbe.put(`/payment/info?id=${idTransfer.value}`).then((resp) => {
          console.log(resp.data.payload)
          nextHorizontalMethod();
        });

      } else {
        ElMessage({
          message: "Mã OTP không chính xác",
          type: "error",
        });
      }
    }
  });
};
function completeMethod() {
  nextHorizontalMethod();
  alert("hoan thanh");
}

const checkBeforceInput = () => {
  //   let check = inputForm.moneyPay > Number(inputForm.balance);
  //   if (check) {
  //     ElMessage({
  //       message: "Số dư khả dụng không đủ",
  //       type: "error",
  //     });
  //     throw null;
  //   }
};
const fileList1 = ref<UploadUserFile[]>([]);
const fileList2 = ref<UploadUserFile[]>([]);
const fileList3 = ref<UploadUserFile[]>([]);
const fileList4 = ref<UploadUserFile[]>([]);

const handleExceed1: UploadProps["onExceed"] = () => {
  ElMessage.warning(`Bạn chỉ được phép chọn tối đa 3 file`);
};
const handleExceed2: UploadProps["onExceed"] = () => {
  ElMessage.warning(`Bạn chỉ được phép chọn tối đa 3 file`);
};
const handleExceed3: UploadProps["onExceed"] = () => {
  ElMessage.warning(`Bạn chỉ được phép chọn tối đa 3 file`);
};
const handleExceed4: UploadProps["onExceed"] = () => {
  ElMessage.warning(`Bạn chỉ được phép chọn tối đa 3 file`);
};
// const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
//   console.log("abcd1: " + uploadFile)
//   console.log("abcd2: " + uploadFiles)
//   if (rawFile.type !== 'image/jpeg') {
//   ElMessage.error('Avatar picture must be JPG format!')
//   return false
// } else if (rawFile.size / 1024 / 1024 > 2) {
//   ElMessage.error('Avatar picture size can not exceed 5MB!')
//   return false
// }
// return true
// }
// const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
//   console.log("abcd: " + rawFile)
//   if (rawFile.type !== 'image/jpeg') {
//     ElMessage.error('Avatar picture must be JPG format!')
//     return false
//   }

// else if (rawFile.size / 1024 / 1024 > 5) {
//   ElMessage.error('Avatar picture size can not exceed 5MB!')
//   return false
// }
// return true
// }
const route = useRoute();
onMounted(() => {
  changeDataTransfer()
});
</script>

<style scoped>
.upload-demo {
  width: 170px;
}

.icon-color {
  color: green;
}
</style>