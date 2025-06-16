<template>
  <div class="request-mthod">
    <h3 v-if="!provider">provider为空，请刷新页面重试</h3>
    <h2 class="title">eth_syncing</h2>
    <div class="summary">检查当前节点是否正在同步区块链数据。</div>
    <div class="content">Parameters:此方法不需要参数。</div>

    <div class="highlight-form">
      <div class="highlight">
        <highlightjs autodetect :code="solContent"></highlightjs>
        <!-- <highlightjs autodetect :code="runProviderContent"></highlightjs> -->
      </div>
    </div>
    <div class="footer-btn">
      <el-button type="primary" @click="runProvider">RUN</el-button>
    </div>

    <div class="highlight">
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
const requestParams = `{
  method: "eth_syncing",
  params: [],
}`;

let solContent = ref(`{
  method: "eth_syncing",
  params: [],
}`);
let provider: any = ref(null);
onMounted(async () => {
  console.log(store.getters.providers, "store.getters.providers");
  if (!store.getters.providers) return;
  provider.value = store.getters.providers.provider;
  console.log(provider.value, "provider.value");
});

const runProvider = () => {
  provider.value
    .request(requestParams)
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
.highlight-form {
  justify-content: end;
}
</style>
