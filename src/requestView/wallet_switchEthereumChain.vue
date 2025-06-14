<template>
    <div class="request-mthod">
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">wallet_switchEthereumChain</h2>
        <div class="summary">切换钱包的以太坊链</div>
        <div class="content">
            请求钱包切换其活跃的以太坊链。由EIP-3326指定。
        </div>

        <div class="highlight-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="chainId">
                    <el-input v-model="form.chainId" />
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
    chainId: "0x64",
});

let runProviderContent = ref("null");
let solContent = ref("");
let provider = ref(null);
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
    "method": "wallet_switchEthereumChain",
    "params": [
        {
            chainId: ${form.value.chainId}
        }
    ],
});`;
    },
    { immediate: true, deep: true }
);

const runProvider = () => {
    provider.value
        .request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: form.value.chainId,
                },
            ],
        })
        .then((res) => {
            runProviderContent.value = JSON.stringify(res);
            console.log(res, "成功返回的数据");
        })
        .catch((res) => {
            runProviderContent.value = JSON.stringify(res);
            console.log(res, "返回错误的数据");
        });
};
</script>
<style lang="scss" scoped>
</style>
