<script setup>
import DefaultChartComponent from "@/components/DefaultChartComponent.vue";
import { CChart } from "@coreui/vue-chartjs";
import { getStyle } from "@coreui/utils";
import moment from "moment";
import { data } from "autoprefixer";
</script>

<template>
    <div class="rounded border-2 border-border-color bg-secondary/100 hover:bg-primary/10 cursor-pointer flex flex-col justify-between">
        <div class="w-full p-3 flex justify-between items-center">
            <div class="flex flex-col">
                <div class="font-bold text-2xl">Expenses</div>
                <div class="text-base font-light">
                    {{ moment(moment.utc(this.data[0].date, "YYYY-MM-DD HH:mm:ss").toDate()).local().format("MMMM") }} {{ moment(moment.utc(this.data[0].date, "YYYY-MM-DD HH:mm:ss").toDate()).local().format("Y") }} {{ moment(moment.utc(this.data[0].date, "YYYY-MM-DD HH:mm:ss").toDate()).local().format("D") }} -
                    {{
                        moment(moment.utc(this.data[this.data.length - 1].date, "YYYY-MM-DD HH:mm:ss").toDate())
                            .local()
                            .format("D")
                    }}
                </div>
            </div>
            <div class="text-accent text-2xl font-semibold @6xl:text-3xl">${{ this.costs.cost.reduce((acc, num) => acc + num, 0) }}</div>
        </div>
        <DefaultChartComponent class="h-1/2" :data="{ labels: this.costs.date, datasets: [{ label: 'Expenses', data: this.costs.cost, fill: true }] }" />
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
    },
    data() {
        return {
            costs: { cost: [], date: [] },
        };
    },
    mounted() {
        this.data.forEach((item) => {
            let timeCost = 0;
            item.costs.forEach((cost) => {
                timeCost = timeCost + cost.amount;
            });
            this.costs.cost.push(timeCost);
            let date = moment(moment.utc(item.date, "YYYY-MM-DD HH:mm:ss").toDate()).local();
            this.costs.date.push(date.format("D") + " " + date.format("MMM"));
        });
    },
};
</script>
