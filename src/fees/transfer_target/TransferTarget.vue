<template>
    <div>
        <span style="float: right">
            <el-button type="success" @click="createTranferTargetMethod()">Tạo</el-button>
        </span>
    </div>
    <el-table :data="tableData">
        <el-table-column prop="value" label="Tên mục đích" />
        <el-table-column label="Trạng thái">
            <template #default="scope">
                <span v-if="scope.row.active">Kích hoạt</span>
                <span v-else>Bỏ kích hoạt</span>
            </template>
        </el-table-column>
        <el-table-column label="Thao tác" fixed="right" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClick(scope.row)">Chi tiết
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <TransferTargetCreate ref="childComponentRef" @closeDialog="dialogCloseCreateMethod" :mydata="showDialog"  :mydata1="showDialog1"/>
</template>

<script lang="ts" setup>
import httpbe from "@/http-fees";
import { reactive, ref, onMounted, watch, toRefs, vModelRadio, provide } from "vue";
import TransferTargetCreate from './TransferTargetCreate.vue'
const childComponentRef = ref()
interface DataRes {
    id: string,
    key: string,
    value: string;
    active: boolean,
    objectApply: string,
    objectTransfer: string,
    noteMe: string,
    noteNoMe: string,
}
const showDialog = ref("chim non")
const showDialog1 = ref(true)
const tableData = ref<Array<DataRes>>([])
function createTranferTargetMethod() {
    // showDialog.value = true
    childComponentRef.value.initialMethod()
}
function dialogCloseCreateMethod(data: any) {
    // alert("close method: " + data)
    // showDialog.value = false;
}
function handleClick(row: DataRes) {
   alert(row.id)
}
function getDataInitial() {
    httpbe.get("/transfer-target").then((resp) => {
        tableData.value = resp.data.payload;
    });
}
function fetchData() {
    getDataInitial()
}
onMounted(() => {
    fetchData()
});
</script>