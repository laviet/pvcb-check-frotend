<template>
    <div style="margin-bottom: 45px">
        <el-page-header content="Chi tiết" @back="goBackMethod()" style="float: left" />
        <span style="float: right">
            <el-button type="success" @click="createTranferTargetMethod()">Tạo</el-button>
        </span>
    </div>
    <el-table :data="tableData" :header-cell-style="tableHeaderColor" border>
        <el-table-column prop="name" label="Tên mục đích" />
        <el-table-column label="Đối tượng áp dụng" align="center" width="180px">
            <template #default="scope">
                <span v-if="scope.row.objectApply == 'all'">Tất cả</span>
                <span v-else-if="scope.row.objectApply == 'customer'">Khách hàng</span>
                <span v-else-if="scope.row.objectApply == 'customerGroup'">Nhóm khách hàng</span>
            </template>
        </el-table-column>
        <el-table-column label="Thao tác" fixed="right" width="140" align="center">
            <template #default="scope">
                <el-button link type="danger" size="small" @click="deleteClick(scope.row.id)">Xóa
                </el-button>
                <el-button link type="primary" size="small" @click="editClick(scope.row)">Sửa
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="Trạng thái" align="center" width="140px">
            <template #default="scope">
                <span v-if="scope.row.status == 'ACTIVE'">Kích hoạt</span>
                <span v-else-if="scope.row.status == 'INACTIVE'">Bỏ kích hoạt</span>
            </template>
        </el-table-column>
    </el-table>
    <TransferTargetChildCreate ref="childCreateRef" @closeDialog="dialogCloseCreateMethod" />
    <TransferTargetChildUpdate ref="childUpdateRef" @closeDialog="dialogCloseCreateMethod" />
</template>

<script lang="ts" setup>
import httpbe from "@/http-fees";

import { reactive, ref, onMounted, watch, toRefs, vModelRadio, provide } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import router from "@/router";
import { useRoute } from "vue-router";
import { tableHeaderColor } from "@/functionCommon/CommonFun"
import TransferTargetChildCreate from './TransferTargetChildCreate.vue'
import TransferTargetChildUpdate from './TransferTargetChildUpdate.vue'
const childCreateRef = ref()
const childUpdateRef = ref()
const route = useRoute();
const idTransfer = route.params.id;
interface DataRes {
    id: string,
    name: string;
    objectApply: string,
    noteMe: string,
    noteNoMe: string,
    status: string,
}
const tableData = ref<Array<DataRes>>([])
function createTranferTargetMethod() {
    childCreateRef.value.initialMethod(idTransfer)
}
function dialogCloseCreateMethod() {
    getDataInitial()
}
function editClick(row: DataRes) {
    childUpdateRef.value.initialMethod(row)
}
function goBackMethod() {
    router.push({
        name: "transferTargetName",
    });
}
function deleteClick(id: string) {
    ElMessageBox.confirm(
        "Bạn có chắc chắn muốn xóa không?", "Thông báo",
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Hủy',
            type: 'warning',
        }).then(() => {
            httpbe.delete(`/transfer-target/${id}`).then((resp) => {
                getDataInitial()
                ElMessage.success({
                    message: resp.data.message,
                })
            })
        }).catch(err => {
            console.log(err.data.message)
        })

}
function getDataInitial() {
    httpbe.get(`/transfer-target/child/${idTransfer}`).then((resp) => {
        tableData.value = resp.data.payload;
    }).catch(err => {
        console.log(err.data.message)
    })
}
function fetchData() {
    getDataInitial()
}
onMounted(() => {
    fetchData()
});
</script>