import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import '@mdi/font/css/materialdesignicons.css';

import 'material-design-icons-iconfont/dist/material-design-icons.css';



import element from "element-ui"
import Vuetify from "vuetify";
import VueSweetalert2 from 'vue-sweetalert2';
import 'vuetify/dist/vuetify.min.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(element);
Vue.use(Vuetify)

Vue.use(VueSweetalert2)


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");