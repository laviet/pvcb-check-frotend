<template>
    <el-dialog v-model="dialogVisible" title="Sửa cấu hình đối tác" width="700px" :before-close="closeMethod"
        :close-on-click-modal="false">
        <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
            label-position="left" style="margin-bottom: -30px;">
            <el-form-item label="Chọn mục đích">
                <el-select v-model="inputForm.target" multiple style="width: 100%" placeholder="Chọn">
                    <el-option label="A" value="a" />
                    <el-option label="B" value="b" />
                    <el-option label="C" value="c" />
                </el-select>
            </el-form-item>
            <el-form-item label="Chọn phí">
                <el-select v-model="inputForm.target1" multiple style="width: 100%" placeholder="Chọn">
                    <el-option label="D" value="a" />
                    <el-option label="E" value="b" />
                    <el-option label="F" value="c" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="closeMethod()">Hủy</el-button>
                <!-- <el-button type="primary" :loading="loaddingButton" @click="submitForm()">Lưu</el-button> -->
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
    target: "",
    target1: "",
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
            httpbe.put(`/partner`, inputForm.value).then((resp) => {
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