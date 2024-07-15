<script setup>
import CalendarComponent from "@/components/CalendarComponent.vue";
import TitlePathComponent from "@/components/TitlePathComponent.vue";
import moment from "moment";
import { get, set } from "@/Helpers/localStorage";
import { byPeriod } from "@/Helpers/API";
import { startOfMonth, endOfMonth, toFormat } from "@/Helpers/Time";
import OverviewChartComponent from "@/components/Overview/OverviewChartComponent.vue";
import OverviewCardsComponent from "@/components/Overview/OverviewCardsComponent.vue";
import OverviewListComponent from "@/components/Overview/OverviewListComponent.vue";
</script>

<template>
    <div class="w-5/6 @container" :key="defaultData">
        <TitlePathComponent />
        <div class="w-full flex flex-col [&>*+*]:mt-4">
            <CalendarComponent ref="calendar" :defaultDate="defaultData.date" class="w-full @lg:w-fit" @dateUpdated="updateData({ start: toFormat(this.$refs.calendar.getDate().start), end: toFormat(this.$refs.calendar.getDate().end) }, true)" />
            <OverviewChartComponent class="w-full h-[500px]" :defaultData="defaultData.data" :defaultDate="defaultData.date" ref="overviewChart" />
            <OverviewCardsComponent :defaultData="defaultData.data" ref="overviewCards" />
            <OverviewListComponent :defaultData="defaultData.data" ref="overviewList" />
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
        async setData(date) {
            let defaultData = get("overviewData");
            if (!defaultData) {
                defaultData = {
                    date: date,
                    data: await byPeriod(date.start, date.end),
                    expires: moment(moment.now()).add(2, "minute").unix(),
                };
            }

            //set default data
            this.defaultData = defaultData;

            if (defaultData.expires < moment(moment.now()).unix()) {
                defaultData.data = await byPeriod(defaultData.date.start, defaultData.date.end);
                defaultData.expires = moment(moment.now()).add(2, "minute").unix();
            }

            set("overviewData", defaultData);
            this.defaultData = defaultData;
        },

        async updateData(date) {
            let defaultData = get("overviewData");

            if (date.start != defaultData.date.start || date.end != defaultData.date.end) {
                defaultData.date = date;
                defaultData.data = await byPeriod(date.start, date.end);
                defaultData.expires = moment(moment.now()).add(2, "minute").unix();

                set("overviewData", defaultData);

                this.$refs.overviewChart.setData(defaultData.data, defaultData.date);
                this.$refs.overviewCards.setData(defaultData.data);
                this.$refs.overviewList.setData(defaultData.data);
            }
        },
    },
};
</script>
