import "./assets/main.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "v-calendar/style.css";

import { createWebHistory, createRouter } from "vue-router";

import VCalendar from "v-calendar";

import { createApp } from "vue";

import App from "./App.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "Dashboard",
            path: "/home/dashboard",
            component: () => import("@/views/DashboardView.vue"),
        },
        {
            name: "Expenses",
            path: "/home/expenses",
            component: () => import("@/views/ExpensesView.vue"),
        },
    ],
});

createApp(App).use(router).use(VCalendar, {}).mount("#app");
