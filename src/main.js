import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';
import { BootstrapVue } from 'bootstrap-vue';

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.component('v-select', vSelect);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
