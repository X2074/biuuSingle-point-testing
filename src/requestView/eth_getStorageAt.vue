
<template>
    <div
        class="request-mthod"
        v-loading="loading"
        element-loading-text="eth_getStorageAt Loading..."
        element-loading-background="rgba(122, 122, 122, 0.8)"
    >
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">eth_getStorageAt</h2>
        <div class="summary">返回给定地址的存储位置的值</div>

        <div class="highlight-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="address">
                    <el-input v-model="form.address" />
                </el-form-item>
                <el-form-item label="storage">
                    <el-input v-model="form.storage" />
                </el-form-item>
                <el-form-item label="Block Tag">
                    <el-select v-model="form.block" placeholder="请选择...">
                        <el-option label="earliest" value="value" />
                        <el-option label="finalized" value="value" />
                        <el-option label="safe" value="value" />
                        <el-option label="latest" value="value" />
                        <el-option label="pending" value="value" />
                    </el-select>
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
    address: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
    storage: "0x0",
    block: "latest",
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
    "eth_getStorageAt",
    "params": [
        "${form.value.address}",
        "${form.value.storage}”,
        "${form.value.block}"
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
            method: "eth_getStorageAt",
            params: [form.value.address, form.value.storage, form.value.block],
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
