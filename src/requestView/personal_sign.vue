<template>
    <div class="request-mthod">
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">personal_sign</h2>
        <div class="summary">向用户提出纯文本签名</div>
        <div class="content">
            向用户提供纯文本签名并返回签名后的响应。在签名消息前添加一个安全前缀，以防止挑战诱骗用户签署金融交易。
            此方法要求用户首先授予与其帐户交互的权限，因此请务必先
            调用eth_requestAccounts（推荐）或。wallet_requestPermissions
        </div>

        <div class="highlight-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="参数">
                    <el-input
                        placeholder="请输入十六进制编码 UTF-8 字符串"
                        v-model="form.content"
                    />
                </el-form-item>
                <el-form-item label="address">
                    <el-input
                        placeholder="请求的签名账户的地址"
                        v-model="form.address"
                    />
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
    content:
        "0x506c65617365207369676e2074686973206d65737361676520746f20636f6e6669726d20796f7572206964656e746974792e",
    address: "0x4445bbd1f0942857741eeba3b36970390e9cb887",
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
    "method": "personal_sign",
    "params": [
        ${form.value.content},
        ${form.value.address}
    ],
});`;
    },
    { immediate: true, deep: true }
);

const runProvider = () => {
    provider.value
        .request({
            method: "personal_sign",
            params: [form.value.content, form.value.address],
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
