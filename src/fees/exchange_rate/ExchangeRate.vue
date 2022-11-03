<template>
    <div style="margin-bottom: 45px">
        <span style="float: right">
            <el-button type="success" @click="childCreateRefMethod()">Tạo</el-button>
        </span>
    </div>
    <el-table :data="tableData" :header-cell-style="tableHeaderColor" border>
        <el-table-column type="index" label="STT" align="center" width="55" />
        <el-table-column prop="name" label="Loại tiền" />
        <el-table-column label="spot rate" align="right" width="140px">
            <template #default="scope">
                <span>{{ formatNumber(scope.row.spotRate) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="internal rate" align="right" width="140px">
            <template #default="scope">
                <span>{{ formatNumber(scope.row.internalRate) }}</span>
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
                <el-button link type="primary" size="small" @click="editClick(scope.row)">Sửa
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <ExchangeRateCreate ref="childCreateRef" @closeDialog="dialogCloseCreateMethod" />
    <ExchangeRateUpdate ref="childUpdateRef" @closeDialog="dialogCloseCreateMethod" />
    <!-- <el-button @click="abc()">OK</el-button>
    <el-upload class="upload-demo" drag multiple :auto-upload="false" :limit="3" :on-exceed="handleExceed1"
        :file-list="fileList1">
        <el-icon class="el-icon--upload">
            <upload-filled />
        </el-icon>
        <div class="el-upload__text">
            Kéo/thả nhiều tài liệu vào đây hoặc
            <br />
            <em>chọn từ máy tính</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">Hỗ trợ jpg, jpeg, tif, pdf</div>
        </template>
    </el-upload> -->
</template>

<script lang="ts" setup>
import httpbe from "@/http-fees";
import httpFile from "@/http-multipartFile";
import type { UploadProps, UploadUserFile, UploadInstance } from "element-plus";
import { reactive, ref, onMounted, watch, toRefs, vModelRadio, provide } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { tableHeaderColor } from "@/functionCommon/CommonFun"
import { formatNumber } from "@/functionCommon/CommonFun"
import ExchangeRateCreate from './ExchangeRateCreate.vue'
import ExchangeRateUpdate from './ExchangeRateUpdate.vue'
const childCreateRef = ref()
const childUpdateRef = ref()
const fileList1 = ref<UploadUserFile[]>([]);

interface DataRes {
    id: string,
    name: string,
    spotRate: number,
    internalRate: number,
    status: string
}
const handleExceed1: UploadProps["onExceed"] = () => {
    ElMessage.warning(`Bạn chỉ được phép chọn tối đa 3 file`);
};
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
            httpbe.delete(`/exchange-rate/${id}`).then((resp) => {
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
// function abc() {
//     let formData = new FormData();
//     formData.append("fullName", "la vanviet")
//     let objectTest = {
//         "age": "tuoi 19",
//         "address": "ha noi"
//     }
//     formData.append("objectTest.age", objectTest.age)
//     formData.append("objectTest.address", objectTest.address)
//     formData.append("objectFile.abc", "con chim")
//     let index = 0;
//     fileList1.value.forEach(x => {
//         formData.append("fileTestList[" + index + "].name", "ten " + index);
//         formData.append("fileTestList[" + index + "].file", x.raw);
//         index++;
//     })



//     httpFile.post("/test/test-file", formData).then(resp => {
//         console.log(resp)
//     })
// }
function getDataInitial() {
    httpbe.get("/exchange-rate").then((resp) => {
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