<script setup>
import ExpensesCardComponent from "@/components/Dashboard/ExpensesCardComponent.vue";
import ProfitCardComponent from "@/components/Dashboard/ProfitCardComponent.vue";
import OtherExpensesComponent from "@/components/Dashboard/OtherExpensesComponent.vue";
import ProductsExpensesComponent from "@/components/Dashboard/ProductsExpensesComponent.vue";
import TitlePathComponent from "@/components/TitlePathComponent.vue";

import { CChart } from "@coreui/vue-chartjs";
import axios from "axios";
import moment from "moment";
import { endOfLastMonth, endOfMonth, endOfYear, startOfLastMonth, startOfMonth, startOfYear } from "@/Helpers/Time";
import { get, set } from "@/Helpers/localStorage";
import { byPeriod } from "@/Helpers/API";
</script>

<template>
    <div class="w-5/6 @container" v-if="defaultData">
        <TitlePathComponent />
        <!-- w-full h-[500px] flex -->
        <div class="w-full h-[1000px] flex flex-col @6xl:flex-row @6xl:h-[500px]">
            <!-- w-1/3 flex flex-col mr-2 -->
            <div class="flex flex-col h-2/3 mb-2 @6xl:h-full @6xl:mr-2 @6xl:w-1/3">
                <ExpensesCardComponent class="h-[40%] mb-2 @4xl:h-3/5" :defaultData="defaultData.currentMonth.data" :defaultDate="defaultData.currentMonth.date" @click="this.$router.push({ path: '/home/expenses' })" />

                <!-- h-2/5 flex mt-2 -->
                <div class="flex flex-col h-3/5 mt-2 @4xl:flex-row @4xl:h-2/5">
                    <ProductsExpensesComponent class="h-full mb-2 @4xl:!mb-0 @4xl:mr-2 @4xl:w-1/2" :defaultData="{ currentMonth: defaultData.currentMonth.data, lastMonth: defaultData.lastMonth.data }" @click="this.$router.push({ path: '/home/expenses' })" />
                    <OtherExpensesComponent class="h-full mt-2 @4xl:!mt-0 @4xl:ml-2 @4xl:w-1/2" :defaultData="{ currentMonth: defaultData.currentMonth.data, lastMonth: defaultData.lastMonth.data }" @click="this.$router.push({ path: '/home/expenses' })" />
                </div>
            </div>
            <!-- w-2/3 ml-2 -->
            <ProfitCardComponent class="profit-card mt-2 h-1/2 @6xl:h-full @6xl:!mt-0 @6xl:ml-2 @6xl:w-2/3" :data="defaultData.year.data" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultData: false,
        };
    },
    mounted() {
        this.setData({
            currentMonth: { start: startOfMonth(), end: endOfMonth() },
            lastMonth: { start: startOfLastMonth(), end: endOfLastMonth() },
            year: { start: startOfYear(), end: endOfYear() },
        });
    },
    methods: {
        async setData(date) {
            let defaultData = get("dashboardData");
            if (!defaultData) {
                defaultData = {
                    expires: moment(moment.now()).add(2, "minute").unix(),
                    currentMonth: {
                        date: date.currentMonth,
                        data: await byPeriod(date.currentMonth.start, date.currentMonth.end),
                    },
                    lastMonth: {
                        date: date.lastMonth,
                        data: await byPeriod(date.lastMonth.start, date.lastMonth.end),
                    },
                    year: {
                        date: date.year,
                        data: await byPeriod(date.year.start, date.year.end),
                    },
                };
            }

            if (defaultData.expires < moment(moment.now()).unix()) {
                defaultData.currentMonth = await byPeriod(defaultData.currentMonth.start, defaultData.currentMonth.end);
                defaultData.year = await byPeriod(defaultData.year.start, defaultData.year.end);
                defaultData.expires = moment(moment.now()).add(2, "minute").unix();
            }

            set("dashboardData", defaultData);
            this.defaultData = defaultData;
        },
    },
};
</script>
