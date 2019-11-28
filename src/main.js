import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/resize.css';
import './assets/theme/index.css';
import vueAxios from 'vue-axios';
import http from './utils/http';

Vue.use(ElementUI);
Vue.use(vueAxios, http);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
