<template>
    <div>this is test</div>
    <el-button @click="fetchData()">OK</el-button>
    
</template>
<script lang="ts" setup>
import httpbe from "@/http-mfa";
function fetchData() {
    httpbe.post(`/mfa/registry`).then((resp) => {
        alert("thanh cong")
        let mydata = resp.data.payload;
        console.log(mydata)
    }).catch(err => {
        alert("loi roi")
        console.log(err)
    })
}


</script>