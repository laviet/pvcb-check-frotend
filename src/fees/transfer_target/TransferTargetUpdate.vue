<template>
    <el-dialog v-model="dialogVisible" title="Sửa nhóm mục đích chuyển tiền" width="700px" :before-close="closeMethod"
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
        </el-form>
        <br />
        <div style="text-align: center">
            <el-button link type="primary" @click="addTransferTargetMethod()"><u>Thêm mục đích</u></el-button>
        </div>
        <el-table :data="inputForm.childList" border :cell-style="cellStyleMethod">
            <el-table-column prop="name" label="Tên mục đích" />
            <el-table-column label="Trạng thái" align="center" width="140px">
                <template #default="scope">
                    <span v-if="scope.row.status == 'ACTIVE'">Kích hoạt</span>
                    <span v-else-if="scope.row.status == 'INACTIVE'">Bỏ kích hoạt</span>
                </template>
            </el-table-column>
            <el-table-column label="Đối tượng áp dụng" align="center" width="180px">
                <template #default="scope">
                    <span v-if="scope.row.objectApply == 'all'">Tất cả</span>
                    <span v-else-if="scope.row.objectApply == 'customer'">Khách hàng</span>
                    <span v-else-if="scope.row.objectApply == 'customerGroup'">Nhóm khách hàng</span>
                </template>
            </el-table-column>
            <el-table-column label="Thao tác" fixed="right" width="140" align="center">
                <template #default="scope">
                    <el-button link type="danger" size="small" @click="deleteClick(scope.$index)">Xóa
                    </el-button>
                    <el-button link type="primary" size="small" @click="editClick(scope.$index, scope.row)">Sửa
                    </el-button>
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
    <TransferTargetChildCreate ref="childCreateRef" @closeDialog="dialogCloseCreateMethod" />
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch, toRefs, defineExpose, defineEmits } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import TransferTargetChildCreate from './TransferTargetChildCreate.vue'
import { ElMessage } from "element-plus";
import httpbe from "@/http-fees";
const formRef = ref<FormInstance>();
const emit = defineEmits(['closeDialog'])
const childCreateRef = ref()
const dialogVisible = ref(false);
const loaddingButton = ref(false);
const indexUpdate = ref();

interface rowData {
    id: string
}

const inputForm = ref({
    id: "",
    name: "",
    status: "",
    childList: [] as any
})
const rulesData = reactive<FormRules>({
    name: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    status: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
})
const cellStyleMethod = ({
    row,
}: {
    row: rowData
}) => {
    if (row.id === undefined) {
        return { color: 'blue' }
    }
}
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
function deleteClick(index: number) {
    let list = inputForm.value.childList;
    list.splice(index, 1);
}
function editClick(index: number, row: any) {
    indexUpdate.value = index;
    childCreateRef.value.initialUpdateMethod(row)
}
function dialogCloseCreateMethod(clickType: string, type: string, data: any) {
    if (clickType == 'insert') {
        if (type == 'submit') {
            inputForm.value.childList.unshift(data)
        }
    } else if (clickType == 'update') {
        if (type == 'submit') {
            let index = indexUpdate.value;
            inputForm.value.childList[index] = data;
        }
    }
}
function addTransferTargetMethod() {
    childCreateRef.value.initialMethod()
}
function submitForm() {
    let formEl = formRef.value;
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            loaddingButton.value = true;
            httpbe.put(`/transfer-target`, inputForm.value).then((resp) => {
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
function fetchData(id: string) {
    httpbe.get(`/transfer-target/${id}`).then((resp) => {
        inputForm.value = resp.data.payload
    }).catch(err => {
        ElMessage.error(
            err.data.message,
        );
    })
}
function initialMethod(id: string) {
    dialogVisible.value = true;
    fetchData(id)
}

defineExpose({
    initialMethod,
});

</script>