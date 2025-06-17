
<template>
    <div class="request-mthod">
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">wallet_watchAsset</h2>
        <div class="summary">添加代币，并返回添加状态：成功、失败</div>
        <div class="content">
            请求用户在 BIUU
            中追踪指定的代币。返回一个布尔值，指示代币是否已成功添加。添加后，该代币将与使用传统方法（例如中心化注册表）添加的代币无区别。由EIP-747引入。
        </div>

        <div class="highlight-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="to">
                    <el-input v-model="form.to" />
                </el-form-item>
                <el-form-item label="from">
                    <el-input v-model="form.from" />
                </el-form-item>
                <el-form-item label="gas">
                    <el-input v-model="form.gas" />
                </el-form-item>
                <el-form-item label="value">
                    <el-input v-model="form.value" />
                </el-form-item>
                <el-form-item label="data">
                    <el-input v-model="form.data" />
                </el-form-item>
                <el-form-item label="gasPrice">
                    <el-input v-model="form.gasPrice" />
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
    to: "0x4B0897b0513FdBeEc7C469D9aF4fA6C0752aBea7",
    from: "0x4445bbd1f0942857741eeba3b36970390e9cb887",
    gas: "0x76c0",
    value: "0x8ac7230489e80000",
    data: "0x",
    gasPrice: "0x4a817c800",
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
    "method": [
    "eth_sendTransaction",
    "params": [{
        to: "${form.value.to}",
        from: "${form.value.from}",
        gas: ${form.value.gas},
        value: "${form.value.value}",
        data: "${form.value.data}",
        gasPrice: "${form.value.gasPrice}"
    }
    ]
});`;
    },
    { immediate: true, deep: true }
);

const runProvider = () => {
    // if (!rpcUrls[network]) {
    //     throw new Error(`Unsupported network: ${network}`);
    // }
    console.log(132132123132);
    provider.value
        .request({
            method: "eth_sendTransaction",
            params: [
                {
                    to: form.value.to,
                    from: form.value.from,
                    gas: form.value.gas,
                    value: form.value.value,
                    data: form.value.data,
                    gasPrice: form.value.gasPrice,
                },
            ],
        })
        .then((res) => {
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
