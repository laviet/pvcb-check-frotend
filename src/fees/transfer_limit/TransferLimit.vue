<template>
    <div style="margin-bottom: 45px">
        <span style="float: right">
            <el-button type="success" @click="childCreateRefMethod()">Tạo</el-button>
        </span>
    </div>
    <el-table :data="tableData" :header-cell-style="tableHeaderColor" border>
        <el-table-column prop="name" label="Tên hạn mức" />
        <el-table-column label="Loại hạn mức" align="center" width="140px">
            <template #default="scope">
                <span v-if="scope.row.type == 'unit'">Lần chuyển</span>
                <span v-else-if="scope.row.type == 'people'">Người chuyển</span>
                <span v-else-if="scope.row.type == 'time'">Thời gian</span>
            </template>
        </el-table-column>
        <el-table-column label="Hạn mức" align="right" width="140px">
            <template #default="scope">
                <span v-if="scope.row.money == null"></span>
                <span v-else>{{ formatNumber(scope.row.money) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Mục đích">
            <template #default="scope">
                <span v-for="(item, index) in scope.row.transferTargetChildList" :key="item.id">
                    {{ index + 1 }}. {{ item.name }}<br />
                </span>
            </template>
        </el-table-column>
        <el-table-column label="Loại tiền tệ" prop="moneyType" align="center" width="140px">
        </el-table-column>
        <el-table-column label="Tối thiểu/lần" align="right" width="140px">
            <template #default="scope">
                <span v-if="scope.row.moneyMin == null"></span>
                <span v-else>{{ formatNumber(scope.row.moneyMin) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Tối đa/lần" align="right" width="140px">
            <template #default="scope">
                <span v-if="scope.row.moneyMax == null"></span>
                <span v-else>{{ formatNumber(scope.row.moneyMax) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Thao tác" fixed="right" width="140" align="center">
            <template #default="scope">
                <el-button link type="danger" size="small" @click="deleteClick(scope.row.id)">Xóa
                </el-button>
                <el-button link type="primary" size="small" @click="editClick(scope.row)">Sửa
                </el-button>
                <!-- <el-button link type="success" size="small" @click="editClick1(scope.row)">Thêm
                </el-button> -->
            </template>
        </el-table-column>
    </el-table>
    <TransferLimitCreate ref="childCreateRef" @closeDialog="dialogCloseCreateMethod" />
    <TransferLimitUpdate ref="childUpdateRef" @closeDialog="dialogCloseCreateMethod" />
    <TransferLimitAdd ref="childAddRef" @closeDialog="dialogCloseCreateMethod" />
</template>

<script lang="ts" setup>
import httpbe from "@/http-fees";
import { reactive, ref, onMounted, watch, toRefs, vModelRadio, provide } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { tableHeaderColor } from "@/functionCommon/CommonFun"
import { formatNumber } from "@/functionCommon/CommonFun"
import TransferLimitCreate from './TransferLimitCreate.vue'
import TransferLimitUpdate from './TransferLimitUpdate.vue'
import TransferLimitAdd from './TransferLimitAdd.vue'
const childCreateRef = ref()
const childUpdateRef = ref()
const childAddRef = ref()
interface DataRes {
    id: string,
    name: string,
    type: string,
    moneyType: string,
    money: number,
    moneyMin: number,
    moneyMax: number,
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
function editClick1(row: DataRes) {
    childAddRef.value.initialMethod(row)
}
function deleteClick(id: string) {
    ElMessageBox.confirm(
        "Bạn có chắc chắn muốn xóa không?", "Thông báo",
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Hủy',
            type: 'warning',
        }).then(() => {
            httpbe.delete(`/transfer-limit/${id}`).then((resp) => {
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
    httpbe.get("/transfer-limit").then((resp) => {
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