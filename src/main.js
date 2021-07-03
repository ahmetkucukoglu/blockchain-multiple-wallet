import Vue from "vue"
import App from "./App.vue"
import store from "./store"

Vue.config.productionTip = false

export const eventHub = new Vue()

new Vue({
  created: function () {
    store.subscribe((mutation, state) => {
      localStorage.setItem('accountAddress', JSON.stringify(state.accountAddress))
      localStorage.setItem('provider', JSON.stringify(state.provider))
    })
  },
  beforeCreate() {
    let accountAddress = localStorage.getItem('accountAddress')
    this.$store.commit('setAccountAddress', JSON.parse(accountAddress))

    let provider = localStorage.getItem('provider')
    this.$store.commit('setProvider', JSON.parse(provider))
  },
  store,
  render: h => h(App),
}).$mount('#app')