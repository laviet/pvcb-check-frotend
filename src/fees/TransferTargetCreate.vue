<template>
    <el-dialog v-model="dialogVisible" title="Điều khoản hợp đồng" width="70%" :before-close="handleClose"
        :close-on-click-modal="false">
        <div>HỢP ĐỒNG MUA BÁN NGOẠI TỆ</div>
        {{props.mydata1}}
        <div>
            ĐĂNG KÝ KIÊM ĐIỀU KHOẢN, ĐIỀU KIỆN DỊCH VỤ CHUYỂN TIỀN ĐI QUỐC TẾ TRÊN
            KÊNH SỐ PVCOMBANK
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeMethod()">Hủy</el-button>
                <el-button type="primary" @click="submitForm()">OK</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch, toRefs, defineExpose, defineEmits, inject, defineProps } from "vue";
const dialogVisible = ref(false);
const emit = defineEmits(['closeDialog'])
const props = defineProps({
    mydata: {
        type: String,
        default: ()=>"abc",
    },
    mydata1: {
        type: Boolean,
        default: ()=>false,
    }
})
const handleClose = (done: () => void) => {
    // props.dialogVisible = false;
}
function initialMethod() {
    dialogVisible.value = true;
    const userLocation = props.mydata1
}
function submitForm() {
    alert("submit")
}
function closeMethod() {
    dialogVisible.value = false;
    emit('closeDialog', "la viet")
}
 
defineExpose({
    initialMethod,
});

</script>