<template>
    <el-dialog v-model="dialogVisible" title="Sửa hạn mức" width="700px" :before-close="closeMethod"
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

const inputForm = ref({
    id: "",
    name: "",
    type: "",
    money: "",
    moneyMin: "",
    moneyMax: "",
})
const rulesData = reactive<FormRules>({
    name: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }]
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
function submitForm() {
    let formEl = formRef.value;
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            loaddingButton.value = true;
            httpbe.put(`/transfer-limit`, inputForm.value).then((resp) => {
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
function initialMethod(row: any) {
    dialogVisible.value = true;
    inputForm.value = row;
}

defineExpose({
    initialMethod,
});

</script>