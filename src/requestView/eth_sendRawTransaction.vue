<template>
    <div
        class="request-mthod"
        v-loading="loading"
        element-loading-text="eth_sendRawTransaction Loading..."
        element-loading-background="rgba(122, 122, 122, 0.8)"
    >
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">eth_sendRawTransaction</h2>
        <div class="summary">
            <p>
                用于提交原始签名交易。开发者可以通过web3.js或ethers.js等外部库创建并签署交易。对于EIP-4844类型的交易，其原始数据格式必须采用网络传输格式，这意味着需要包含以下组件：
            </p>
            <ul>
                <li>数据块（blobs）</li>
                <li>KZG承诺（KZG commitments）</li>
                <li>KZG证明（KZG proofs）</li>
            </ul>
        </div>
        <div class="content"></div>

        <div class="highlight-form">
            <el-form :model="form" label-width="auto">
                <el-form-item label="Transaction">
                    <el-input v-model="form.Transaction" class="my-input" />
                </el-form-item>
            </el-form>
        </div>
        <div class="highlight right-highlight">
            <highlightjs autodetect :code="solContent"></highlightjs>
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
    Transaction:
        "0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833",
});

let runProviderContent = ref("null");
let solContent = ref("");
let provider: any = ref(null);
let loading = ref(false);
onMounted(async () => {
    if (!store.getters.providers) return;
    provider.value = store.getters.providers.provider;
    console.log(provider.value, "provider.value");
});

watch(
    () => form.value,
    () => {
        solContent.value = `
await window.ethereum.request({
  method: "eth_sendRawTransaction",
  params: ['${form.value.Transaction}'],
});`;
    },
    { immediate: true, deep: true }
);

const runProvider = () => {
    loading.value = true;

    provider.value
        .request({
            method: "eth_sendRawTransaction",
            params: [form.value.Transaction],
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
ul {
    padding-left: 30px;
    li {
        list-style: circle;
    }
}
.el-form {
    width: 100%;
}
.my-input {
    min-width: 500px;
    width: 100%;
}
.right-highlight {
    width: auto;
}
</style>
