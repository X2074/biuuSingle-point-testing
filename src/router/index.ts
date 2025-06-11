import { createRouter, createWebHashHistory } from 'vue-router'

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

];


const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 全局前置守卫 按照创建顺序调用 守卫是异步执行的

export default router
