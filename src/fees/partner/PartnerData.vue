<template>
    <div style="margin-bottom: 45px">
        <span style="float: right">
            <el-button type="success" @click="createTranferTargetMethod()">Tạo</el-button>
        </span>
    </div>
    <el-table :data="tableData" border>
        <el-table-column prop="name" label="Tên đối tác" />
        <el-table-column prop="note" label="Mô tả" />
        <el-table-column label="Trạng thái" align="center" width="140px">
            <template #default="scope">
                <span v-if="scope.row.status = 'ACTIVE'">Kích hoạt</span>
                <span v-else-if="scope.row.status = 'INACTIVE'">Bỏ kích hoạt</span>
            </template>
        </el-table-column>
        <el-table-column label="Thao tác" fixed="right" width="140" align="center">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClick(scope.row)">Chi tiết
                </el-button>
                <el-button link type="danger" size="small" @click="deleteClick(scope.row.id)">Xóa
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <PartnerCreate ref="childComponentRef" @closeDialog="dialogCloseCreateMethod" />
</template>

<script lang="ts" setup>
import httpbe from "@/http-fees";
import { reactive, ref, onMounted, watch, toRefs, vModelRadio, provide } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import PartnerCreate from './PartnerCreate.vue'
const childComponentRef = ref()
interface DataRes {
    id: string,
    name: string,
    note: string;
    status: string
}
const tableData = ref<Array<DataRes>>([])
function createTranferTargetMethod() {
    childComponentRef.value.initialMethod()
}
function dialogCloseCreateMethod() {
    getDataInitial()
}
function handleClick(row: DataRes) {
    alert(row.id)
}
function deleteClick(id: string) {
    ElMessageBox.confirm(
        "Bạn có chắc chắn muốn xóa đối tác này không?", "Thông báo",
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Hủy',
            type: 'warning',
        }).then(() => {
            httpbe.delete(`/partner/${id}`).then((resp) => {
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
    httpbe.get("/partner").then((resp) => {
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