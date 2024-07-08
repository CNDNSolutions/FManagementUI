import './assets/main.css'
import '@coreui/coreui/dist/css/coreui.min.css'

import { createWebHistory, createRouter } from 'vue-router'

import { createApp } from 'vue'

import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/DashboardView.vue')
        }
    ]
})

createApp(App).use(router).mount('#app')
