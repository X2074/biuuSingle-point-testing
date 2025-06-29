<template>
    <div
        class="request-mthod"
        v-loading="loading"
        element-loading-text="eth_uninstallFilter Loading..."
        element-loading-background="rgba(122, 122, 122, 0.8)"
    >
        <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
        <h2 class="title">eth_uninstallFilter (扩展未实现)</h2>
        <div class="summary">卸载指定 ID 的过滤器，停止监听对应事件</div>
        <div class="content"></div>

        <div class="highlight-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="filterId">
                    <el-input v-model="form.filterId" />
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
    filterId: "0x01",
});

let runProviderContent = ref("null");
let solContent = ref("");
let provider: any = ref(null);
let loading = ref(false);
onMounted(async () => {
    console.log(store.getters.providers, "store.getters.providers");
    if (!store.getters.providers) return;
    provider.value = store.getters.providers.provider;
    console.log(provider.value, "provider.value");
});

const requestParams = `{
  method: "eth_uninstallFilter",
  params: ['${form.value.filterId}'],
}`;
watch(
    () => form.value,
    () => {
        solContent.value = `
await window.ethereum.request({
  method: "eth_uninstallFilter",
  params: ['${form.value.filterId}'],
});`;
    },
    { immediate: true, deep: true }
);

const runProvider = () => {
    loading.value = true;
    provider.value
        .request(requestParams)
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
