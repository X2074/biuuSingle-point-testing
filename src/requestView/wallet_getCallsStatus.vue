<template>
    <div class="request-mthod">
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">wallet_getCallsStatus</h2>
        <div class="summary">获取多个批次的调用状态</div>
        <div class="content">
            获取先前使用 发送的一批调用的状态。由EIP-5792wallet_sendCalls指定。
        </div>

        <div class="highlight-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="Batch ID">
                    <el-input v-model="form.id" />
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
    id: "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
});

let runProviderContent = ref("null");
let solContent = ref("");
let provider = ref(null);
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
    "method": "wallet_getCallsStatus",
    "params": [ ${form.value.id}],
});`;
    },
    { immediate: true, deep: true }
);

const runProvider = () => {
    provider.value
        .request({
            method: "wallet_getCallsStatus",
            params: [form.value.chainId],
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
