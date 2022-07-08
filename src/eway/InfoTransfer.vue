<template>
  <div style="
      width: 800px;
      margin: 0 auto;
      border: 1px solid gray;
      padding: 20px;
      margin-top: 20px;
    ">
    <!-- <el-steps :active="active" finish-status="success">
      <el-step title="Thông tin chuyển" />
      <el-step title="Nguồn tiền chuyển" />
    </el-steps> -->
    <!-- <div v-if="active == 0"> -->
    <h3 style="text-align: center">Đăng ký thông tin chuyển tiền</h3>
    <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
      label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Chọn nguồn tiền thanh toán" prop="bankType">
            <el-select style="width: 100%" v-model="inputForm.bankType" placeholder="Chọn nguồn tiền thanh toán">
              <el-option label="Tài khoản thanh toán PVcomBank" value="pvcb" />
              <el-option disabled label="Tài khoản thanh toán TechcomBank" value="tcb" />
              <el-option disabled label="Tài khoản thanh toán BIDV" value="bid" />
            </el-select>
          </el-form-item>
          <el-form-item label="Nhập mã chuyển tiền (nếu có)" prop="code">
            <el-input v-model.number="inputForm.code" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Nhập số tiền muốn chuyển" prop="money">
            <!-- <ElCurrencyInput  v-model="inputForm.money" :options="{ currency: 'USD' }" /> -->
            <el-input type="number" v-model="inputForm.money" />
          </el-form-item>
          <el-form-item label="Số tài khoản" prop="accountNumber">
            <el-select v-model="inputForm.accountNumber" placeholder="Chọn số tài khoản" style="width: 100%"
              @change="changeAccountNumberMethod()">
              <el-option v-for="item in accountNumberList" :key="item.value" :label="item.label" :value="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="Chi phí trong nước tính vào" prop="internalFees">
            <el-select style="width: 100%" v-model="inputForm.internalFees">
              <el-option label="Chúng tôi" value="sendType" />
              <el-option label="Người thụ hưởng" value="recieveType" :disabled="inputForm.externalFees == 'sendType'" />
            </el-select>
          </el-form-item>
          <el-form-item label="Tổng chi phí quy đổi" prop="moneyShow">
            <!-- <el-input v-model.number="inputForm.moneyShow" readonly autocomplete="off">
              <template #append>VND</template>
            </el-input> -->
            <span>{{ formatterCurrency.format(inputForm.moneyShow) }}</span>
          </el-form-item>
          <el-form-item v-if="inputForm.targetTransfer == 'A' || inputForm.targetTransfer == 'B'"
            label="Đối tượng chuyển tiền" prop="objectTransfer">
            <el-radio-group v-model="inputForm.objectTransfer">
              <el-radio label="me">Bản thân</el-radio>
              <el-radio label="nome">Người thân</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <!-- column 2 -->
        <el-col :span="12">
          <el-form-item label="Chọn mục đích chuyển tiền" prop="targetTransfer">
            <el-select v-model="inputForm.targetTransfer" placeholder="Chọn mục đích chuyển tiền" style="width: 100%">
              <el-option v-for="item in targetTransferList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="Chọn loại tiền tệ" prop="moneyType">
            <el-select v-model="inputForm.moneyType" @change="changeMoneyTypeMethod()" placeholder="Chọn loại tiền tệ"
              style="width: 100%">
              <el-option v-for="item in  moneyTypeList" :key="item.name" :label="item.label" :value="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="Tỷ giá ngoại tệ" prop="rate">
            <!-- <el-input v-model.number="inputForm.rate" readonly autocomplete="off" /> -->
            <span>{{ formatterCurrency.format(inputForm.rate) }}</span>
          </el-form-item>
          <el-form-item label="Số dư khả dụng" prop="balance">
            <!-- <el-input v-model.number="inputForm.balance" readonly autocomplete="off">
              <template #append>VND</template>
            </el-input> -->
            <span>{{ formatterCurrency.format(inputForm.balance) }}</span>
          </el-form-item>
          <el-form-item label="Chi phí nước ngoài tính vào" prop="externalFees">
            <el-select v-model="inputForm.externalFees" style="width: 100%">
              <el-option label="Chúng tôi" value="sendType" :disabled="inputForm.internalFees == 'recieveType'" />
              <el-option label="Người thụ hưởng" value="recieveType" />
            </el-select>
          </el-form-item>
          <el-form-item label="Tổng tiền cần thanh toán" prop="moneyShow">
            <!-- <el-input v-model.number="inputForm.moneyPay" readonly autocomplete="off">
              <template #append>VND</template>
            </el-input> -->
            <!-- <ElCurrencyInput v-model="inputForm.moneyPay" :options="{ currency: 'VND', locale: 'de-DE' }" /> -->
            <span style="font-weight: bold; color: red">{{ formatterCurrency.format(inputForm.moneyPay) }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <br />
      <div>
        <!-- <div>
          Tôi xác nhận đã đọc kỹ và hiểu rõ các nội dung nêu trên và tôi cam kết
          tuân thủ theo đúng các điều kiện đã cam kết với PVcomBank.
        </div> -->
        <div style="text-align: center"><b>Hồ sơ cần chuẩn bị</b></div>

        <div style="margin: 0 auto; width: 600px; font-size: 12px">
          <!-- Học tập ở nước ngoài -->
          <div v-if="inputForm.targetTransfer == 'A'">
            1. Thông báo học phí/sinh hoạt phí của du học sinh<br />
            2. Hộ chiếu du học sinh<br />
            <span v-if="inputForm.objectTransfer == 'nome'">
              3. Giấy tờ tùy thân của người chuyển<br />
              4. Giấy tờ chứng minh quan hệ nhân thân<br />
            </span>
          </div>
          <!-- Chữa bệnh ở nước ngoài -->
          <div v-else-if="inputForm.targetTransfer == 'B'">
            1. Giấy tờ chứng minh người hưởng trợ cấp ở nước ngoài<br />
            2. Hộ chiếu người bệnh<br />
            <span v-if="inputForm.objectTransfer == 'nome'">
              3. Giấy tờ tùy thân của người chuyển<br />
              4. Giấy tờ chứng minh quan hệ nhân thân<br />
            </span>
          </div>
          <!-- Trợ cấp nhân thân ở nước ngoài -->
          <div v-else-if="inputForm.targetTransfer == 'C'">
            1. Giấy tờ chứng minh người hưởng trợ cấp ở nước ngoài <br />
            2. Giấy tờ tùy thân của người chuyển<br />
            3. Giấy tờ chứng minh quan hệ nhân thân<br />
          </div>
          <!-- Du lịch -->
          <div v-else-if="inputForm.targetTransfer == 'D'">
            1. Văn bản xác nhận đặt phòng/đặt tour/… <br />
            2. Hóa đơn/chứng từ đòi tiền<br />
            3. Hộ chiếu người đi du lịch<br />
          </div>
          <!-- Đi công tác -->
          <div v-else-if="inputForm.targetTransfer == 'E'">
            1. Quyết định cử đi công tác <br />
            2. Giấy thông báo chi phí<br />
            3. Hộ chiếu người đi công tác<br />
          </div>
          <!-- Trả lệ phí cho nước ngoài -->
          <div v-else-if="inputForm.targetTransfer == 'F'">
            1. Giấy thông báo chi phí <br />
            2. Giấy tờ tùy thân của người chuyển<br />
          </div>
          <!-- Chuyển tiền cho người thừa kế ở nước ngoài -->
          <div v-else-if="inputForm.targetTransfer == 'G'">
            1. Văn bản về việc phân chia thừa kế/Di chúc <br />
            2. Giấy tờ chứng minh người hưởng thừa kế ở nước ngoài<br />
            3. Giấy tờ tùy thân của người chuyển<br />
          </div>
          <!-- Định cư ở nước ngoài -->
          <div v-else-if="inputForm.targetTransfer == 'H'">
            1. Văn bản/Giấy tờ chứng minh được phép định cư nước ngoài <br />
            2. Hộ chiếu người định cư<br />
          </div>
        </div>
      </div>
      <el-button type="primary" @click="submitForm(formRef)" style="float: right">Tiếp tục</el-button>

      <br />
      <br />
    </el-form>
  </div>

  <!-- <div v-else-if="active == 1">buoc 2</div> -->
  <!-- dđ: {{ $n(100.20, "currencyNoCents" }} -->
  <div style="margin-top: 12px; float: right">
    <!-- <el-button type="primary" :disabled="active == 0" @click="backMethod()"
        >Quay lại</el-button
      > -->
  </div>
  <br />
  <br />
  <!-- </div> -->
</template>

<script lang="ts" setup>
import router from "@/router";
import { useRoute } from "vue-router";
import http from "@/http-common";
import httpbe from "@/http-be";
import { reactive, ref, onMounted, watch, toRefs, vModelRadio } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
// import CurrencyInput from './CurrencyInput.vue'
import ElCurrencyInput from './ElCurrencyInput.vue'
import { assertStaticBlock } from "@babel/types";
// const active = ref(0);
// const nextMethod = () => {
//   if (active.value++ > 1) {
//     active.value = 1;
//   }
// };
// const backMethod = () => {
//   if (active.value-- < 1) {
//     active.value = 0;
//   }
// };

const formRef = ref<FormInstance>();

const inputForm = reactive({
  bankType: "pvcb",
  code: "",
  money: Number(),
  accountNumber: "",
  targetTransfer: "A",
  objectTransfer: 'nome',
  moneyType: "",
  balance: Number(),
  rate: Number(),
  rateUSD: Number(23235),
  internalFees: "sendType",
  externalFees: "recieveType",
  moneyShow: Number(),
  moneyPay: Number(),
  moneyTypeChoose: "USD"
});
const targetTransferList = [
  {
    value: "A",
    moneyMax: 1000000,
    label: "Học tập ở nước ngoài",
  },
  {
    value: "B",
    moneyMax: 10000,
    label: "Chữa bệnh ở nước ngoài",
  },
  {
    value: "C",
    moneyMax: 10000,
    label: "Trợ cấp nhân thân ở nước ngoài",
  },
  {
    value: "D",
    moneyMax: 50,
    label: "Du lịch",
  },
  {
    value: "E",
    moneyMax: 10000,
    label: "Đi công tác",
  },
  {
    value: "F",
    moneyMax: 10000,
    label: "Trả lệ phí cho nước ngoài",
  },
  {
    value: "G",
    moneyMax: 10000,
    label: "Chuyển tiền cho người thừa kế ở nước ngoài",
  },
  {
    value: "H",
    moneyMax: 10000,
    label: "Định cư ở nước ngoài",
  },
];
const accountNumberList = ref([{
  value: "",
  label: "",
}]);

const rulesData = reactive<FormRules>({
  bankType: [{ required: true, message: "Thông tin không được để trống" }],
  money: [
    { required: true, message: "Thông tin không được để trống" },
    // { type: "number", message: "Vui lòng nhập số" },
  ],
  accountNumber: [{ required: true, message: "Thông tin không được để trống" }],
  targetTransfer: [
    { required: true, message: "Thông tin không được để trống" },
  ],
  moneyType: [{ required: true, message: "Thông tin không được để trống" }],
  internalFees: [{ required: true, message: "Thông tin không được để trống" }],
  externalFees: [{ required: true, message: "Thông tin không được để trống" }],
  objectTransfer: [
    { required: true, message: "Thông tin không được để trống" },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      checkBeforceInput();
      router.push({
        name: "infoMainName",
        params: { targetTransferSelect: inputForm.targetTransfer, objectTransferSelect: inputForm.objectTransfer }
      });
      // httpbe.post("/fund-transfer/initial", inputForm).then((resp) => {
      //   console.log("vao roi: " + resp.data.message)
      //   router.push({
      //     name: "infoMainName",
      //     params: { targetTransferSelect: inputForm.targetTransfer, objectTransferSelect: inputForm.objectTransfer }
      //   });
      // }).catch(err => {
      //   alert(err.data.message)
      //   throw null;
      //   //     ElMessage.error({
      //   //   message: err.response,
      //   // });
      // })
    }
  });
};
watch(inputForm, () => {
  if (inputForm.moneyType != '' && inputForm.internalFees != '' && inputForm.externalFees != '' && inputForm.money > 0) {
    let percentPVCB = 0.0015
    let moneyInput = inputForm.money
    let rateInput = inputForm.rate
    let rateUSBInput = inputForm.rateUSD
    let moneyTypeSelect = inputForm.moneyType;
    let minUSD = 10 * rateUSBInput;
    let maxUSD = 300 * rateUSBInput;

    let feesPVCB = moneyInput * percentPVCB * rateInput
    // let feesPVCBFinal = feesPVCB < minUSD ? minUSD : feesPVCB > maxUSD ? maxUSD : feesPVCB;
    let feesPVCBFinal = feesPVCB < minUSD ? minUSD : feesPVCB;
    let feesElectricFinal = 5 * rateUSBInput;

    if (inputForm.internalFees == "sendType" && inputForm.externalFees == "sendType") {
      if (moneyTypeSelect == 'USD') {
        let feesExternalFinal = 20 * rateInput;
        let feesTotal = feesPVCBFinal + feesExternalFinal + feesElectricFinal;
        inputForm.moneyShow = feesTotal;
        inputForm.moneyPay = moneyInput * rateInput + feesTotal;
      }
      else if (moneyTypeSelect == 'EUR') {
        let feesExternalFinal = 25 * rateInput;
        let feesTotal = feesPVCBFinal + feesExternalFinal + feesElectricFinal;
        inputForm.moneyShow = feesTotal;
        inputForm.moneyPay = moneyInput * rateInput + feesTotal;
      }
      else if (moneyTypeSelect == 'JPY1') {
        let feesExternal = 0.0005 * moneyInput;
        let feesExternalFinal = (feesExternal < 3000 ? 3000 : feesExternal) * rateInput;
        let feesTotal = feesPVCBFinal + feesExternalFinal + feesElectricFinal;
        inputForm.moneyShow = feesTotal;
        inputForm.moneyPay = moneyInput * rateInput + feesTotal;
      }
      else if (moneyTypeSelect == 'JPY2') {
        let feesExternal = 0.001 * moneyInput;
        let feesExternalFinal = (feesExternal < 8000 ? 8000 : feesExternal) * rateInput;
        let feesTotal = feesPVCBFinal + feesExternalFinal + feesElectricFinal;
        inputForm.moneyShow = feesTotal;
        inputForm.moneyPay = moneyInput * rateInput + feesTotal;
      }
      else if (moneyTypeSelect == 'SGD1') {
        let feesExternalFinal = 20 * rateInput;
        let feesTotal = feesPVCBFinal + feesExternalFinal + feesElectricFinal;
        inputForm.moneyShow = feesTotal;
        inputForm.moneyPay = moneyInput * rateInput + feesTotal;
      }
      else if (moneyTypeSelect == 'SGD2') {
        let feesExternal = 0.0015 * moneyInput;
        let feesExternalFinal = (feesExternal < 20 ? 20 : feesExternal > 120 ? 120 : feesExternal) * rateInput;
        let feesTotal = feesPVCBFinal + feesExternalFinal + feesElectricFinal;
        inputForm.moneyShow = feesTotal;
        inputForm.moneyPay = moneyInput * rateInput + feesTotal;
      }
      else if (moneyTypeSelect == 'AUD') {
        let feesExternal = (0.002 * moneyInput) * rateInput + 30 * rateUSBInput;
        let feesExternalFinal = feesExternal < 40 * rateUSBInput ? 40 * rateUSBInput : feesExternal > 250 * rateUSBInput ? 250 * rateUSBInput : feesExternal;
        let feesTotal = feesPVCBFinal + feesExternalFinal + feesElectricFinal;
        inputForm.moneyShow = feesTotal;
        inputForm.moneyPay = moneyInput * rateInput + feesTotal;
      }
      else if (moneyTypeSelect == 'GPD') {
        let feesExternal = (0.002 * moneyInput) * rateInput + 30 * rateUSBInput;
        let feesExternalFinal = feesExternal < 40 * rateUSBInput ? 40 * rateUSBInput : feesExternal > 250 * rateUSBInput ? 250 * rateUSBInput : feesExternal;
        let feesTotal = feesPVCBFinal + feesExternalFinal + feesElectricFinal;
        inputForm.moneyShow = feesTotal;
        inputForm.moneyPay = moneyInput * rateInput + feesTotal;
      }
    }
    else if (inputForm.internalFees == "recieveType" && inputForm.externalFees == "recieveType") {
      let feesTotal = feesPVCBFinal + feesElectricFinal;
      inputForm.moneyShow = feesTotal;
      inputForm.moneyPay = moneyInput * rateInput;
    } else if (inputForm.internalFees == "sendType" && inputForm.externalFees == "recieveType") {
      let feesTotal = feesPVCBFinal + feesElectricFinal;
      inputForm.moneyShow = feesTotal;
      inputForm.moneyPay = moneyInput * rateInput + feesTotal;
    }
  }
});

const checkBeforceInput = () => {
  let check = inputForm.moneyPay > Number(inputForm.balance);
  if (check) {
    ElMessage({
      message: "Số dư khả dụng không đủ",
      type: "error",
    });
    throw null;
  }
  if (inputForm.moneyPay < inputForm.moneyShow) {
    ElMessage.error(
      "Tổng tiền cần thanh toán không thể nhỏ hơn chi phí",
    );
    throw null;
  }
  if (inputForm.targetTransfer == 'D') {
    let moneyMaxSelect = targetTransferList.filter(x => x.value == 'D')[0].moneyMax;
    let moneyTransferMax = moneyMaxSelect * inputForm.rateUSD;
    if (inputForm.moneyPay > moneyTransferMax) {
      ElMessage({
        message:
          "Hạn mức cho mục đích chuyển tiền này tối đa không quá " +
          formatterCurrency.format(moneyTransferMax),
        type: "error",
      });
      throw null;
    }
  }

};

// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.resetFields();
// };

const moneyTypeList = ref(
  [
    {
      name: "USD",
      label: "USD",
      value: 23235,
    },
    {
      name: "EUR",
      label: "EUR",
      value: 24440,
    },
    {
      label: "JPY(NH Mizuho)",
      name: "JPY1",
      value: 172,
    },
    {
      label: "JPY",
      name: "JPY2",
      value: 172,
    },
    {
      label: "SGD(Ngân hàng ở Singapore)",
      name: "SGD1",
      value: 16756,
    },
    {
      label: "SGD(Ngân hàng không ở Singapore)",
      name: "SGD2",
      value: 16756,
    },
    {
      name: "GBD",
      label: "GBD",
      value: 28422,
    },
    {
      name: "AUD",
      label: "AUD",
      value: 16230,
    },
  ],
);


// const getMoneyTypeMethod = () => {
//   http.get("/exchange-rate").then((resp) => {
//     moneyTypeList.foo = resp.data;
//   });
// };

const changeMoneyTypeMethod = () => {
  if (inputForm.moneyType != "") {
    let moneyTypeSelect = moneyTypeList.value.filter(x => x.name == inputForm.moneyType)[0]
    inputForm.rate = moneyTypeSelect.value;
  }
  if (inputForm.moneyType == 'USD') {
    inputForm.moneyTypeChoose = 'USD'
  } else if (inputForm.moneyType == 'EUR') {
    inputForm.moneyTypeChoose = 'EUR'
  } else if (inputForm.moneyType == 'JPY1' || inputForm.moneyType == 'JPY2') {
    inputForm.moneyTypeChoose = 'JPY'
  } else if (inputForm.moneyType == 'SGD1' || inputForm.moneyType == 'SGD2') {
    inputForm.moneyTypeChoose = 'SGD'
  } else if (inputForm.moneyType == 'GBD') {
    inputForm.moneyTypeChoose = 'GBD'
  } else if (inputForm.moneyType == 'AUD') {
    inputForm.moneyTypeChoose = 'AUD'
  }
};
const changeAccountNumberMethod = () => {
  let balanceSelect = accountNumberList.value.filter(x => x.label == inputForm.accountNumber)[0].value;
  inputForm.balance = Number(balanceSelect);
};

const formatterCurrency = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});

// const formatCurrency = (value: any) => {
//   let val = (value / 1).toFixed(0).replace(".", ",");
//   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

// const route = useRoute();
// const dataTran = () => {

// alert(data);
// };
const getAccountsMethod = () => {
  http.get("/accounts").then((resp) => {
    let accountList = accountNumberList.value = resp.data;
    inputForm.accountNumber = accountList[0].label;
    changeAccountNumberMethod()
  });
};
var myList = [
  {
    value: Number(),
    label: '',
    name: ''
  }
];

// const mylll = ref()
const mylll = ref([{
  name: "",
  label: "",
}])

// function getExchangeRateIntial() {
//   httpbe.get("/exchange-rate").then((resp) => {
//     mylll.value = resp.data.payload[0];
//     mylll.value = resp.data.payload;
//   });
// }



onMounted(() => {
  // getExchangeRateIntial()
  getAccountsMethod();

});
</script>

<style lang="scss" scope>
</style>