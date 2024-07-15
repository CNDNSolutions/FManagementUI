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
import { startOfMonth, endOfMonth, toFormat } from "@/Helpers/Time";
</script>

<template>
    <div class="w-5/6 @container" :key="defaultData">
        <TitlePathComponent />
        <div class="w-full flex flex-col [&>*+*]:mt-4">
            <CalendarComponent ref="calendar" :defaultDate="defaultData.date" class="w-full @lg:w-fit" @dateUpdated="updateData({ start: toFormat(this.$refs.calendar.getDate().start), end: toFormat(this.$refs.calendar.getDate().end) }, true)" />
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
            defaultData: { date: 0, data: [], expires: 0 },
        };
    },
    mounted() {
        this.dispatchData();
    },
    methods: {
        async setData(date) {
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

            set("profitData", defaultData);
            this.defaultData = defaultData;
        },

        async updateData(date) {
            let defaultData = get("profitData");

            if (date.start != defaultData.date.start || date.end != defaultData.date.end) {
                defaultData.date = date;
                defaultData.data = await byPeriod(date.start, date.end);
                defaultData.expires = moment(moment.now()).add(2, "minute").unix();

                set("profitData", defaultData);

                this.$refs.calendar.setDate(date);
                this.$refs.profit.setData(defaultData.data);
                this.$refs.profitChart.setData(defaultData.data, defaultData.date);
                this.$refs.profitList.setData(defaultData.data);
            }
        },
        async dispatchData() {
            await this.setData(this.getSetData());
            let params = new URLSearchParams(window.location.search);
            if (params.get("update")) {
                this.updateData(this.getSetData());
            }
        },
        getSetData() {
            return { start: /[?&]start=/.test(location.search) ? new URLSearchParams(window.location.search).get("start") : startOfMonth(), end: /[?&]end=/.test(location.search) ? new URLSearchParams(window.location.search).get("end") : endOfMonth() };
        },
    },
};
</script>
