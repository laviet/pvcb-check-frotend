<template>
    <el-dialog v-model="dialogVisible" title="Danh sách đối tác" width="700px" :before-close="closeMethod"
        :close-on-click-modal="false" top="10vh">
        <el-table :data="tableData" :header-cell-style="tableHeaderColor" border>
            <el-table-column prop="name" label="Tên đối tác" />
            <el-table-column label="Thao tác" fixed="right" width="140" align="center">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="editClick(scope.row.id)">Cấu hình
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="closeMethod()">Đóng</el-button>
            </span>
        </template>
    </el-dialog>
    <PartnerConfigUpdate ref="childUpdateRef" />
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch, toRefs, defineExpose, defineEmits } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { tableHeaderColor } from "@/functionCommon/CommonFun"
import httpbe from "@/http-fees";
import PartnerConfigUpdate from './PartnerConfigUpdate.vue'

const formRef = ref<FormInstance>();
const emit = defineEmits(['closeDialog'])
const childUpdateRef = ref()
const dialogVisible = ref(false);
const loaddingButton = ref(false);
interface DataRes {
    id: string,
    name: string
}
const tableData = ref<Array<DataRes>>([])

const inputForm = ref({
    id: "",
    name: "",
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
function editClick(id: string) {
    childUpdateRef.value.initialMethod(id)
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
function getAllData() {
    httpbe.get(`/partner/brief`).then((resp) => {
        ElMessage.success(
            tableData.value = resp.data.payload,
        );
    })
}
function initialMethod() {
    dialogVisible.value = true;
    getAllData()
    // inputForm.value = row;
}

defineExpose({
    initialMethod,
});

</script>