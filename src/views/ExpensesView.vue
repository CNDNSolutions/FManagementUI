<script setup>
import CalendarComponent from "@/components/CalendarComponent.vue";
import ExpensesComponent from "@/components/Expenses/ExpensesComponent.vue";
import ExpensesChartComponent from "@/components/Expenses/ExpensesChartComponent.vue";
import TitlePathComponent from "@/components/TitlePathComponent.vue";
import ExpensesListComponent from "@/components/Expenses/ExpensesListComponent.vue";
import axios from "axios";
import moment from "moment";
import { get, set } from "@/Helpers/localStorage";
import { byPeriod } from "@/Helpers/API";
import { startOfMonth, endOfMonth, toFormat } from "@/Helpers/Time";
</script>

<template>
    <div class="w-5/6 @container" :key="defaultData">
        <TitlePathComponent />
        <div class="w-full flex flex-col [&>*+*]:mt-4">
            <CalendarComponent ref="calendar" :defaultDate="defaultData.date" class="w-full @lg:w-fit" @dateUpdated="updateData({ start: toFormat(this.$refs.calendar.getDate().start), end: toFormat(this.$refs.calendar.getDate().end) }, true)" />
            <ExpensesChartComponent class="w-full h-[500px]" :defaultData="defaultData.data" :defaultDate="defaultData.date" ref="expensesChart" />
            <ExpensesComponent :defaultData="defaultData.data" ref="expenses" />
            <ExpensesListComponent :defaultData="defaultData.data" ref="expensesList" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultData: { date: 0, data: [], expires: 0 },
        };
    },
    mounted() {
        this.setData({ start: startOfMonth(), end: endOfMonth() });
    },
    methods: {
        async setData(date, update = false) {
            let defaultData = get("expensesData");
            if (!defaultData) {
                defaultData = {
                    date: date,
                    data: await byPeriod(date.start, date.end),
                    expires: moment(moment.now()).add(2, "minute").unix(),
                };
            }

            //set default data
            if (!update) {
                this.defaultData = defaultData;
            }

            if (defaultData.expires < moment(moment.now()).unix()) {
                defaultData.data = await byPeriod(defaultData.date.start, defaultData.date.end);
                defaultData.expires = moment(moment.now()).add(2, "minute").unix();
            }

            set("expensesData", defaultData);
            this.defaultData = defaultData;
        },

        async updateData(date) {
            let defaultData = get("expensesData");

            if (date.start != defaultData.date.start || date.end != defaultData.date.end) {
                defaultData.date = date;
                defaultData.data = await byPeriod(date.start, date.end);
                defaultData.expires = moment(moment.now()).add(2, "minute").unix();

                set("expensesData", defaultData);

                this.$refs.expenses.setData(defaultData.data);
                this.$refs.expensesChart.setData(defaultData.data, defaultData.date);
                this.$refs.expensesList.setData(defaultData.data);
            }
        },
    },
};
</script>
