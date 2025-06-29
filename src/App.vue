<template>
    <el-container class="layout-container-demo" style="height: 100%">
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu :default-openeds="['1']" :default-active="activeNmae">
                    <el-sub-menu index="1">
                        <template #title> JSON-RPC API </template>
                        <el-menu-item-group>
                            <el-menu-item
                                v-for="item in JsonRpcApi"
                                :key="item.name"
                                :index="item.name"
                                :class="
                                    item.completeness >= 80
                                        ? 'completeness-hight'
                                        : item.completeness < 80 &&
                                          item.completeness >= 50
                                        ? 'completeness-medium'
                                        : 'completeness-low'
                                "
                                @click="toPage(item)"
                                >{{ item.name }}</el-menu-item
                            >
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title> Ethereum provider API </template>
                        <el-menu-item-group>
                            <el-menu-item
                                @click="toPage({ url: '/walltChanged' })"
                                index="2-1"
                                >walltChanged</el-menu-item
                            >
                            <!-- <el-menu-item index="2-2"
                                >chainChanged</el-menu-item
                            >
                            <el-menu-item index="2-2"
                                >networkChanged</el-menu-item
                            > -->
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-header
                style="text-align: right; font-size: 16px; padding-top: 10px"
            >
                <!-- <div class="toolbar" v-for="item in walltList">
                    {{ item.info.name }}单点测试 -->
                <el-select
                    v-model="walletValue"
                    placeholder="Select"
                    size="large"
                    style="width: 240px"
                    @change="changeWallet"
                >
                    <el-option
                        v-for="item in walltList"
                        :key="item.info.uuid"
                        :label="item.info.name"
                        :value="item.info.uuid"
                    />
                </el-select>
                <!-- </div> -->
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { JsonRpcApi } from "@/utils/JSONRPCAPI";
import store from "@/store";
import { useRouter } from "vue-router";
let router = useRouter();
let walltList = ref([]);
let walletValue = ref("350670db-19fa-4704-a166-e52e178b59d2");
let activeNmae = ref("");
store.dispatch("getProviders");
function onAnnouncement(event: any) {
    walltList.value.push(event.detail);
    console.log(walltList.value, "调用这个方法啊");
    // if (event.detail.info.uuid == "350670db-19fa-4704-a166-e52e178b59d2") {
    //     context.commit("setProviders", event.detail);
    // }
    //   if (providers.map(p => p.info.uuid).includes(event.detail.info.uuid)) return
    //   providers = [...providers, event.detail]
    //   callback()
}
window.addEventListener("eip6963:announceProvider", onAnnouncement);
window.dispatchEvent(new Event("eip6963:requestProvider"));
onMounted(() => {
    console.log(router.currentRoute.value, "router");
});

// 流程
watch(
    router.currentRoute,
    (newV) => {
        let activeUrl: any = newV.name;
        console.log(newV, "newV");

        JsonRpcApi.forEach((element) => {
            console.log(element, "element");

            if (element.name == activeUrl) {
                activeNmae.value = activeUrl;
                console.log(activeUrl, "indexindexindexindexindex");
            }
        });
    },
    { immediate: true }
);
const changeWallet = (e) => {
    console.log(e, "store");
    let wallletInfo = walltList.value.filter((item) => item.info.uuid == e)[0];
    localStorage.setItem("walletInfo", JSON.stringify(wallletInfo));
    location.reload();
};

const toPage = (data) => {
    console.log(121212);

    router.push(data.url);
};
</script>

<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
    border-right: none;
}
.layout-container-demo .el-main {
    padding: 0;
}
.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
.el-aside {
    width: 300px;
}
.el-menu-item {
    font-size: 14px;
    height: 40px !important;
    line-height: 40px !important;
    font-weight: 700;
}
.is-active {
    background: #2d8cf057;
}
.el-menu-item-group__title {
    display: none !important;
}
.completeness-hight {
    color: green;
}
.completeness-medium {
    color: blue;
}
.completeness-low {
    color: red;
}
</style>
