<template>
    <el-page-header content="Chi tiết" @back="goBackMethod()" />
    <el-row :gutter="20">
        <el-col :span="24">
            <h3 style="text-align: center;">THÔNG TIN HẬU KIỂM <span style="float: right; font-size: 12px;">
                    <el-button size="small" type="text" @click="downloadFileMethod()"><u>Download
                            toàn bộ hồ sơ</u></el-button>
                </span></h3>
            <div style="text-align: center;">
                <el-radio-group v-model="radioModel" style="margin-bottom: 20px;">
                    <el-radio-button label="a">HỒ SƠ CHUYỂN TIỀN</el-radio-button>
                    <el-radio-button label="b">HỢP ĐỒNG CHUYỂN TIỀN</el-radio-button>
                </el-radio-group>
            </div>
        </el-col>
    </el-row>
    <span v-if="radioModel == 'a'">
        <el-row :gutter="20">
            <el-col :span="15">
                <h4>Thông tin file</h4>
                <div>
                    <!-- <el-upload v-model:file-list="fileList"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload> -->
                </div>
                <br />
                <h4>Thông tin chi tiết</h4>
                <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
                    label-position="top">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Nguồn tiền thanh toán" prop="bankType">
                                <span>Tài khoản thanh toán PVcomBank</span>
                            </el-form-item>
                            <el-form-item label="Mã chuyển tiền" prop="code">
                                <div>{{ inputForm.code }}</div>
                            </el-form-item>
                            <el-form-item label="Số tiền muốn chuyển" prop="money">
                                <span>{{ inputForm.money }}</span>
                            </el-form-item>
                            <el-form-item label="Số tài khoản" prop="accountNumber">
                                <span>{{ inputForm.accountNumber }}</span>
                            </el-form-item>
                            <el-form-item label="Chi phí trong nước tính vào" prop="internalFees">
                                <el-select style="width: 100%" :disabled="true" v-model="inputForm.internalFees">
                                    <el-option label="Chúng tôi" value="sendType" />
                                    <el-option label="Người thụ hưởng" value="recieveType"
                                        :disabled="inputForm.externalFees == 'sendType'" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Tổng chi phí quy đổi" prop="moneyShow">
                                <span>{{ formatterCurrency.format(inputForm.moneyShow) }}</span>
                            </el-form-item>
                            <el-form-item v-if="inputForm.targetTransfer == 'A' || inputForm.targetTransfer == 'B'"
                                label="Đối tượng chuyển tiền" prop="objectTransfer">
                                <span v-if="inputForm.objectTransfer == 'me'">Bản thân</span>
                                <span v-else>Người thân</span>
                            </el-form-item>
                        </el-col>

                        <!-- column 2 -->
                        <el-col :span="12">
                            <el-form-item label="Mục đích chuyển tiền" prop="targetTransfer">
                                <span>{{ inputForm.targetTransferLabel }}</span>
                            </el-form-item>
                            <el-form-item label="Loại tiền tệ" prop="moneyType">
                                <span>{{ inputForm.moneyType }}</span>
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
                                <el-select :disabled="true" v-model="inputForm.externalFees" style="width: 100%">
                                    <el-option label="Chúng tôi" value="sendType" />
                                    <el-option label="Người thụ hưởng" value="recieveType" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Tổng tiền cần thanh toán" prop="moneyShow">
                                <!-- <el-input v-model.number="inputForm.moneyPay" readonly autocomplete="off">
              <template #append>VND</template>
            </el-input> -->
                                <!-- <ElCurrencyInput v-model="inputForm.moneyPay" :options="{ currency: 'VND', locale: 'de-DE' }" /> -->
                                <span style="font-weight: bold; color: red">{{
                                        formatterCurrency.format(inputForm.moneyPay)
                                }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

            </el-col>
            <el-col :span="9">
                <div style="text-align: center; font-weight: bold">Dành cho nhân viên hậu kiểm</div>
                <el-radio-group v-model="inputForm1.check" class="ml-4">
                    <el-radio label="1">Đúng, chính xác, hợp lệ</el-radio>
                    <el-radio label="2">Không đúng, không hợp lệ, chưa chính xác</el-radio>
                </el-radio-group>
                <h4>1. Kiểm tra định dạng các hồ sơ</h4>
                <div>
                    <el-switch v-model="inputForm1.hasStatus1" /> &nbsp;
                    <span>HS chứng minh học phí</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.hasStatus2" /> &nbsp;
                    <span>HS chứng minh sinh hoạt phí</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.hasStatus3" /> &nbsp;
                    <span>Hộ chiếu (Passport)</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.hasStatus4" /> &nbsp;
                    <span>Thị thực (Visa)</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.hasStatus5" /> &nbsp;
                    <span>Chứng minh nhân thân</span>
                </div>
                <br />
                <el-input v-model="inputForm1.note1" placeholder="Ghi chú"></el-input>
                <h4>2. Kiểm tra thông tin quan trọng của các hồ sơ</h4>
                <div>
                    <el-switch v-model="inputForm1.checkStatus1" /> &nbsp;
                    <span>HS chứng minh học phí đúng thời gian thực tế không?</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.checkStatus2" /> &nbsp;
                    <span>Hộ chiếu còn hiệu lực không?</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.checkStatus3" /> &nbsp;
                    <span>Thị thực còn hiệu lực không?</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.checkStatus4" /> &nbsp;
                    <span>Quốc gia trên HS học phí và trên thị thực có khớp nhau không?</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.checkStatus5" /> &nbsp;
                    <span>HS Chứng minh nhân thân có khớp với Hộ chiếu, thị thực không?</span>
                </div>
                <br />
                <el-input v-model="inputForm1.note2" placeholder="Ghi chú"></el-input>
            </el-col>
        </el-row>
        <br />
        <el-input v-model="inputForm1.rejectReason" autosize type="textarea" placeholder="Lý do từ chối">
        </el-input>
        <br />
        <br />
        <div style="text-align: center;" v-if="inputForm.status == 'APPROVE_WAIT'">
            <el-button type="primary" @click="approvedProfileMethod()" :loading="loaddingApprovedButton">DUYỆT HỒ SƠ
            </el-button>
            <el-button type="warning" @click="rejectProfileMethod()" :loading="loaddingRejectButton">TỪ CHỐI HỒ SƠ
            </el-button>
        </div>
    </span>
    <span v-if="radioModel == 'b'">hợp đồng chuyển tiền</span>
    <br />
    <br />
    <br />
    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>
<script lang="ts" setup>
import router from "@/router";
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { FormInstance, FormRules, UploadProps, UploadUserFile } from "element-plus";
import { ElMessage, ElMessageBox } from 'element-plus'
import httpbe from "@/http-be";
const route = useRoute();

const id = route.params.id;
const radioModel = ref('a')
const loaddingApprovedButton = ref(false)
const loaddingRejectButton = ref(false)
const fileList = ref<UploadUserFile[]>([
    {
        name: 'abc.pdf',
        url: '@/assets/file/abc.pdf',
    },
    {
        name: 'Capture.PNG',
        url: '@/assets/file/Capture.PNG',
    },
    {
        name: 'Capture1.PNG',
        url: 'https://recmiennam.com/wp-content/uploads/2018/04/hinh-anh-dep-ve-bien-4.jpg',
    }
])
const inputForm = ref({
    id: "",
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
    moneyTypeChoose: "USD",
    targetTransferLabel: "",
    status: '',
    idLockAmount: ""
});
const inputForm1 = reactive({
    check: "",
    rejectReason: "",
    note1: "",
    note2: "",
    hasStatus1: false,
    hasStatus2: false,
    hasStatus3: false,
    hasStatus4: false,
    hasStatus5: false,
    checkStatus1: false,
    checkStatus2: false,
    checkStatus3: false,
    checkStatus4: false,
    checkStatus5: false

})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}

const formatterCurrency = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
});
const rulesData = reactive<FormRules>({
    check: [{ required: true, message: "Thông tin không được để trống" }]
})
function downloadFileMethod() {
    alert("download")
}
function goBackMethod() {
    router.push({
        name: "listCheckName",
    });
}
function approvedProfileMethod() {
    loaddingApprovedButton.value = true
    ElMessageBox.confirm(
        "Bạn có chắc chắn muốn duyệt hồ sơ", "Thông báo",
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Hủy',
            type: 'warning',
        }
    )
        .then(() => {
            approvedMethod('APPROVED')
            unlockAmountMethod()
            ElMessage({
                type: 'success',
                message: "Duyệt hồ sơ thành công",
            })
        }).finally(() => {
            setTimeout(() => {
                loaddingApprovedButton.value = false
            }, 300);
        })
}
function rejectProfileMethod() {
    loaddingRejectButton.value = true
    ElMessageBox.confirm(
        "Bạn có chắc chắn muốn từ chối hồ sơ", "Thông báo",
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Hủy',
            type: 'warning',
        }
    )
        .then(() => {
            approvedMethod('REJECT')
            unlockAmountMethod()
            ElMessage({
                type: 'success',
                message: "Từ chối hồ sơ thành công",
            })
        }).finally(() => {
            setTimeout(() => {
                loaddingRejectButton.value = false
            }, 300);
        })
}
function approvedMethod(status: string) {
    let id = inputForm.value.id;
    httpbe.put(`/check/approved/${id}?status=${status}`).then((resp) => {
        console.log(resp.data.payload)
        getDataInitial()
    });
}
function unlockAmountMethod() {
    let id = inputForm.value.idLockAmount;
    if (id != null) {
        httpbe.post(`/account/unlock-money?id=${id}`).then((resp) => {
            console.log(resp.data.payload)
        });
    }
}


function getDataInitial() {
    let id1 = id;
    httpbe.get(`/check/detail/${id1}`).then((resp) => {
        inputForm.value = resp.data.payload
    });
}
function fetchData() {
    getDataInitial()
}
onMounted(() => {
    fetchData()
});
</script>
<style lang="scss" scoped>
:deep(.el-radio-button__inner) {
    padding: 10px 150px;
}
</style>