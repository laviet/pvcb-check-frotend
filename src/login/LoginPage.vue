<template>
    <div style="text-align: center; margin-top: 50px">
        Đăng nhập:
        <el-button type="success" @click="loginPageMethod()">OK</el-button>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import router from "@/router";
import { urlFEFees } from "@/functionCommon/DataConstant"
function loginPageMethod() {
    // const redirectUri = "http://10.1.136.185:3001/dashboard";
    const redirectUri = urlFEFees+"/dashboard";
    window.location.href = `https://connect-internal.pvcb.vn/auth/realms/pvcombank-internal/protocol/openid-connect/auth?client_id=digibank&state=589i2mgvijs&scope=openid&response_type=code&redirect_uri=${redirectUri}`;
}
function fetchData() {
    const loggedIn = localStorage.getItem('userInfo');
    if (loggedIn) {
        router.push({
            // name: "listCheckName"
            name: "transferTargetName"
        });
    }
}
onMounted(() => {
    fetchData()
});
</script>