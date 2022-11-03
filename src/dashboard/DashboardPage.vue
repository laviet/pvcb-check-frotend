<template>
    <div>
        <!-- <el-button @click="logoutMethod()">ABC</el-button> -->
    </div>
</template>

<script lang="ts" setup>
import httpbe from "@/http-be";
// import httpbe from "@/http-fees";
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import jwt_decode from "jwt-decode";
import TokenReponse, { DecodedToken } from "@/check/interface/DataModel";
const route = useRoute();
function logoutMethod() {
    localStorage.removeItem("userInfo")
    const redirectUri = "http://10.1.136.185:3001/login";
    window.location.href = `https://connect-internal.pvcb.vn/auth/realms/pvcombank-internal/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;
}

const a = ref()
function fetchData() {
    const mycode = route.query.code;
    httpbe.get(`/keycloak/token?code=${mycode}`).then((resp) => {
        let mydata: TokenReponse = resp.data.payload;
        let decoded: DecodedToken = jwt_decode(mydata.access_token);
        console.log(decoded)
        mydata.full_name = decoded.name;
        localStorage.setItem('userInfo', JSON.stringify(mydata));
        router.push({
            name: "listCheckName"
            // name: "transferTargetName"
        });
    }).catch(err => {
        console.log(err.data.message)
        throw null;
    })
}
onMounted(() => {
    fetchData()
});

</script>