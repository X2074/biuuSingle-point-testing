<template>
    <div
        class="request-mthod"
        v-loading="loading"
        element-loading-text="eth_requestAccounts Loading..."
        element-loading-background="rgba(122, 122, 122, 0.8)"
    >
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">eth_requestAccounts</h2>
        <div class="summary">请求用户提供访问地址</div>
        <div class="content">
            请求用户提供对一个或多个以太坊地址的访问权限。此方法由EIP-1102指定。在内部，此方法需要wallet_requestPermissions调用
            的权限eth_accounts。
        </div>

        <div class="highlight-form">
            <div class="highlight">
                <highlightjs autodetect :code="solContent"></highlightjs>
                <!-- <highlightjs autodetect :code="runProviderContent"></highlightjs> -->
            </div>
        </div>
        <div class="footer-btn">
            <el-button type="primary" @click="runProvider">RUN</el-button>
        </div>

        <div class="highlight">
            <!-- <highlightjs autodetect :code="solContent"></highlightjs> -->
            <highlightjs autodetect :code="runProviderContent"></highlightjs>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, toRaw, watch } from "vue";
import store from "@/store";

let form = ref({
    address: [""],
});

let runProviderContent = ref("null");
let solContent = ref("");
let provider = ref(null);
let loading = ref(false);
onMounted(async () => {
    console.log(store.getters.providers, "store.getters.providers");
    provider.value = store.getters.providers.provider;
    console.log(provider.value, "provider.value");
});

watch(
    () => form.value,
    () => {
        solContent.value = `
await window.ethereum.request({
    "method": "eth_requestAccounts",
    "params":[]
});`;
    },
    { immediate: true, deep: true }
);

const runProvider = () => {
    loading.value = true;
    provider.value
        .request({
            method: "eth_requestAccounts",
            params: [],
        })
        .then((res) => {
            console.log(res, "成功返回的数据");
            runProviderContent.value = JSON.stringify(res, null, 2);
            loading.value = false;
        })
        .catch((res) => {
            runProviderContent.value = JSON.stringify(res);
            loading.value = false;
            console.log(res, "返回错误的数据");
        });
};
</script>
<style lang="scss" scoped>
</style>
