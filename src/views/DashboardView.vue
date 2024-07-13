<script setup>
import ExpensesCardComponent from "@/components/Dashboard/ExpensesCardComponent.vue";
import ProfitCardComponent from "@/components/Dashboard/ProfitCardComponent.vue";
import OthersExpensesComponent from "@/components/Dashboard/OthersExpensesComponent.vue";
import ProductsExpensesComponent from "@/components/Dashboard/ProductsExpensesComponent.vue";
import TitlePathComponent from "@/components/TitlePathComponent.vue";

import { CChart } from "@coreui/vue-chartjs";
import axios from "axios";
import moment from "moment";
</script>

<template>
    <div class="w-5/6 @container" v-if="monthData && yearData && lastMonthData">
        <TitlePathComponent />
        <!-- w-full h-[500px] flex -->
        <div class="w-full h-[1000px] flex flex-col @6xl:flex-row @6xl:h-[500px]">
            <!-- w-1/3 flex flex-col mr-2 -->
            <div class="flex flex-col h-2/3 mb-2 @6xl:h-full @6xl:mr-2 @6xl:w-1/3">
                <ExpensesCardComponent class="h-[40%] mb-2 @4xl:h-3/5" v-if="monthData" :defaultData="monthData" :defaultDate="{ start: moment(moment.now()).startOf('month'), end: moment(moment.now()).endOf('month') }" @click="this.$router.push({ path: '/home/expenses' })" />

                <!-- h-2/5 flex mt-2 -->
                <div class="flex flex-col h-3/5 mt-2 @4xl:flex-row @4xl:h-2/5">
                    <ProductsExpensesComponent class="h-full mb-2 @4xl:!mb-0 @4xl:mr-2 @4xl:w-1/2" v-if="monthData && lastMonthData" :defaultData="{ currentMonth: monthData, lastMonth: lastMonthData }" @click="this.$router.push({ path: '/home/expenses' })" />
                    <OthersExpensesComponent class="h-full mt-2 @4xl:!mt-0 @4xl:ml-2 @4xl:w-1/2" v-if="monthData && lastMonthData" :defaultData="{ currentMonth: monthData, lastMonth: lastMonthData }" @click="this.$router.push({ path: '/home/expenses' })" />
                </div>
            </div>
            <!-- w-2/3 ml-2 -->
            <ProfitCardComponent class="profit-card mt-2 h-1/2 @6xl:h-full @6xl:!mt-0 @6xl:ml-2 @6xl:w-2/3" v-if="yearData" :data="yearData" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            monthData: false,
            lastMonthData: false,
            yearData: false,
        };
    },
    mounted() {
        let data = JSON.parse(localStorage.getItem("data"));

        this.monthData = data.month;
        this.lastMonthData = data.lastMonth;
        this.yearData = data.year;
    },
};
</script>
