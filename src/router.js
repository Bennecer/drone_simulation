import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from '@/store';

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/device',
            name: 'device',
            meta: { requiresAuth: true },
            component: () =>
                import ( /* webpackChunkName: "device" */ './views/Device.vue')
        }
    ]
})

store.dispatch('syncRouter', router);

export default router;