<template>
    <el-menu style="float:left; border-right: 0" active-text-color="#ffd04b" background-color="#545c64"
        class="el-menu-vertical-demo" default-active="2" text-color="#fff" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1">
            <el-icon>
                <Document />
            </el-icon>
            <span>Danh sách phiên</span>
        </el-menu-item>
        <el-sub-menu>
            <template #title>
                <el-icon>
                    <Reading />
                </el-icon>
                <span>Hướng dẫn</span>
            </template>
            <el-menu-item index="1-4-1">Văn bản quy trình, quy định</el-menu-item>
            <el-menu-item index="1-4-2">Hướng dẫn hậu kiểm</el-menu-item>
        </el-sub-menu>
    </el-menu>

    <!-- this is nav -->
    <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" background-color="#2396BD"
        text-color="#fff" active-text-color="#ffd04b">
        &nbsp;
        <span class="class-nav" @click="collapseMethod()">
            <el-button type="text" style="color: white">
                <el-icon :size="30" v-model="isCollapse">
                    <Expand v-if="isCollapse" />
                    <Fold v-else />
                </el-icon>
            </el-button>
        </span>
        &nbsp; &nbsp;
        <span class="class-nav"><img style="width: 110px" src="@/assets/Logo_PVcombank.png" /></span>
        &nbsp; &nbsp; &nbsp;
        <span class="class-nav">PHÊ DUYỆT HỒ SƠ YÊU CẦU CHUYỂN TIỀN QUỐC TẾ</span>
        <div class="flex-grow-class" />
        <span class="class-nav" style="color: orange">{{ fullName }}</span>
        &nbsp; &nbsp; &nbsp;
        <el-dropdown style="display: block; line-height: 60px;height: 60px;">
            <el-button type="text" style="color: orange">
                <el-icon :size="35">
                    <Avatar />
                </el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logoutMethod()">Đăng xuất</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        &nbsp; &nbsp;&nbsp;
    </el-menu>
    <app-main />
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref, onMounted } from 'vue'
import AppMain from './AppMain.vue'
import TokenReponse from "@/check/interface/DataModel";
import {
    Document,
    Menu as IconMenu,
    Location
} from '@element-plus/icons-vue'


const isCollapse = ref(false)
const fullName = ref()
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const activeIndex = ref('10')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
function collapseMethod() {
    isCollapse.value = !isCollapse.value
}
function logoutMethod() {
    localStorage.removeItem("userInfo")
    const redirectUri = "http://10.1.136.185:3001/login";
    window.location.href = `https://connect-internal.pvcb.vn/auth/realms/pvcombank-internal/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;
}
function fetchData() {
    let data: TokenReponse = JSON.parse(localStorage.getItem("userInfo")!);
    fullName.value = data.full_name
}
onMounted(() => {
    fetchData()
});

</script>

<style>
.flex-grow-class {
    flex-grow: 1;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 600px;
    font-family: Arial;
}

.class-nav {
    color: white;
    line-height: 60px;
    height: 60px;
}

/* .el-menu-item {
    background-color: #1f2d3d !important;
}

.el-menu-item:hover {
    background-color: #49575f !important;
} */
</style>