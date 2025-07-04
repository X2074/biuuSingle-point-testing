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
    {
        path: '/eth_requestAccounts',
        name: 'eth_requestAccounts',
        component: () => import("../requestView/eth_requestAccounts.vue")
    },
    {
        path: '/eth_accounts',
        name: 'eth_accounts',
        component: () => import("../requestView/eth_accounts.vue")
    },
    {
        path: '/eth_sendTransaction',
        name: 'eth_sendTransaction',
        component: () => import("../requestView/eth_sendTransaction.vue")
    },
    {
        path: '/web3_clientVersion',
        name: 'web3_clientVersion',
        component: () => import("../requestView/web3_clientVersion.vue")
    },
    {
        path: '/eth_blockNumber',
        name: 'eth_blockNumber',
        component: () => import("../requestView/eth_blockNumber.vue")
    },
    {
        path: '/eth_call',
        name: 'eth_call',
        component: () => import("../requestView/eth_call.vue")
    },
    {
        path: '/eth_chainId',
        name: 'eth_chainId',
        component: () => import("../requestView/eth_chainId.vue")
    },
    {
        path: '/eth_coinbase',
        name: 'eth_coinbase',
        component: () => import("../requestView/eth_coinbase.vue")
    },
    {
        path: '/eth_gasPrice',
        name: 'eth_gasPrice',
        component: () => import("../requestView/eth_gasPrice.vue")
    },
    {
        path: '/eth_getBalance',
        name: 'eth_getBalance',
        component: () => import("../requestView/eth_getBalance.vue")
    },
    {
        path: '/eth_getBlockByHash',
        name: 'eth_getBlockByHash',
        component: () => import("../requestView/eth_getBlockByHash.vue")
    },
    {
        path: '/eth_getBlockByNumber',
        name: 'eth_getBlockByNumber',
        component: () => import("../requestView/eth_getBlockByNumber.vue")
    },
    {
        path: '/eth_getBlockTransactionCountByHash',
        name: 'eth_getBlockTransactionCountByHash',
        component: () => import("../requestView/eth_getBlockTransactionCountByHash.vue")
    },
    {
        path: '/eth_getBlockTransactionCountByNumber',
        name: 'eth_getBlockTransactionCountByNumber',
        component: () => import("../requestView/eth_getBlockTransactionCountByNumber.vue")
    },
    {
        path: '/eth_getCode',
        name: 'eth_getCode',
        component: () => import("../requestView/eth_getCode.vue")
    },
    {
        path: '/eth_getStorageAt',
        name: 'eth_getStorageAt',
        component: () => import("../requestView/eth_getStorageAt.vue")
    },
    {
        path: '/eth_getTransactionByBlockHashAndIndex',
        name: 'eth_getTransactionByBlockHashAndIndex',
        component: () => import("../requestView/eth_getTransactionByBlockHashAndIndex.vue")
    },
    {
        path: '/eth_getTransactionByHash',
        name: 'eth_getTransactionByHash',
        component: () => import("../requestView/eth_getTransactionByHash.vue")
    },
    {
        path: '/eth_getTransactionCount',
        name: 'eth_getTransactionCount',
        component: () => import("../requestView/eth_getTransactionCount.vue")
    },
    {
        path: '/eth_getTransactionReceipt',
        name: 'eth_getTransactionReceipt',
        component: () => import("../requestView/eth_getTransactionReceipt.vue")
    },
    {
        path: '/eth_getUncleCountByBlockHash',
        name: 'eth_getUncleCountByBlockHash',
        component: () => import("../requestView/eth_getUncleCountByBlockHash.vue")
    },
    {
        path: '/eth_getUncleCountByBlockNumber',
        name: 'eth_getUncleCountByBlockNumber',
        component: () => import("../requestView/eth_getUncleCountByBlockNumber.vue")
    },
    {
        path: '/eth_getTransactionByBlockNumberAndIndex',
        name: 'eth_getTransactionByBlockNumberAndIndex',
        component: () => import("../requestView/eth_getTransactionByBlockNumberAndIndex.vue")
    },
    {
        path: '/eth_sendRawTransaction',
        name: 'eth_sendRawTransaction',
        component: () => import("../requestView/eth_sendRawTransaction.vue")
    },
    {
        path: '/eth_syncing',
        name: 'eth_syncing',
        component: () => import("../requestView/eth_syncing.vue")
    },
    {
        path: '/eth_uninstallFilter',
        name: 'eth_uninstallFilter',
        component: () => import("../requestView/eth_uninstallFilter.vue")
    },
    {
        path: '/walltChanged',
        name: 'walltChanged',
        component: () => import("../requestView/walltChanged.vue")
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes
})
// 全局前置守卫 按照创建顺序调用 守卫是异步执行的

export default router
