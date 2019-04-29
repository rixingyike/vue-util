import Vue from 'vue'
import App from './App.vue'
import './util/index_test'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
