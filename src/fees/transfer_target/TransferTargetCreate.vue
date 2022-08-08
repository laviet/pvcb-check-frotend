<template>
    <el-dialog v-model="dialogVisible" title="Tạo mục đích chuyển tiền" width="700px" :before-close="closeMethod"
        :close-on-click-modal="false" vh>
        <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
            label-position="left">
            <el-form-item label="Tên mục đích" prop="value">
                <el-input v-model="inputForm.value"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeMethod()">Hủy</el-button>
                <el-button type="primary" @click="submitForm()">OK</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch, toRefs, defineExpose, defineEmits, inject, defineProps } from "vue";
import type { FormInstance, FormRules } from "element-plus";
const dialogVisible = ref(false);
const emit = defineEmits(['closeDialog'])
const inputForm = reactive({
    value: "",
    objectApply: "",
    objectTransfer: "",
    noteMe: "",
    noteNoMe: ""
})
const rulesData = reactive<FormRules>({
    value: [{ required: true, message: "Thông tin không được để trống" }]
})
const props = defineProps({
    mydata: {
        type: String,
        default: () => "abc",
    },
    mydata1: {
        type: Boolean,
        default: () => false,
    }
})
// const handleClose = (done: () => void) => {
//      dialogVisible.value = true;
// }
function initialMethod() {
    dialogVisible.value = true;
    const userLocation = props.mydata1
}
function submitForm() {
    alert("submit")
}
function closeMethod() {
    dialogVisible.value = false;
    emit('closeDialog', "la viet")
}

defineExpose({
    initialMethod,
});

</script>