

<template>
    <div class="request-mthod">
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">Ethereum</h2>
        <div class="summary">通过window.Ethereum 监听钱包的一系列变化</div>

        <div class="highlight-form">
            <div class="highlight">
                <highlightjs autodetect :code="accountContent"></highlightjs>
                account: {{ account }}
            </div>
        </div>

        <div class="highlight">
            <highlightjs autodetect :code="chainContent"></highlightjs>
            chainId: {{ chainId }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, toRaw, watch } from "vue";
import store from "@/store";

let form = ref({});

let runProviderContent = ref("null");
let accountContent = ref(`
window.ethereum.on('accountsChanged',function (e) {});`);
let chainContent = ref(`
window.ethereum.on('chainChanged',function (e) {});`);
let provider = ref(null);
let loading = ref(false);
let account: any = ref([]);
let chainId = ref(null);
onMounted(async () => {
    console.log(store.getters.providers, "store.getters.providers");
    provider.value = store.getters.providers.provider;
    console.log(provider.value, "provider.value");
    chainId.value = window.ethereum.chainId;
    account.value = window.ethereum.accounts;
    window.ethereum.on("accountsChanged", function (e) {
        account.value = e;
    });
    window.ethereum.on("chainChanged", function (e) {
        chainId.value = e;
    });
});
</script>
<style lang="scss" scoped>
</style>
