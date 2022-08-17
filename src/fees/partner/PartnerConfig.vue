<template>
    <!-- <div style="margin-bottom: 45px">
        <span style="float: right">
            <el-button type="success" @click="childCreateRefMethod()">Tạo</el-button>
        </span>
    </div> -->
    <el-table :data="tableData" :header-cell-style="tableHeaderColor" border>
        <el-table-column prop="name" label="Tên đối tác" />
        <el-table-column label="Mục đích" />
        <el-table-column  label="Phí" />
        <el-table-column label="Thao tác" fixed="right" width="140" align="center">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="editClick(scope.row)">Sửa
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <PartnerConfigUpdate ref="childUpdateRef" @closeDialog="dialogCloseCreateMethod" />
</template>

<script lang="ts" setup>
import httpbe from "@/http-fees";
import { reactive, ref, onMounted, watch, toRefs, vModelRadio, provide } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { tableHeaderColor } from "@/functionCommon/CommonFun"
import PartnerConfigUpdate from './PartnerConfigUpdate.vue'
const childCreateRef = ref()
const childUpdateRef = ref()
interface DataRes {
    id: string,
    name: string,
    note: string;
    status: string;
}
const tableData = ref<Array<DataRes>>([])
function childCreateRefMethod() {
    childCreateRef.value.initialMethod()
}
function dialogCloseCreateMethod() {
    getDataInitial()
}
function editClick(row: DataRes) {
    childUpdateRef.value.initialMethod(row)
}
function deleteClick(id: string) {
    ElMessageBox.confirm(
        "Bạn có chắc chắn muốn xóa không?", "Thông báo",
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
            }).catch(err => {
                ElMessage.error({
                    message: err.data.message,
                })
            })
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