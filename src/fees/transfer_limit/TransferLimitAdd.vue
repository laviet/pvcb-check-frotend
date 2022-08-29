<template>
    <el-dialog v-model="dialogVisible" :title="'Thêm hạn mức &quot;' + dataTransfer.name + '&quot; cho mục đích'"
        width="800px" :before-close="closeMethod" :close-on-click-modal="false" top="5vh">
        <el-table :data="responseList" :header-cell-style="tableHeaderColor" :cell-style="tableHeaderColorTwo" border
            row-key="id" default-expand-all>
            <el-table-column prop="name" label="Tên nhóm mục đích" />
            <el-table-column type="expand">
                <template #default="scope">
                    <el-table :data="scope.row.transferTargetChildList" @selection-change="handleSelectionChange"
                        style="width: 100%" row-key="id" border lazy>
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="name" label="Tên mục đích" />
                        <el-table-column prop="transferLimit.name" label="Tên hạn mức hiện tại" />
                    </el-table>
                </template>
            </el-table-column>

        </el-table>
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
import { tableHeaderColor, tableHeaderColorTwo } from "@/functionCommon/CommonFun"
import { ElMessage } from "element-plus";
import httpbe from "@/http-fees";
const formRef = ref<FormInstance>();
const emit = defineEmits(['closeDialog'])
const dialogVisible = ref(false);
const loaddingButton = ref(false);

const responseList = ref([

])
const dataTransfer = ref({
    id: "",
    name: ""
})

const inputForm = ref({
    id: "",
    name: "",
    type: "",
    typeDetail: "",
    currencyTypeId: "USD",
    money: Number(),
    moneyMin: Number(),
    moneyMax: Number(),
})
interface NameObject {
    id: "",
    name: "",
}
const multipleSelection = ref<NameObject[]>([])

const handleSelectionChange = (val: any) => {
    multipleSelection.value = val
}
const currencyTypeList = ref([{
    id: "",
    name: "",
}])
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
function checkSelectMethod() {
    console.log(multipleSelection.value)
    if (multipleSelection.value.length == 0) {
        ElMessage.error(
            "Chưa chọn mục đích nào",
        );
        throw null;
    }
}
function submitForm() {
    checkSelectMethod()
    loaddingButton.value = true;
    let idTargetChildList = multipleSelection.value.map(x => x.id);
    httpbe.put(`/transfer-limit/add/${dataTransfer.value.id}?idTargetChildList=${idTargetChildList}`).then((resp) => {
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
function initialMethod(row: any) {
    dialogVisible.value = true;
    dataTransfer.value = row;
    getTransferTargetAddList()
}
function getTransferTargetAddList() {
    httpbe.get(`/transfer-target/add/limit`).then((resp) => {
        responseList.value = resp.data.payload;
    })
}

defineExpose({
    initialMethod,
});

</script>