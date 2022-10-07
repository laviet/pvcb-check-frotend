<template>
    <el-dialog v-model="dialogVisible" title="Tạo biểu phí" width="800px" :before-close="closeMethod"
        :close-on-click-modal="false" top="2vh">
        <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
            label-position="left">
            <el-form-item label="Loại tiền tệ" prop="currencyId">
                <el-select v-model="inputForm.currencyId" @change="changeCurrencyMethod()"
                    placeholder="Chọn loại tiền tệ" style="width: 100%">
                    <el-option v-for="item in currencyTypeBriefList" :key="item.id" :value="item.id" :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Tên biểu phí" prop="name">
                <el-input v-model="inputForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Trạng thái" prop="status">
                <el-radio-group v-model="inputForm.status">
                    <el-radio label="ACTIVE">Kích hoạt</el-radio>
                    <el-radio label="INACTIVE">Bỏ kích hoạt</el-radio>
                </el-radio-group>
            </el-form-item>
            <span v-if="currencySelect=='JPY'">
                <el-form-item label="Đến tài khoản" prop="mizuhoBank">
                    <el-radio-group v-model="inputForm.mizuhoBank">
                        <el-radio label="IN_MIZUHO">Mở tại Mizuho</el-radio>
                        <el-radio label="OUT_MIZUHO">Không mở tại Mizuho</el-radio>
                    </el-radio-group>
                </el-form-item>
            </span>
            <span v-if="currencySelect=='SGD'">
                <el-form-item label="Đến ngân hàng" prop="singaporeBank">
                    <el-radio-group v-model="inputForm.singaporeBank">
                        <el-radio label="IN_SINGAPORE">Ở Singapore</el-radio>
                        <el-radio label="OUT_SINGAPORE">Không ở Singapore</el-radio>
                    </el-radio-group>
                </el-form-item>
            </span>
            <div style="font-weight: bold">1. Phí PVcomBank</div>
            <br />
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Theo số tiền" prop="pvComNumber">
                        <el-input type="number" v-model="inputForm.pvComNumber">
                            <template #append>
                                <el-select v-model="inputForm.pvComNumberCurrency" placeholder="Chọn"
                                    style="width: 80px">
                                    <el-option v-for="item in currencyList" :key="item" :label="item" :value="item" />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Theo phần trăm" prop="pvComPercent">
                        <el-input type="number" v-model="inputForm.pvComPercent">
                            <template #append>
                                %
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Tối thiểu" prop="pvComMin">
                        <el-input type="number" v-model="inputForm.pvComMin">
                            <template #append>
                                <el-select v-model="inputForm.pvComMinCurrency" placeholder="Chọn" style="width: 80px">
                                    <el-option v-for="item in currencyList" :key="item" :label="item" :value="item" />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tối đa" prop="pvComMax">
                        <el-input type="number" v-model="inputForm.pvComMax">
                            <template #append>
                                <el-select v-model="inputForm.pvComMaxCurrency" placeholder="Chọn" style="width: 80px">
                                    <el-option v-for="item in currencyList" :key="item" :label="item" :value="item" />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <div style="font-weight: bold">2. Phí ngân hàng nước ngoài/ngân hàng đại lý thu
            </div>
            <br />
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Theo số tiền" prop="moneyNumber">
                        <el-input type="number" v-model="inputForm.moneyNumber">
                            <template #append>
                                <el-select v-model="inputForm.moneyNumberCurrency" placeholder="Chọn"
                                    style="width: 80px">
                                    <el-option v-for="item in currencyList" :key="item" :label="item" :value="item" />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Theo phần trăm" prop="moneyPercent">
                        <el-input type="number" v-model="inputForm.moneyPercent" >
                            <template #append>
                                %
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Tối thiểu" prop="moneyMin">
                        <el-input type="number" v-model="inputForm.moneyMin">
                            <template #append>
                                <el-select v-model="inputForm.moneyMinCurrency" placeholder="Chọn" style="width: 80px">
                                    <el-option v-for="item in currencyList" :key="item" :label="item" :value="item" />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tối đa" prop="moneyMax">
                        <el-input type="number" v-model="inputForm.moneyMax">
                            <template #append>
                                <el-select v-model="inputForm.moneyMaxCurrency" placeholder="Chọn" style="width: 80px">
                                    <el-option v-for="item in currencyList" :key="item" :label="item" :value="item" />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <div style="font-weight: bold">3. Điện phí</div>
            <br />
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Theo số tiền" prop="electricNumber">
                        <el-input type="number" v-model="inputForm.electricNumber">
                            <template #append>
                                <el-select v-model="inputForm.electricNumberCurrency" placeholder="Chọn"
                                    style="width: 80px">
                                    <el-option label="USD" value="USD" />
                                </el-select>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                    <el-form-item label="Theo phần trăm" prop="electricPercent">
                        <el-input type="number" v-model="inputForm.electricPercent" />
                    </el-form-item>
                </el-col> -->
            </el-row>
            <!-- <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Tối thiểu" prop="electricMin">
                        <el-input type="number" v-model="inputForm.electricMin" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tối đa" prop="electricMax">
                        <el-input type="number" v-model="inputForm.electricMax" />
                    </el-form-item>
                </el-col>
            </el-row> -->
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-checkbox v-model="createOther" label="Tạo thêm" style="margin-right: 15px" />
                <el-button type="warning" @click="resetForm()">Reset</el-button>
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
const createOther = ref(false);
const currencyTypeBriefList = ref<NameObject[]>([])
const currencySelect = ref()
const currencyList = ref<string[]>([])
interface NameObject {
    id: "",
    name: "",
}

const inputForm = reactive({
    currencyId: String(),
    name: String(),
    status: "ACTIVE",

    pvComNumber: "",
    pvComNumberCurrency: "",
    pvComPercent: "",
    pvComMin: "",
    pvComMinCurrency: "",
    pvComMax: "",
    pvComMaxCurrency: "",

    moneyNumber: "",
    moneyNumberCurrency: "",
    moneyPercent: "",
    moneyMin: "",
    moneyMinCurrency: "",
    moneyMax: "",
    moneyMaxCurrency: "",

    electricNumber: "",
    electricNumberCurrency: "USD",
    electricPercent: "",
    electricMin: "",
    electricMax: "",

    mizuhoBank: "",
    singaporeBank: "",
})
const rulesData = reactive<FormRules>({
    name: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    status: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    currencyId: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    mizuhoBank: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
    singaporeBank: [{ required: true, message: "Thông tin không được để trống", trigger: 'change' }],
})
function closeMethod() {
    dialogVisible.value = false;
    emit('closeDialog')
    setTimeout(() => {
        createOther.value = false;
        resetForm()
    }, 300);

}
function resetForm() {
    resetCurrencySelect()
    let formEl = formRef.value;
    if (!formEl) return
    formEl.resetFields()
}
function changeCurrencyMethod() {
    currencySelect.value = currencyTypeBriefList.value.filter(a => a.id == inputForm.currencyId)[0].name;
    resetCurrencySelect()
    currencyList.value.push(currencySelect.value)
    if (currencySelect.value != "USD") {
        currencyList.value.push("USD")
    }

}
function resetCurrencySelect() {
    currencyList.value = []
    inputForm.pvComNumberCurrency = ""
    inputForm.pvComMinCurrency = ""
    inputForm.pvComMaxCurrency = ""
    inputForm.moneyNumberCurrency = ""
    inputForm.moneyMinCurrency = ""
    inputForm.moneyMaxCurrency = ""
}

function submitForm() {
    let formEl = formRef.value;
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            loaddingButton.value = true;
            httpbe.post(`/fee-schedule`, inputForm).then((resp) => {
                ElMessage.success(
                    resp.data.message,
                );
                if (createOther.value) {
                    setTimeout(() => {
                        resetForm();
                    }, 500);
                } else {
                    setTimeout(() => {
                        closeMethod()
                    }, 500);
                }
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
    });

}
function getCurrencyTypeBriefList() {
    httpbe.get(`/currency-type/other`).then((resp) => {
        currencyTypeBriefList.value = resp.data.payload;
    })
}
function initialMethod() {
    dialogVisible.value = true;
    getCurrencyTypeBriefList()
}

defineExpose({
    initialMethod,
});

</script>