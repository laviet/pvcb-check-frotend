<template>
    <div style=" margin-bottom: 10px; ">
        <span>
            <div class="search-header"> Tên khách hàng<div>
                    <el-input v-model="dataSearch.code" style="width: 140px" />
                </div>
            </div>
            <div class="search-header"> Mã yêu cầu<div>
                    <el-input v-model="dataSearch.fullName" style="width: 140px" />
                </div>
            </div>
            <div class="search-header">Trạng thái<div>
                    <el-select v-model="dataSearch.status" :clearable="true" class="m-2" placeholder=" "
                        style="width: 140px">
                        <el-option v-for="item in statusList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
            </div>
            <div class="search-header">Từ ngày<div>
                    <el-date-picker v-model="dataSearch.startDate" type="date" placeholder="" style="width: 140px" />
                </div>
            </div>
            <div class="search-header">Đến ngày<div>
                    <el-date-picker v-model="dataSearch.endDate" type="date" placeholder="" style="width: 140px" />
                </div>
            </div>
            <div class="search-header">Sắp xếp<div>
                    <el-select v-model="dataSearch.sort" :clearable="true" class="m-2" placeholder=" "
                        style="width: 140px">
                        <el-option v-for="item in sortList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
            </div>
        </span>
        <span style="float: right"></span>
    </div>
    <el-table :data="tableData" :row-class-name="tableRowClassName">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column fixed="right" label="Operations" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClick(scope.row.id)">Chi tiết</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination style="float: right; margin-top: 15px" v-model:currentPage="currentPage" v-model:page-size="pageSize"
        :page-sizes="[10, 25, 50, 100]" :small="small" :disabled="disabled" :background="background"
        layout="sizes, prev, pager, next" :total="100" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
</template>
<script lang="ts" setup>
import router from "@/router";
import { reactive, ref, onMounted, watch, toRefs, vModelRadio } from "vue";
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

const handleSizeChange = (val: number) => {
    alert(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    alert(`current page: ${val}`)
}
interface User {
    id: string
    date: string
    name: string
    address: string
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
const tableData: User[] = [
    {
        id: "a",
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "b",
        date: '2016-05-03',
        name: 'Chim',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "c",
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "d",
        date: '2016-05-04',
        name: 'An',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "e",
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
const statusList = [
    {
        value: "A",
        label: "Đã duyệt"
    },
    {
        value: "B",
        label: "Chưa duyệt"
    }
]
const sortList = [
    {
        value: "A",
        label: "Trạng thái"
    },
    {
        value: "B",
        label: "Họ tên"
    }
]
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
    background: green
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>