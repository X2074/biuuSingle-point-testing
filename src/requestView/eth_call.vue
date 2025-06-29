
<template>
    <div
        class="request-mthod"
        v-loading="loading"
        element-loading-text="eth_call Loading..."
        element-loading-background="rgba(122, 122, 122, 0.8)"
    >
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">eth_call</h2>
        <div class="summary">立即执行新的调用，而无需在区块链上创建交易</div>

        <div class="highlight-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="to">
                    <el-input v-model="form.to" />
                </el-form-item>
                <el-form-item label="from">
                    <el-input v-model="form.from" />
                </el-form-item>
                <el-form-item label="data">
                    <el-input v-model="form.data" />
                </el-form-item>
                <el-form-item label="gas">
                    <el-input v-model="form.gas" />
                </el-form-item>
                <el-form-item label="value">
                    <el-input v-model="form.value" />
                </el-form-item>
                <el-form-item label="gasPrice">
                    <el-input v-model="form.gasPrice" />
                </el-form-item>
                <el-form-item label="nonce">
                    <el-input v-model="form.nonce" />
                </el-form-item>
                <el-form-item label="maxPriorityFeePerGas">
                    <el-input v-model="form.maxPriorityFeePerGas" />
                </el-form-item>
                <el-form-item label="maxFeePerGas">
                    <el-input v-model="form.maxFeePerGas" />
                </el-form-item>
                <!-- <el-form-item label="accessList">
                    <el-input v-model="form.accessList" />
                </el-form-item> -->
                <el-form-item label="accessList">
                    <div
                        v-for="(item, index) in form.accessList"
                        class="flex-between"
                    >
                        <el-input v-model="form.accessList[index]" />
                        <div class="icon" @click="addProject('accessList')">
                            +
                        </div>
                        <div
                            v-if="index"
                            class="icon"
                            @click="moveProject('accessList', index)"
                        >
                            -
                        </div>
                    </div>
                </el-form-item>
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
    to: "0x69498dd54bd25aa0c886cf1f8b8ae0856d55ff13",
    from: "0x4445bbd1f0942857741eeba3b36970390e9cb887",
    gas: "0x76c0",
    value: "0x1",
    data: "0x",
    gasPrice: "0x4a817c800",
    nonce: "",
    maxPriorityFeePerGas: "",
    maxFeePerGas: "",
    accessList: [""],
    chainId: "",
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
    "eth_sendTransaction",
    "params": [{
        to: "${form.value.to}",
        from: "${form.value.from}",
        gas: ${form.value.gas},
        value: "${form.value.value}",
        data: "${form.value.data}",
        gasPrice: "${form.value.gasPrice}",
        nonce: "${form.value.nonce}",
        maxPriorityFeePerGas: "${form.value.maxPriorityFeePerGas}",
        maxFeePerGas: "${form.value.maxFeePerGas},
        accessList: "${form.value.accessList}",
        chainId: "${form.value.chainId}"
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
    loading.value = true;
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
