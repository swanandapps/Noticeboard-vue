import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import '@mdi/font/css/materialdesignicons.css';

import 'material-design-icons-iconfont/dist/material-design-icons.css';




import Vuetify from "vuetify";
import VueSweetalert2 from 'vue-sweetalert2';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.use(VueSweetalert2)


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");