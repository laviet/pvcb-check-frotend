<template>
    <div style="margin-bottom: 45px">
        <span style="float: right">
            <el-button type="success" @click="showData()">Cấu hình</el-button>
        </span>
    </div>
    <el-table :data="tableData" :header-cell-style="tableHeaderColor" border>
        <el-table-column prop="code" label="Mã đối tác" width="100" align="center" />
        <el-table-column prop="name" width="120" label="Tên đối tác" />
        <el-table-column label="Trạng thái" align="center" width="110px">
            <template #default="scope">
                <span v-if="scope.row.status == 'ACTIVE'">Kích hoạt</span>
                <span v-else-if="scope.row.status == 'INACTIVE'">Bỏ kích hoạt</span>
            </template>
        </el-table-column>
        <el-table-column label="Tỷ giá" width="130" prop="exchangeRate.name" />
        <el-table-column label="Mục đích">
            <template #default="scope">
                <span v-for="(item, index) in scope.row.transferTargetChildSet" :key="item.id">
                    {{ index + 1 }}. {{ item.name }}<br />
                </span>
            </template>
        </el-table-column>
        <el-table-column label="Loại tiền tệ - Phí">
            <template #default="scope">
                <span v-for="(item, index) in scope.row.currencyTypeData" :key="item.id">
                    {{ index + 1 }}. {{ item.name }} -
                    <span v-for="(item1, index1) in item.feeConfigData" :key="item1.id">
                        {{index+1}}.{{index1+1}} {{ item1.name }}<br />
                    </span>
                    <br/>
                </span>
            </template>
        </el-table-column>
        <!-- <el-table-column label="Phí">
            <template #default="scope">
                <span v-for="(item, index) in scope.row.feeConfigSet" :key="item.id">
                    {{ index + 1 }}. {{ item.code +' - '+item.name }}<br />
                </span>
            </template>
        </el-table-column> -->
        <el-table-column label="Thao tác" fixed="right" width="100" align="center">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="editClick(scope.row.id)">Sửa<a href="http://" target="_blank" rel="noopener noreferrer"></a>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <PartnerConfigDialog ref="childDialogRef" @closeDialog="dialogCloseCreateMethod" />
    <PartnerConfigUpdate ref="childUpdateRef" @closeDialog="dialogCloseCreateMethod" />
</template>

<script lang="ts" setup>
import httpbe from "@/http-fees";
import { reactive, ref, onMounted, watch, toRefs, vModelRadio, provide } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { tableHeaderColor } from "@/functionCommon/CommonFun"
import PartnerConfigDialog from './PartnerConfigDialog.vue'
import PartnerConfigUpdate from './PartnerConfigUpdate.vue'
const childDialogRef = ref()
const childCreateRef = ref()
const childUpdateRef = ref()
interface DataRes {
    id: string,
    name: string,
    status: string;
    exchangeRate: NameObject,
    transferTargetChildSet: Array<NameObject>,
    currencyTypeData: Array<NameListObject>,
}
interface NameObject {
    id: "",
    name: "",
}
interface NameListObject {
    id: "",
    name: "",
    feeConfigData: Array<NameObject>
}
const tableData = ref<Array<DataRes>>([])
function childCreateRefMethod() {
    childCreateRef.value.initialMethod()
}
function dialogCloseCreateMethod() {
    getDataInitial()
}
function editClick(id: string) {
    childUpdateRef.value.initialUpdateMethod(id)
}
function showData() {
    // childDialogRef.value.initialMethod()
    childUpdateRef.value.initialCreateMethod()
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
    httpbe.get("/partner/config").then((resp) => {
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