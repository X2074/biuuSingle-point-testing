import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router/index'
//引入依赖和语言
import 'highlight.js/styles/stackoverflow-dark.css'
import json from "highlight.js/lib/languages/json";
import hljs from "highlight.js/lib/core";
import hljsVuePlugin from "@highlightjs/vue-plugin";
//按需引入语言
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);

import "@/assets/common.scss";
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(hljsVuePlugin)
app.mount('#app')
