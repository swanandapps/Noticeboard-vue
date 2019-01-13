import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import dashboard from './views/Dashboard.vue';
import Welcome from './views/Welcome.vue'
import Createcard from './views/Createcard.vue'
import Projectmanager from './views/Projectmanager.vue'
import Hr from "./views/hr.vue"

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/home",
            name: "home",
            component: Home
        },
        {
            path: "/projectmanager",
            name: "projectmanager",
            component: Projectmanager

        },
        {
            path: '/hr',
            name: 'hr',
            component: Hr

        },
        {
            path: "/",
            name: "welcome",
            component: Welcome

        },
        {
            path: "/createcard",
            name: "createcard",
            component: Createcard
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.

        },

        {
            path: '/dashboard',
            name: "dashboard",
            component: dashboard

        }
    ]
});