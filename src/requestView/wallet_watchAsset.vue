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
                <el-form-item label="type">
                    <el-input v-model="form.type" />
                </el-form-item>
                <el-form-item label="address">
                    <el-input v-model="form.options.address" />
                </el-form-item>
                <el-form-item label="address">
                    <el-input v-model="form.options.address" />
                </el-form-item>
                <el-form-item label="symbol">
                    <el-input v-model="form.options.symbol" />
                </el-form-item>
                <el-form-item label="decimals">
                    <el-input v-model="form.options.decimals" />
                </el-form-item>
                <el-form-item label="image">
                    <el-input v-model="form.options.image" />
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
    type: "ERC20",
    options: {
        address: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        symbol: "FOO",
        decimals: 18,
        image: "https://foo.io/token-image.svg",
    },
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
    "method": "wallet_watchAsset",
    "params": {
            type:"${form.value.type}",
            options: {
                address: "${form.value.options.address}",
                symbol: "${form.value.options.symbol}",
                decimals: ${form.value.options.decimals},
                image: "${form.value.options.image}"
            }
    }
});`;
    },
    { immediate: true, deep: true }
);

const runProvider = () => {
    // if (!rpcUrls[network]) {
    //     throw new Error(`Unsupported network: ${network}`);
    // }
    console.log(132132123132);

    const data = {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: ["TnYocuWQ8wxLSuendWjNm5cup54b55VbjQm", 0],
    };
    var request = new Request("https://43.163.228.115:18131", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(data),
    });

    fetch(request).then((data) => {
        console.log(data, "datadatadatadata");
    });

    // provider.value
    //     .request({
    //         method: "wallet_watchAsset",
    //         params: {
    //             type: form.value.type,
    //             options: {
    //                 decimals: Number(form.value.options.decimals),
    //                 symbol: form.value.options.symbol,
    //                 address: form.value.options.address,
    //                 image: form.value.options.image,
    //             },
    //         },
    //     })
    //     .then((res) => {
    //         console.log(res, "成功返回的数据");
    //     })
    //     .catch((res) => {
    //         runProviderContent.value = JSON.stringify(res);
    //         console.log(res, "返回错误的数据");
    //     });
};
</script>
<style lang="scss" scoped>
</style>
