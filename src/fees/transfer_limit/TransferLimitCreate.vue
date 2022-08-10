<template>
    <el-dialog v-model="dialogVisible" title="Tạo hạn mức" width="700px" :before-close="closeMethod"
        :close-on-click-modal="false">
        <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
            label-position="left" style="margin-bottom: -30px;">
            <el-form-item label="Tên hạn mức" prop="name">
                <el-input v-model="inputForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Loại hạn mức" prop="type">
                <el-radio-group v-model="inputForm.type">
                    <el-radio label="unit">Lần chuyển</el-radio>
                    <el-radio label="people">Người chuyển</el-radio>
                    <el-radio label="time">Thời gian</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Hạn mức" prop="money">
                <el-input type="number" v-model="inputForm.money">
                </el-input>
                <!-- <ElCurrencyInput v-model="inputForm.money" :options="formatCurrencyInputVND()" /> -->
            </el-form-item>
            <el-form-item label="Tối thiểu/lần" prop="moneyMin">
                <el-input type="number" v-model="inputForm.moneyMin">
                </el-input>
                <!-- <ElCurrencyInput v-model="inputForm.moneyMin" :options="formatCurrencyInputVND()" /> -->
            </el-form-item>
            <el-form-item label="Tối đa/lần" prop="moneyMax">
                <el-input type="number" v-model="inputForm.moneyMax">
                </el-input>
                <!-- <ElCurrencyInput v-model="inputForm.moneyMax" :options="formatCurrencyInputVND()" /> -->
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-checkbox v-model="createOther" label="Tạo thêm" style="margin-right: 15px" />
                <el-button type="warning" @click="resetForm()">Reset</el-button>
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
import ElCurrencyInput from '@/eway/ElCurrencyInput.vue'
import { formatCurrencyInputVND } from "@/functionCommon/CommonFun"
const formRef = ref<FormInstance>();
const emit = defineEmits(['closeDialog'])
const dialogVisible = ref(false);
const loaddingButton = ref(false);
const createOther = ref(false);

const inputForm = reactive({
    id: "",
    name: "",
    type: "",
    money: Number,
    moneyMin: Number,
    moneyMax: Number,
})
function aaa(){
    alert("gg")
}
// function formatNumber (num: string) {
//     return parseFloat(num).toFixed(2)
//   }
// function restrictDecimal() {
//     inputForm.money = inputForm.money.match(/^\d+\.?\d{0,2}/);
// }
const rulesData = reactive<FormRules>({
    name: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    type: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }]
})
const formatterCurrency = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
});
function closeMethod() {
    dialogVisible.value = false;
    emit('closeDialog')
    setTimeout(() => {
        createOther.value = false;
        resetForm()
    }, 300);

}
function resetForm() {
    let formEl = formRef.value;
    if (!formEl) return
    formEl.resetFields()
}
function initialMethod() {
    dialogVisible.value = true;
}
function submitForm() {
    let formEl = formRef.value;
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            loaddingButton.value = true;
            httpbe.post(`/transfer-limit`, inputForm).then((resp) => {
                ElMessage.success(
                    resp.data.message,
                );
                if (createOther.value) {
                    setTimeout(() => {
                        resetForm();
                    }, 500);
                } else {
                    setTimeout(() => {
                        closeMethod()
                    }, 500);
                }
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

defineExpose({
    initialMethod,
});

</script>