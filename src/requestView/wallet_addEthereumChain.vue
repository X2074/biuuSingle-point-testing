<template>
    <div
        class="request-mthod"
        v-loading="loading"
        element-loading-text="wallet_addEthereumChain Loading..."
        element-loading-background="rgba(122, 122, 122, 0.8)"
    >
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">wallet_addEthereumChain</h2>
        <div class="summary">向钱包添加以太坊链</div>
        <div class="content">
            创建一个确认消息，要求用户将指定的链添加到钱包应用。调用者必须指定链
            ID 和一些链元数据。由EIP-3085指定。
        </div>

        <div class="highlight-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="chainId">
                    <el-input v-model="form.chainId" />
                </el-form-item>
                <el-form-item label="chainName">
                    <el-input v-model="form.chainName" />
                </el-form-item>
                <el-form-item label="rpcUrls">
                    <div
                        v-for="(item, index) in form.rpcUrls"
                        class="flex-between"
                    >
                        <el-input v-model="form.rpcUrls[index]" />
                        <div class="icon" @click="addProject('rpcUrls')">+</div>
                        <div
                            v-if="index"
                            class="icon"
                            @click="moveProject('rpcUrls', index)"
                        >
                            -
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="iconUrls">
                    <div
                        v-for="(item, index) in form.iconUrls"
                        class="flex-between"
                    >
                        <el-input v-model="form.iconUrls[index]" />
                        <div class="icon" @click="addProject('iconUrls')">
                            +
                        </div>
                        <div
                            v-if="index"
                            class="icon"
                            @click="moveProject('iconUrls', index)"
                        >
                            -
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="nativeCurrency.name">
                    <el-input v-model="form.nativeCurrency.name" />
                </el-form-item>
                <el-form-item label="nativeCurrency.symbol">
                    <el-input v-model="form.nativeCurrency.symbol" />
                </el-form-item>
                <el-form-item label="nativeCurrency.decimals">
                    <el-input v-model="form.nativeCurrency.decimals" />
                </el-form-item>
                <el-form-item label="blockExplorerUrls">
                    <div
                        v-for="(item, index) in form.blockExplorerUrls"
                        class="flex-between"
                    >
                        <el-input v-model="form.blockExplorerUrls[index]" />
                        <div
                            class="icon"
                            @click="addProject('blockExplorerUrls')"
                        >
                            +
                        </div>
                        <div
                            v-if="index"
                            class="icon"
                            @click="moveProject('blockExplorerUrls', index)"
                        >
                            -
                        </div>
                    </div>
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
    chainName: "Gnosis",
    rpcUrls: ["https://rpc.gnosischain.com"],
    iconUrls: [
        "https://xdaichain.com/fake/example/url/xdai.svg",
        "https://xdaichain.com/fake/example/url/xdai.png",
    ],
    nativeCurrency: {
        name: "XDAI",
        symbol: "XDAI",
        decimals: "18",
    },
    blockExplorerUrls: ["https://blockscout.com/poa/xdai/"],
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
    "method": "wallet_addEthereumChain",
    "params": [
        {
            chainId: ${form.value.chainId},
            blockExplorerUrls: ${JSON.stringify(form.value.blockExplorerUrls)},
            chainName: ${form.value.chainName},
            iconUrls: ${JSON.stringify(form.value.iconUrls)},
            nativeCurrency: {
                decimals: ${form.value.nativeCurrency.decimals},
                name: ${form.value.nativeCurrency.name},
                symbol: ${form.value.nativeCurrency.symbol}
            },
            rpcUrls: ${JSON.stringify(form.value.rpcUrls)}
        }
    ],
});`;
    },
    { immediate: true, deep: true }
);

const runProvider = () => {
    loading.value = true;
    provider.value
        .request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: form.value.chainId,
                    blockExplorerUrls: toRaw(form.value.blockExplorerUrls),
                    chainName: form.value.chainName,
                    iconUrls: toRaw(form.value.iconUrls),
                    nativeCurrency: {
                        decimals: Number(form.value.nativeCurrency.decimals),
                        name: form.value.nativeCurrency.name,
                        symbol: form.value.nativeCurrency.symbol,
                    },
                    rpcUrls: toRaw(form.value.rpcUrls),
                },
            ],
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
<style lang="scss" scoped></style>
