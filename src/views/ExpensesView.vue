<script setup>
import CalendarComponent from "@/components/Expenses/CalendarComponent.vue";
import ExpensesComponent from "@/components/Expenses/ExpensesComponent.vue";
import MainChartComponent from "@/components/Expenses/MainChartComponent.vue";
import TitlePathComponent from "@/components/TitlePathComponent.vue";
import ExpensesListComponent from "@/components/Expenses/ExpensesListComponent.vue";
import axios from "axios";
import moment from "moment";
</script>

<template>
    <div class="w-5/6 @container" v-if="monthData && yearData && lastMonthData">
        <TitlePathComponent />
        <div class="w-full flex flex-col [&>*+*]:mt-4">
            <CalendarComponent ref="calendar" :defaultData="monthData" class="w-fit" @dateUpdated="updateData()" />
            <MainChartComponent class="w-full h-[500px]" :defaultData="monthData" :defaultDate="{ start: moment(this.monthData[0].date).startOf('day'), end: moment(this.monthData[this.monthData.length - 1].date).startOf('day') }" ref="mainChart" />
            <ExpensesComponent class="h-[120px]" :defaultData="monthData" ref="expenses" />
            <ExpensesListComponent :defaultData="monthData" ref="expensesList" />
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
    methods: {
        updateData() {
            let date = this.$refs.calendar.getDate();
            axios
                .get("http://localhost:8000/api/Entries?periodStart=" + moment(date.start).startOf("day").format("YYYY-MM-DD HH:mm:ss") + "&periodEnd=" + moment(date.end).endOf("day").format("YYYY-MM-DD HH:mm:ss"))
                .then((response) => {
                    this.$refs.mainChart.setCosts(response.data, date);
                    this.$refs.expenses.setData(response.data);
                    this.$refs.expensesList.setData(response.data);
                })
                .catch((response) => {
                    console.log(response);
                });
        },
    },
};
</script>
