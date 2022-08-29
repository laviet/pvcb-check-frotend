<template>
    <el-dialog v-model="dialogVisible" title="Sửa loại tiền" width="700px" :before-close="closeMethod"
        :close-on-click-modal="false">
        <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
            label-position="left">
            <el-form-item label="Loại tiền" prop="name">
                <el-input v-model="inputForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Đối tượng áp dụng" prop="objectApply">
                <el-radio-group v-model="inputForm.objectApply">
                    <el-radio label="all">Tất cả</el-radio>
                    <el-radio label="customer">Khách hàng</el-radio>
                    <el-radio label="customerGroup">Nhóm khách hàng</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Trạng thái" prop="status">
                <el-radio-group v-model="inputForm.status">
                    <el-radio label="ACTIVE">Kích hoạt</el-radio>
                    <el-radio label="INACTIVE">Bỏ kích hoạt</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Mô tả" prop="note">
                <el-input type="textarea" rows="5" v-model="inputForm.note"></el-input>
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
    objectApply: "",
    note: "",
    status: "",
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
            httpbe.put(`/currency-type`, inputForm.value).then((resp) => {
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