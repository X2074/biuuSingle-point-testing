import { createStore } from 'vuex'
export default createStore({
    state: {
        providers: null
    },
    getters: {
        /**
         * state 获取state中的数据
         * getters 使用getters中其他的方法
         */
        providers(state: any) {
            return state.providers
        }
    },
    mutations: {
        setProviders(state: any, token: any) {
            console.log(token, 'asdasdas');

            state.providers = token;
        },
    },
    actions: {
        getProviders(context: any) {
            console.log(context, "context");
            function onAnnouncement(event: any) {
                console.log(event.detail, "调用这个方法啊");
                if (event.detail.info.uuid == '350670db-19fa-4704-a166-e52e178b59d2') {
                    context.commit("setProviders", event.detail);
                }
                //   if (providers.map(p => p.info.uuid).includes(event.detail.info.uuid)) return
                //   providers = [...providers, event.detail]
                //   callback()
            }
            window.addEventListener("eip6963:announceProvider", onAnnouncement);
            window.dispatchEvent(new Event("eip6963:requestProvider"));

            return () => window.removeEventListener("eip6963:announceProvider", onAnnouncement)
        },
    },
    modules: {
    }
})