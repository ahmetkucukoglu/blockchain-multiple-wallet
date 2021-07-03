import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accountAddress: null,
        provider: null
    },
    mutations: {
        setAccountAddress(state, address) {
            state.accountAddress = address
        },
        setProvider(state, provider) {
            state.provider = provider
        }
    },
    getters: {
    },
    actions: {
    }
})