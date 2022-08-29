<template>
    <div>this is qr code {{value}}</div>
    <qrcode-vue :value="value" :size="size" level="H" />
    <div>Mã Code: EP7G7EVHLGNC2AS3B57LT3X34OHH3URL</div>
    <div>android: <qrcode-vue :value="android" :size="size" level="H" /></div>
    <br/>
    <br/>
    <br/>
    <div>ios: <qrcode-vue :value="ios" :size="size" level="H" /></div>
</template>
<script lang="ts" setup>
import QrcodeVue from 'qrcode.vue'
import { ref } from "vue";
const size=ref(300)
const value=ref('otpauth://totp/pvcombank?secret=EP7G7EVHLGNC2AS3B57LT3X34OHH3URL')
const android=ref('https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2')
const ios=ref('https://apps.apple.com/app/google-authenticator/id388497605')
</script>