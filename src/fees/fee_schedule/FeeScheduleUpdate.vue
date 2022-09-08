<template>
    <el-dialog v-model="dialogVisible" title="Sửa loại tiền" width="700px" :before-close="closeMethod"
        :close-on-click-modal="false" top="5vh">
        <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
            label-position="left">
            <el-form-item label="Loại tiền tệ" prop="currencyId">
                <el-select v-model="inputForm.currencyId" placeholder="Chọn loại tiền tệ" style="width: 100%">
                    <el-option v-for="item in currencyTypeBriefList" :key="item.id" :value="item.id" :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Tên biểu phí" prop="name">
                <el-input v-model="inputForm.name"></el-input>
            </el-form-item>
            <div style="font-weight: bold">1. Phí PVcomBank (USD)</div>
            <br />
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Theo số tiền" prop="pvComNumber">
                        <el-input type="number" v-model="inputForm.pvComNumber" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Theo phần trăm" prop="pvComPercent">
                        <el-input type="number" v-model="inputForm.pvComPercent" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Tối thiểu" prop="pvComMin">
                        <el-input type="number" v-model="inputForm.pvComMin" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tối đa" prop="pvComMax">
                        <el-input type="number" v-model="inputForm.pvComMax" />
                    </el-form-item>
                </el-col>
            </el-row>

            <div style="font-weight: bold">2. Phí ngân hàng nước ngoài/ngân hàng đại lý thu (Theo loại tiền đã chọn)
            </div>
            <br />
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Theo số tiền" prop="moneyNumber">
                        <el-input type="number" v-model="inputForm.moneyNumber" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Theo phần trăm" prop="moneyPercent">
                        <el-input type="number" v-model="inputForm.moneyPercent" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Tối thiểu" prop="moneyMin">
                        <el-input type="number" v-model="inputForm.moneyMin" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tối đa" prop="moneyMax">
                        <el-input type="number" v-model="inputForm.moneyMax" />
                    </el-form-item>
                </el-col>
            </el-row>

            <div style="font-weight: bold">3. Điện phí (USD)</div>
            <br />
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Theo số tiền" prop="electricNumber">
                        <el-input type="number" v-model="inputForm.electricNumber" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Theo phần trăm" prop="electricPercent">
                        <el-input type="number" v-model="inputForm.electricPercent" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
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
            </el-row>
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
const currencyTypeBriefList = ref<NameObject[]>([])
interface NameObject {
    id: "",
    name: "",
}

const inputForm = ref({
    id: String(),
    currencyId: String(),
    name: String(),
    pvComNumber: "",
    pvComPercent: "",
    pvComMin: "",
    pvComMax: "",

    moneyNumber: "",
    moneyPercent: "",
    moneyMin: "",
    moneyMax: "",

    electricNumber: "",
    electricPercent: "",
    electricMin: "",
    electricMax: "",
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
function resetForm() {
    let formEl = formRef.value;
    if (!formEl) return
    formEl.resetFields()
}
function submitForm() {
    let formEl = formRef.value;
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            loaddingButton.value = true;
            httpbe.put(`/fee-schedule`, inputForm.value).then((resp) => {
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
    });

}
function getCurrencyTypeBriefList() {
    httpbe.get(`/currency-type/other`).then((resp) => {
        currencyTypeBriefList.value = resp.data.payload;
    })
}
function initialMethod(row: any) {
    dialogVisible.value = true;
    getCurrencyTypeBriefList()
    inputForm.value = row;
    inputForm.value.currencyId = row.currencyType.id

}

defineExpose({
    initialMethod,
});

</script>