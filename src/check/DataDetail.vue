<template>
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
    <span v-if="radioModel=='a'">
    <el-row :gutter="20">
        <el-col :span="15">
        </el-col>
        <el-col :span="9">
            <div style="text-align: center; font-weight: bold">Dành cho nhân viên hậu kiểm</div>
            <el-radio-group v-model="inputForm.check" class="ml-4">
                <el-radio label="1">Đúng, chính xác, hợp lệ</el-radio>
                <el-radio label="2">Không đúng, không hợp lệ, chưa chính xác</el-radio>
            </el-radio-group>
            <h4>1. Kiểm tra định dạng các hồ sơ</h4>
            <div>
                <el-switch v-model="inputForm.hasStatus1" /> &nbsp;
                <span>HS chứng minh học phí</span>
            </div>
            <div>
                <el-switch v-model="inputForm.hasStatus2" /> &nbsp;
                <span>HS chứng minh sinh hoạt phí</span>
            </div>
            <div>
                <el-switch v-model="inputForm.hasStatus3" /> &nbsp;
                <span>Hộ chiếu (Passport)</span>
            </div>
            <div>
                <el-switch v-model="inputForm.hasStatus4" /> &nbsp;
                <span>Thị thực (Visa)</span>
            </div>
            <div>
                <el-switch v-model="inputForm.hasStatus5" /> &nbsp;
                <span>Chứng minh nhân thân</span>
            </div>
            <br />
            <div style="text-align: center">Ghi chú</div>
            <hr />
            <!-- this is two -->
            <h4>2. Kiểm tra thông tin quan trọng của các hồ sơ</h4>
            <div>
                <el-switch v-model="inputForm.checkStatus1" /> &nbsp;
                <span>HS chứng minh học phí đúng thời gian thực tế không?</span>
            </div>
            <div>
                <el-switch v-model="inputForm.checkStatus2" /> &nbsp;
                <span>Hộ chiếu còn hiệu lực không?</span>
            </div>
            <div>
                <el-switch v-model="inputForm.checkStatus3" /> &nbsp;
                <span>Thị thực còn hiệu lực không?</span>
            </div>
            <div>
                <el-switch v-model="inputForm.checkStatus4" /> &nbsp;
                <span>Quốc gia trên HS học phí và trên thị thực có khớp nhau không?</span>
            </div>
            <div>
                <el-switch v-model="inputForm.checkStatus5" /> &nbsp;
                <span>HS Chứng minh nhân thân có khớp với Hộ chiếu, thị thực không?</span>
            </div>
            <div style="text-align: center">Ghi chú</div>
            <hr />
        </el-col>
    </el-row>
    <br />
    <el-input v-model="inputForm.rejectReason" autosize type="textarea" placeholder="Lý do từ chối">
    </el-input>
    <br />
    <br />
    <div style="text-align: center;">
        <el-button type="primary" @click="approvedProfileMethod()" :loading="loaddingApprovedButton">DUYỆT HỒ SƠ
        </el-button>
        <el-button type="warning" @click="rejectProfileMethod()" :loading="loaddingRejectButton">TỪ CHỐI HỒ SƠ</el-button>
    </div>
    </span>
    <span v-if="radioModel=='b'">hợp đồng chuyển tiền</span>
    <br />
    <br />
    <br />
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage, ElMessageBox } from 'element-plus'
const route = useRoute();

const id = route.params.id;
const radioModel = ref('a')
const loaddingApprovedButton = ref(false)
const loaddingRejectButton = ref(false)
const inputForm = reactive({
    check: "",
    rejectReason: "",
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
const rulesData = reactive<FormRules>({
    check: [{ required: true, message: "Thông tin không được để trống" }]
});
function fetchData() {
    console.log("ff")
}
function downloadFileMethod() {
    alert("download")
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


onMounted(() => {
    fetchData()
});
</script>
<style lang="scss" scoped>
:deep(.el-radio-button__inner) {
    padding: 10px 150px;
}
</style>