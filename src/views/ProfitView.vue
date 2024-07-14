<script setup>
import CalendarComponent from "@/components/CalendarComponent.vue";
import ProfitComponent from "@/components/Profit/ProfitComponent.vue";
import ProfitChartComponent from "@/components/Profit/ProfitChartComponent.vue";
import TitlePathComponent from "@/components/TitlePathComponent.vue";
import ProfitListComponent from "@/components/Profit/ProfitListComponent.vue";
import axios from "axios";
import moment from "moment";
import { get, set } from "@/Helpers/localStorage";
import { byPeriod } from "@/Helpers/API";
import { startOfMonth, endOfMonth } from "@/Helpers/Time";
</script>

<template>
    <div class="w-5/6 @container" v-if="defaultData">
        <TitlePathComponent />
        <div class="w-full flex flex-col [&>*+*]:mt-4">
            <CalendarComponent ref="calendar" :defaultDate="defaultData.date" class="w-full @lg:w-fit" @dateUpdated="setData({ start: moment(this.$refs.calendar.getDate().start).format('YYYY-MM-DD HH:mm:ss'), end: moment(this.$refs.calendar.getDate().end).format('YYYY-MM-DD HH:mm:ss') }, true)" />
            <ProfitChartComponent class="w-full h-[500px]" :defaultData="defaultData.data" :defaultDate="defaultData.date" ref="profitChart" />
            <ProfitComponent :defaultData="defaultData.data" ref="profit" />
            <ProfitListComponent :defaultData="defaultData.data" ref="profitList" />
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
        this.setData({ start: startOfMonth(), end: endOfMonth() });
    },
    methods: {
        async setData(date, update = false) {
            let defaultData = get("profitData");
            if (!defaultData) {
                defaultData = {
                    date: date,
                    data: await byPeriod(date.start, date.end),
                    expires: moment(moment.now()).add(2, "minute").unix(),
                };
            }

            if (defaultData.expires < moment(moment.now()).unix()) {
                defaultData.data = await byPeriod(defaultData.date.start, defaultData.date.end);
                defaultData.expires = moment(moment.now()).add(2, "minute").unix();
            }

            if ((defaultData.date.start != date.start || defaultData.date.end != date.end) && update) {
                defaultData.date = date;
                defaultData.data = await byPeriod(date.start, date.end);
                defaultData.expires = moment(moment.now()).add(2, "minute").unix();
            }

            set("profitData", defaultData);
            this.defaultData = defaultData;

            if (update) {
                this.updateComponents(defaultData.data, defaultData.date);
            }
        },

        updateComponents(data, date) {
            this.$refs.profit.setData(data);
            this.$refs.profitChart.setProfit(data, date);
            this.$refs.profitList.setData(data);
        },
    },
};
</script>
