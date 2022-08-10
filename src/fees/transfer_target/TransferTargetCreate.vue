<template>
    <el-dialog v-model="dialogVisible" title="Tạo mục đích chuyển tiền" width="700px" :before-close="closeMethod"
        :close-on-click-modal="false" top="4vh">
        <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="160px" class="demo-ruleForm"
            label-position="left" style="margin-bottom: -30px;">
            <el-form-item label="Tên mục đích" prop="name">
                <el-input v-model="inputForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Trạng thái" prop="status">
                <el-radio-group v-model="inputForm.status">
                    <el-radio label="ACTIVE">Kích hoạt</el-radio>
                    <el-radio label="INACTIVE">Bỏ kích hoạt</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Đối tượng áp dụng" prop="objectApply">
                <el-radio-group v-model="inputForm.objectApply">
                    <el-radio label="all">Tất cả</el-radio>
                    <el-radio label="customer">Khách hàng</el-radio>
                    <el-radio label="customerGroup">Nhóm khách hàng</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Đối tượng chuyển tiền" prop="objectTransfer">
                <el-radio-group v-model="inputForm.objectTransfer">
                    <el-radio label="me">Bản thân</el-radio>
                    <el-radio label="noMe">Người thân (Người ủy quyền)</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Hồ sơ (Bản thân)" prop="noteMe">
                <el-input type="textarea" rows="4" v-model="inputForm.noteMe"></el-input>
            </el-form-item>
            <el-form-item label="Hồ sơ (Người thân)" prop="noteNoMe">
                <el-input type="textarea" rows="4" v-model="inputForm.noteNoMe"></el-input>
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
const formRef = ref<FormInstance>();
const emit = defineEmits(['closeDialog'])
const dialogVisible = ref(false);
const loaddingButton = ref(false);
const createOther = ref(false);

const inputForm = reactive({
    name: "",
    status: "ACTIVE",
    objectApply: "",
    objectTransfer: "",
    noteMe: "",
    noteNoMe: "",
})
const rulesData = reactive<FormRules>({
    name: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    status: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    objectApply: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    objectTransfer: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }]
})
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
function submitForm() {
    let formEl = formRef.value;
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            loaddingButton.value = true;
            httpbe.post(`/transfer-target`, inputForm).then((resp) => {
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
function initialMethod() {
    dialogVisible.value = true;
}

defineExpose({
    initialMethod,
});

</script>