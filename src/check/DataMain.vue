<template>
    <div style=" margin-bottom: 10px; ">
        <span>
            <div class="search-header">Mã yêu cầu<div>
                    <el-input v-model="dataSearch.code" style="width: 200px">
                        <template #append>
                            <el-button :icon="Search" @click="filterDataMethod(true)" />
                        </template>
                    </el-input>
                </div>
            </div>
            <div class="search-header">Tên khách hàng<div>
                    <el-input v-model="dataSearch.fullName" style="width: 200px">
                        <template #append>
                            <el-button :icon="Search" @click="filterDataMethod(true)" />
                        </template>
                    </el-input>
                </div>
            </div>
            <div class="search-header">Trạng thái<div>
                    <el-select v-model="dataSearch.status" :clearable="true" class="m-2" placeholder=" "
                        style="width: 140px" @change="filterDataMethod(true)">
                        <el-option v-for="item in statusList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
            </div>
            <div class="search-header">Từ ngày<div>
                    <el-date-picker @change="filterDataMethod(true)" v-model="dataSearch.startDate" type="date"
                        placeholder="" style="width: 140px" />
                </div>
            </div>
            <div class="search-header">Đến ngày<div>
                    <el-date-picker @change="filterDataMethod(true)" v-model="dataSearch.endDate" type="date"
                        placeholder="" style="width: 140px" />
                </div>
            </div>
            <div class="search-header">Sắp xếp<div>
                    <el-select v-model="dataSearch.sort" @change="filterDataMethod(false)" :clearable="true" class="m-2"
                        placeholder=" " style="width: 140px">
                        <el-option v-for="item in sortList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
            </div>
        </span>
        <span style="float: right"></span>
    </div>
    <el-table :data="tableDataFilter" :row-class-name="tableRowClassName" :max-height="hightTable">
        <el-table-column type="index" label="STT" width="55" />
        <el-table-column width="180">
            <template #header>
                <div>MÃ YÊU CẦU</div>
                <div>Tên khách hàng</div>
                <div style="font-weight: normal">Mục đích chuyển tiền</div>
            </template>
            <template #default="scope">
                <div class="bold-class">{{ scope.row.code }}</div>
                <div class="bold-class">{{ scope.row.fullNameSend }}</div>
                <div>{{ scope.row.transferTargetChildName }}</div>
            </template>
        </el-table-column>
        <el-table-column width="150">
            <template #header>
                <div>Số CIF</div>
                <div style="font-weight: normal">Số TKTT</div>
            </template>
            <template #default="scope">
                <div class="bold-class">{{ scope.row.cif }}</div>
                <span>{{ scope.row.accountNumber }}</span>
            </template>
        </el-table-column>
        <el-table-column width="150">
            <template #header>
                <div>SỐ ĐIỆN THOẠI</div>
                <div style="font-weight: normal">Email</div>
            </template>
            <template #default="scope">
                <div class="bold-class">{{ scope.row.phoneSend }}</div>
                <span>{{ scope.row.emailSend }}</span>
            </template>
        </el-table-column>
        <el-table-column width="150">
            <template #header>
                <div>SỐ TIỀN CHUYỂN</div>
                <div style="font-weight: normal">Quy đổi VNĐ</div>
            </template>
            <template #default="scope">
                <div>{{ scope.row.moneyTransfer }} {{ scope.row.currency }}</div>
                <div> {{ formatterCurrency.format(scope.row.moneyTransferConvert) }}</div>
            </template>
        </el-table-column>
        <el-table-column width="300">
            <template #header>
                <div>HỒ SƠ ĐÃ NỘP</div>
            </template>
            <template #default="scope">
                <span v-for="(item, index) in scope.row.transferInfoFileList" :key="item.name">
                    {{ index + 1 }}. {{ item.note }}<br />
                </span>
            </template>
        </el-table-column>
        <el-table-column width="200">
            <template #header>
                <div>THÔNG TIN HẬU KIỂM</div>
            </template>
            <template #default="scope">
                <div v-if="scope.row.status == 'APPROVE_WAIT'" class="bold-class" style="color: green">CHỜ DUYỆT</div>
                <div v-else-if="scope.row.status == 'APPROVED'" class="bold-class">ĐÃ DUYỆT</div>
                <div v-else-if="scope.row.status == 'REJECT'" class="bold-class" style="color: red">TỪ CHỐI</div>
                <div>{{scope.row.rejectReason}}</div>
                <div>{{formatDateTime(scope.row.approvedTime)}}</div>
            </template>
        </el-table-column>
        <el-table-column prop="approvedUser" label="USER HẬU KIỂM" width="150">
        </el-table-column>
        <el-table-column width="200">
            <template #header>
                <div>TÌNH TRẠNG GIAO DỊCH</div>
            </template>
            <template #default="scope">
                <div v-if="scope.row.fxTime!=null">{{formatDateTime(scope.row.fxTime)}} FX</div>
                <div v-if="scope.row.ftTime!=null">{{formatDateTime(scope.row.ftTime)}} MT103</div>
            </template>
        </el-table-column>
        <el-table-column label="Thao tác" fixed="right" width="100">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClick(scope.row.id)">Chi tiết
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination style="float: right; margin-top: 15px" v-model:currentPage="currentPage" v-model:page-size="pageSize"
        :page-sizes="[10, 25, 50, 100]" :small="small" :disabled="disabled" :background="background"
        layout="sizes, prev, pager, next" :total="totalPage" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
</template>
<script lang="ts" setup>
import router from "@/router";
import { reactive, ref, onMounted, watch, toRefs, vModelRadio } from "vue";
import { Search } from '@element-plus/icons-vue'
import { useRoute } from "vue-router";
import { hightTable } from "@/functionCommon/DataConstant"
import { testFunction, formatDateTime } from "@/check/interface/CommonFunction"
import httpbe from "@/http-be";

const route = useRoute();
const dataSearch = reactive({
    code: "",
    fullName: "",
    status: "",
    startDate: "",
    endDate: "",
    sort: ""
})
// function tableHeaderColor(){
//     return "background-color: #78a5e7;color: #fff;font-weight: bold;";
// }
const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const totalPage = ref(30)

const handleSizeChange = (val: number) => {
    filterDataMethod(false)
}
const handleCurrentChange = (val: number) => {
    filterDataMethod(false)
}
interface User {
    id: string
    date: string
    name: string
    address: string
}
interface DataRes {
    id: string,
    code: string,
    money: number;
    accountNumber: string,
    targetTransfer: string,
    objectTransfer: string,
    moneyType: string,
    balance: number,
    rate: number,
    rateUSD: number,
    internalFees: string,
    externalFees: string,
    moneyShow: number,
    moneyPay: number,
    moneyTypeChoose: string,

    createdUser: string,
    email: string,
    status: string,
    approvedTime: Date,
    fxTime: Date,
    ftTime: Date,
    transferInfoFileList: Array<FileObject>
}
interface FileObject {
    name: string,
    note: string,
    path: string
}
const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: User
    rowIndex: number
}) => {
    if (row.name === 'Chim') {
        return 'warning-row'
    }
    return ''
}
function handleClick(id: string) {
    router.push({
        name: "detailCheckName",
        params: { id: id }
    });
}

function searchHeaderMethod() {
    // testFunction();
    currentPage.value = 1
    searchByProperties();
}

function searchByProperties() {
    alert("search data")
}
// const tableData: User[] = [
//     {
//         id: "a",
//         date: '2016-05-03',
//         name: 'Tom',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//         id: "b",
//         date: '2016-05-03',
//         name: 'Chim',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//         id: "c",
//         date: '2016-05-02',
//         name: 'Tom',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//         id: "d",
//         date: '2016-05-04',
//         name: 'An',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//         id: "e",
//         date: '2016-05-01',
//         name: 'Tom',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
// ]
const statusList = [
    {
        value: "APPROVED",
        label: "Đã duyệt"
    },
    {
        value: "APPROVE_WAIT",
        label: "Chưa duyệt"
    },
    {
        value: "REJECT",
        label: "Từ chối"
    }
]
const sortList = [
    {
        value: "statusSort",
        label: "Trạng thái"
    },
    {
        value: "fullNameSort",
        label: "Họ tên"
    }
]
const formatterCurrency = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
});


const tableData = ref<Array<DataRes>>([])
const tableDataFilter = ref<Array<DataRes>>([])
function filterDataMethod(resetPage: boolean) {
    let list = tableData.value;
    if (resetPage) {
        currentPage.value = 1
    }
    if (dataSearch.code.trim() != '') {
        list = list.filter(x => x.code.includes(dataSearch.code.trim()))
    }
    if (dataSearch.fullName.trim() != '') {
        list = list.filter(x => x.createdUser.includes(dataSearch.fullName.trim()))
    }
    if (dataSearch.status != '') {
        list = list.filter(x => x.status == dataSearch.status)
    }
    if (dataSearch.sort != '') {
        if (dataSearch.sort == 'statusSort') {
            list = list.sort((a, b) => (a.status > b.status) ? -1 : 1);
        } else if (dataSearch.sort == 'fullNameSort') {
            list = list.sort((a, b) => (a.createdUser > b.createdUser) ? -1 : 1);
        }
    }

    totalPage.value = list.length;
    tableDataFilter.value = list.slice(pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
}
function getDataInitial() {
    httpbe.get("/check/list").then((resp) => {
        let list = resp.data.payload
        console.log(list)
        tableData.value = list;
        totalPage.value = list.length
        filterDataMethod(false)
    });
}
function fetchData() {
    getDataInitial()
}
onMounted(() => {
    fetchData()
});

</script>

<style lang="scss" >
// .el-input {
//     margin-right: 5px
// }

.search-header {
    display: inline-block;
    text-align: center;
    margin-right: 5px;
}

// :deep(.el-input__inner) {
//     border-bottom: 1px solid #d9d9d9;
// }

// :deep(.el-input__inner:focus) {
//     border-bottom: 1px solid #409EFF;
// }

// :deep(.el-input__wrapper) {
//     box-shadow: none;
// }

// :deep(.el-select:hover) {
//     box-shadow: none;
// }
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
    // background: green
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.el-table .cell {
    text-align: center;
    word-break: break-word
}

.bold-class {
    font-weight: bold;
}
</style>