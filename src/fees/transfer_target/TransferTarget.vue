<template>
    <div style="margin-bottom: 45px">
        <span style="float: right">
            <el-button type="success" @click="createTranferTargetMethod()">Tạo</el-button>
        </span>
    </div>
    <el-table :data="tableData" :header-cell-style="tableHeaderColor" border>
        <el-table-column type="index" label="STT" align="center" width="55" />
        <el-table-column prop="name" label="Tên nhóm mục đích" />
        <el-table-column label="Mục đích">
            <template #default="scope">
                <span v-for="(item, index) in scope.row.transferTargetChildList" :key="item.id">
                    {{index+1}}, {{ item.name }}<br/>
                </span>
            </template>
        </el-table-column>
        <el-table-column label="Trạng thái" align="center" width="140px">
            <template #default="scope">
                <span v-if="scope.row.status == 'ACTIVE'">Kích hoạt</span>
                <span v-else-if="scope.row.status == 'INACTIVE'">Bỏ kích hoạt</span>
            </template>
        </el-table-column>
        <el-table-column label="Thao tác" fixed="right" width="140" align="center">
            <template #default="scope">
                <el-button link type="danger" size="small" @click="deleteClick(scope.row.id)">Xóa
                </el-button>
                <el-button link type="primary" size="small" @click="editClick(scope.row.id)">Sửa
                </el-button>
                <!-- <el-button link type="success" size="small" @click="detailClick(scope.row.id)">Chi tiết
                </el-button> -->
            </template>
        </el-table-column>
    </el-table>
    <TransferTargetCreate ref="childCreateRef" @closeDialog="dialogCloseCreateMethod" />
    <TransferTargetUpdate ref="childUpdateRef" @closeDialog="dialogCloseCreateMethod" />
</template>

<script lang="ts" setup>
import httpbe from "@/http-fees";
import router from "@/router";
import { reactive, ref, onMounted, watch, toRefs, vModelRadio, provide } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { tableHeaderColor } from "@/functionCommon/CommonFun"
import TransferTargetCreate from './TransferTargetCreate.vue'
import TransferTargetUpdate from './TransferTargetUpdate.vue'
const childCreateRef = ref()
const childUpdateRef = ref()
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
    childCreateRef.value.initialMethod()
}
function dialogCloseCreateMethod() {
    getDataInitial()
}
function editClick(id: string) {
    childUpdateRef.value.initialMethod(id)
}
function detailClick(id: string) {
    router.push({
        name: "transferTargetDetailName",
        params: { id: id }
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
            }).catch(err => {
                ElMessage.error({
                    message: err.data.message,
                })
            })
        })

}
function getDataInitial() {
    httpbe.get("/transfer-target").then((resp) => {
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