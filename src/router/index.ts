import { createRouter, createWebHistory } from 'vue-router'


// 引入文件，动态路由
const routes = <any>[
    { path: '/:pathMath(.*)', redirect: '/wallet_addEthereumChain' },
    {
        path: "/",
        name: "",
        redirect: '/wallet_addEthereumChain',
    },
    {
        path: '/wallet_addEthereumChain',
        name: 'wallet_addEthereumChain',
        component: () => import("../requestView/wallet_addEthereumChain.vue")
    },
    {
        path: '/wallet_switchEthereumChain',
        name: 'wallet_switchEthereumChain',
        component: () => import("../requestView/wallet_switchEthereumChain.vue")
    },
    {
        path: '/wallet_getPermissions',
        name: 'wallet_getPermissions',
        component: () => import("../requestView/wallet_getPermissions.vue")
    },
    {
        path: '/wallet_requestPermissions',
        name: 'wallet_requestPermissions',
        component: () => import("../requestView/wallet_requestPermissions.vue")
    },
    {
        path: '/personal_sign',
        name: 'personal_sign',
        component: () => import("../requestView/personal_sign.vue")
    },
    {
        path: '/wallet_watchAsset',
        name: 'wallet_watchAsset',
        component: () => import("../requestView/wallet_watchAsset.vue")
    },
    {
        path: '/wallet_getCallsStatus',
        name: 'wallet_getCallsStatus',
        component: () => import("../requestView/wallet_getCallsStatus.vue")
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes
})
// 全局前置守卫 按照创建顺序调用 守卫是异步执行的

export default router
