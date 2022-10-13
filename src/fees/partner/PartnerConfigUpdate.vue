<template>
    <el-dialog v-model="dialogVisible" title="Sửa cấu hình đối tác" width="800px" :before-close="closeMethod"
        :close-on-click-modal="false" top="10vh">
        <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
            label-position="left">
            <el-form-item label="Đối tác" prop="id">
                <el-select :disabled="updateButton" v-model="inputForm.id" @change="changePartnerMethod()"
                    placeholder="Chọn đối tác">
                    <el-option v-for="item in partnerList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="Nhóm mục đích" prop="transferTargetIdList">
                <el-select v-model="inputForm.transferTargetIdList" multiple @change="changeTransferTargetMethod()"
                    placeholder="Chọn nhóm mục đích">
                    <el-option v-for="item in transferTargetList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>

            </el-form-item>
            <el-form-item label="Mục đích" prop="transferTargetChildIdList">
                <el-select v-model="inputForm.transferTargetChildIdList" multiple placeholder="Chọn mục đích">
                    <el-option v-for="item in transferTargetChiList" :key="item.id" :value="item.id"
                        :label="item.name + '- ' + item.transferTarget.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Tỷ giá" prop="exchangeRateId">
                <el-select v-model="inputForm.exchangeRateId" placeholder="Chọn tỷ giá" :clearable="true">
                    <el-option v-for="item in exchangeRateBriefList" :key="item.id" :value="item.id" :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Loại tiền tệ" prop="currencyTypeIdList">
                <el-select v-model="inputForm.currencyTypeIdList" multiple @change="getFeeScheduleCurrency(true)"
                    placeholder="Chọn loại tiền tệ">
                    <el-option v-for="item in currencyTypeBriefList" :key="item.id" :value="item.id" :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Chọn phí" prop="feeConfigIdList">
                <el-select v-model="inputForm.feeConfigIdList" multiple placeholder="Chọn phí">
                    <el-option v-for="item in feeConfigBriefList" :key="item.id" :value="item.id"
                        :label="item.code+' - '+item.name+' - '+item.currencyName">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="closeMethod()">Hủy</el-button>
                <el-button type="success" @click="resetFromButton()">Làm mới</el-button>
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
const feeConfigBriefList = ref<FeeConfigObject[]>([])
const partnerList = ref<NameObject[]>([])
const updateButton = ref(false);

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
interface FeeConfigObject {
    id: "",
    name: "",
    code: "",
    currencyName: "",
}
const inputForm = ref({
    id: "",
    exchangeRateId: "",
    transferTargetIdList: [] as any,
    transferTargetChildIdList: [],
    currencyTypeIdList: [],
    feeConfigIdList: [],
})
const rulesData = reactive<FormRules>({
    id: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }]
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
function changePartnerMethod() {
    initialMethod(inputForm.value.id);
}
function resetForm() {
    let formEl = formRef.value;
    if (!formEl) return
    formEl.resetFields()
    inputForm.value.transferTargetIdList = []
}
function resetFromButton() {
    if (updateButton.value) {
        let partnerId = inputForm.value.id;
        resetForm()
        inputForm.value.id = partnerId;
    } else {
        resetForm()
    }

}
function submitForm() {
    let formEl = formRef.value;
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
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
        getFeeScheduleCurrency(false)
    })
}
async function getPartnerConfigById(id: string) {
    await httpbe.get(`/partner/config/${id}`).then((resp) => {
        inputForm.value = resp.data.payload;
    })
}
function getFeeScheduleCurrency(reset: boolean) {
    httpbe.get(`/fee-config/currency/?currencyIdList=${inputForm.value.currencyTypeIdList}`).then((resp) => {
        feeConfigBriefList.value = resp.data.payload;
        if (reset) {
        let idFeeList= inputForm.value.feeConfigIdList;
        let idFeeNewList= feeConfigBriefList.value.map(x=>x.id);
        inputForm.value.feeConfigIdList = idFeeList.filter(x=>{
            let count=idFeeNewList.filter(a=>a==x).length;
            return count>0
        })
    }
    })
}
function getPartnerListMethod() {
    httpbe.get(`/partner/brief`).then((resp) => {
        ElMessage.success(
            partnerList.value = resp.data.payload,
        );
    })
}
async function initialMethod(id: string) {
    await getPartnerConfigById(id)
    await Promise.all([
        getTransferTargetAddList(), getExchangeRateBriefList(),
        getCurrencyTypeBriefList(), getPartnerListMethod()
    ])
    calculationData()
}
function initialCreateMethod() {
    dialogVisible.value = true;
    updateButton.value = false
    getPartnerListMethod()
}
function initialUpdateMethod(id: string) {
    dialogVisible.value = true;
    updateButton.value = true
    initialMethod(id)
}


defineExpose({
    initialCreateMethod,
    initialUpdateMethod

});

</script>
<style>
.el-select {
    width: 100%;
}
</style>