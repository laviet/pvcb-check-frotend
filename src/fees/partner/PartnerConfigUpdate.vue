<template>
    <el-dialog v-model="dialogVisible" title="Sửa cấu hình đối tác" width="700px" :before-close="closeMethod"
        :close-on-click-modal="false" top="10vh">
        <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
            label-position="left">
            <el-form-item label="Mục đích" prop="transferTargetChildIdList">
                <el-select v-model="inputForm.transferTargetIdList" multiple @change="changeTransferTargetMethod()"
                    placeholder="Chọn nhóm mục đích">
                    <el-option v-for="item in transferTargetList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-select v-model="inputForm.transferTargetChildIdList" multiple placeholder="Chọn mục đích">
                    <el-option v-for="item in transferTargetChiList" :key="item.id" :value="item.id"
                        :label="item.name + '- ' + item.transferTarget.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Loại tiền tệ"  prop="currencyTypeIdList">
                <el-select v-model="inputForm.currencyTypeIdList" multiple placeholder="Chọn loại tiền tệ">
                    <el-option v-for="item in currencyTypeBriefList" :key="item.id" :value="item.id" :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Tỷ giá">
                <el-select v-model="inputForm.exchangeRateId" placeholder="Chọn tỷ giá" :clearable="true">
                    <el-option v-for="item in exchangeRateBriefList" :key="item.id" :value="item.id" :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="closeMethod()">Hủy</el-button>
                <el-button type="primary" :loading="loaddingButton" @click="submitForm()">Lưu</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch, toRefs, defineExpose, defineEmits } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import httpbe from "@/http-fees";
const formRef = ref<FormInstance>();
const emit = defineEmits(['closeDialog'])
const dialogVisible = ref(false);
const loaddingButton = ref(false);
const transferTargetList = ref<TransferObject[]>([])
const transferTargetChiList = ref<NameDataObject[]>([])
const exchangeRateBriefList = ref<NameObject[]>([])
const currencyTypeBriefList = ref<NameObject[]>([])

interface TransferObject {
    id: string,
    name: string,
    transferTargetChildList: NameDataObject,
}

interface NameDataObject {
    id: "",
    name: "",
    transferTarget: NameObject,
}
interface NameObject {
    id: "",
    name: "",
}
const inputForm = ref({
    id: "",
    exchangeRateId: "",
    transferTargetIdList: [] as any,
    transferTargetChildIdList: [],
    currencyTypeIdList: [],
})
const rulesData = reactive<FormRules>({
    name: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }]
})
function closeMethod() {
    dialogVisible.value = false;
    emit('closeDialog')
    setTimeout(() => {
        resetForm()
    }, 300);
}
function changeTransferTargetMethod() {
    inputForm.value.transferTargetChildIdList = []
    calculationData()
}
function resetForm() {
    let formEl = formRef.value;
    if (!formEl) return
    formEl.resetFields()
    inputForm.value.transferTargetIdList = []
}
function submitForm() {
    loaddingButton.value = true;
    httpbe.put(`/partner/config`, inputForm.value).then((resp) => {
        ElMessage.success(
            resp.data.message,
        );
        setTimeout(() => {
            closeMethod()
        }, 500);
    }).catch(err => {
        ElMessage.error(
            err.data.message,
        );
    }).finally(() => {
        setTimeout(() => {
            loaddingButton.value = false;
        }, 500);
    })

}
function calculationData() {
    let filterList = transferTargetList.value.filter(x => inputForm.value.transferTargetIdList.includes(x.id));
    transferTargetChiList.value = filterList.map(x => x.transferTargetChildList).flat();
}
async function getTransferTargetAddList() {
    await httpbe.get(`/transfer-target/add/limit`).then((resp) => {
        transferTargetList.value = resp.data.payload;
    })
}
async function getExchangeRateBriefList() {
    await httpbe.get(`/exchange-rate/brief`).then((resp) => {
        exchangeRateBriefList.value = resp.data.payload;
    })
}
async function getCurrencyTypeBriefList() {
    await httpbe.get(`/currency-type/other`).then((resp) => {
        currencyTypeBriefList.value = resp.data.payload;
    })
}
async function getPartnerConfigById(id: string) {
    await httpbe.get(`/partner/config/${id}`).then((resp) => {
        inputForm.value = resp.data.payload;
    })
}
async function initialMethod(id: string) {
    dialogVisible.value = true;
    await Promise.all([
        getTransferTargetAddList(), getExchangeRateBriefList(),
         getPartnerConfigById(id), getCurrencyTypeBriefList(),
    ])
    calculationData()
}

defineExpose({
    initialMethod,
});

</script>