
<template>
    <div
        class="request-mthod"
        v-loading="loading"
        element-loading-text="eth_getTransactionByHash Loading..."
        element-loading-background="rgba(122, 122, 122, 0.8)"
    >
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">eth_getTransactionByHash</h2>
        <div class="summary">返回通过交易哈希请求的交易信息</div>

        <div class="highlight-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="hash">
                    <el-input v-model="form.hash" />
                </el-form-item>
            </el-form>

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
    hash: "0x6ad03e53cf6f5510cfe051a7e29da451889ded0036a9fddbc02658994fdc8317",
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

const addProject = (type) => {
    form.value[type].push("");
};
const moveProject = (type, index) => {
    form.value[type].splice(index, 1);
};

watch(
    () => form.value,
    () => {
        console.log(89465456465);

        solContent.value = `
await window.ethereum.request({
    "method": [
    "eth_getTransactionByHash",
    "params": [
        "${form.value.hash}"
    ]
});`;
    },
    { immediate: true, deep: true }
);

const runProvider = () => {
    // if (!rpcUrls[network]) {
    //     throw new Error(`Unsupported network: ${network}`);
    // }
    loading.value = true;
    provider.value
        .request({
            method: "eth_getTransactionByHash",
            params: [form.value.hash],
        })
        .then((res) => {
            console.log(res, "成功返回的数据");
            runProviderContent.value = JSON.stringify(res, null, 2);
            loading.value = false;
        })
        .catch((res) => {
            runProviderContent.value = JSON.stringify(res, null, 2);
            loading.value = false;
            console.log(res, "返回错误的数据");
        });
};
</script>
<style lang="scss" scoped>
</style>
