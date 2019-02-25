import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Timer from './Timer'
import TimeKeeper from './TimeKeeper'

Vue.config.productionTip = false

new Vue({
  store,
  Timer,
  TimeKeeper,
  render: h => h(App)
}).$mount('#app')
