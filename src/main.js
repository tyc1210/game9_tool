import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from '../src/utils/request'


Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = request;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})
