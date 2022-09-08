<template>
    <el-dialog v-model="dialogVisible" title="Sửa phí" width="700px" :before-close="closeMethod"
        :close-on-click-modal="false" top="5vh">
        <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
            label-position="left">
            <el-form-item label="Loại tiền tệ" prop="currencyId">
                <el-select v-model="inputForm.currencyId" @change="changeCurrencyMethod(true)"
                    placeholder="Chọn loại tiền tệ" style="width: 100%">
                    <el-option v-for="item in currencyTypeBriefList" :key="item.id" :value="item.id" :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Chọn biểu phí" prop="scheduleId">
                <el-select v-model="inputForm.scheduleId" placeholder="Chọn biểu phí" style="width: 100%">
                    <el-option v-for="item in scheduleBriefList" :key="item.id" :value="item.id"
                        :label="item.code + ' - ' + item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Tên phí" prop="name">
                <el-input v-model="inputForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Trạng thái" prop="status">
                <el-radio-group v-model="inputForm.status">
                    <el-radio label="ACTIVE">Kích hoạt</el-radio>
                    <el-radio label="INACTIVE">Bỏ kích hoạt</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Phí PVcomBank" prop="pvComType">
                <el-radio-group v-model="inputForm.pvComType">
                    <el-radio label="TYPE_FIXED">Theo số tiền cố định</el-radio>
                    <el-radio label="TYPE_PERCENT">Theo phần trăm </el-radio>
                    <el-radio label="TYPE_MIXED">Hỗn hợp cả hai</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Phí NH nước ngoài" prop="moneyType">
                <el-radio-group v-model="inputForm.moneyType">
                    <el-radio label="TYPE_FIXED">Theo số tiền cố định</el-radio>
                    <el-radio label="TYPE_PERCENT">Theo phần trăm </el-radio>
                    <el-radio label="TYPE_MIXED">Hỗn hợp cả hai</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Điện phí" prop="electricType">
                <el-radio-group v-model="inputForm.electricType">
                    <el-radio label="TYPE_FIXED">Theo số tiền cố định</el-radio>
                    <el-radio label="TYPE_PERCENT">Theo phần trăm </el-radio>
                    <el-radio label="TYPE_MIXED">Hỗn hợp cả hai</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="closeMethod()">Hủy</el-button>
                <el-button type="primary" :loading="loaddingButton" @click="submitForm()">Lưu</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch, toRefs, defineExpose, defineEmits } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import httpbe from "@/http-fees";
const formRef = ref<FormInstance>();
const emit = defineEmits(['closeDialog'])
const dialogVisible = ref(false);
const loaddingButton = ref(false);
const currencyTypeBriefList = ref<NameObject[]>([])
const scheduleBriefList = ref<NameCodeObject[]>([])
const currencySelect = ref()
interface NameObject {
    id: "",
    name: "",
}
interface NameCodeObject {
    id: "",
    name: "",
    code: "",
}

const inputForm = ref({
    id: String(),
    currencyId: String(),
    scheduleId: String(),
    name: String(),
    status: String(),

    pvComType: "",
    moneyType: "",
    electricType: "",
})
const rulesData = reactive<FormRules>({
    name: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    status: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    currencyId: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    scheduleId: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    pvComType: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    moneyType: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    electricType: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
})
function closeMethod() {
    dialogVisible.value = false;
    emit('closeDialog')
    setTimeout(() => {
        resetForm()
    }, 300);

}
function resetForm() {
    let formEl = formRef.value;
    if (!formEl) return
    formEl.resetFields()
}
function changeCurrencyMethod(reset: boolean) {
    if (reset) {
        inputForm.value.scheduleId = ""
    }
    httpbe.get(`/fee-schedule/currency/${inputForm.value.currencyId}`).then((resp) => {
        scheduleBriefList.value = resp.data.payload;
    })
}
function submitForm() {
    let formEl = formRef.value;
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            loaddingButton.value = true;
            httpbe.put(`/fee-config`, inputForm.value).then((resp) => {
                ElMessage.success(
                    resp.data.message,
                );
                setTimeout(() => {
                    closeMethod()
                }, 500);
            }).catch(err => {
                ElMessage.error(
                    err.data.message,
                );
            }).finally(() => {
                setTimeout(() => {
                    loaddingButton.value = false;
                }, 500);
            })
        }
    });

}
function getCurrencyTypeBriefList() {
    httpbe.get(`/currency-type/other`).then((resp) => {
        currencyTypeBriefList.value = resp.data.payload;
        changeCurrencyMethod(false)
    })
}
function initialMethod(row: any) {
    dialogVisible.value = true;
    getCurrencyTypeBriefList()
    inputForm.value = row;
    inputForm.value.currencyId = row.currencyType.id
    inputForm.value.scheduleId = row.feeSchedule.id
}

defineExpose({
    initialMethod,
});

</script>