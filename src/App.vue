<template>
    <el-container class="layout-container-demo" style="height: 100%">
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu :default-openeds="['1', '3']">
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
                                >{{ item.name }}</el-menu-item
                            >
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title> Ethereum provider API </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1"
                                >accountsChanged</el-menu-item
                            >
                            <el-menu-item index="2-2"
                                >chainChanged</el-menu-item
                            >
                            <el-menu-item index="2-2"
                                >networkChanged</el-menu-item
                            >
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 16px">
                <div class="toolbar">biuu钱包单点测试</div>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { JsonRpcApi } from "@/utils/JSONRPCAPI";
import store from "@/store";

store.dispatch("getProviders");
onMounted(() => {
    console.log(store, "store");
});
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
