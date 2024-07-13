<script setup>
import LineChartComponent from "@/components/LineChartComponent.vue";
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
                <div class="text-base font-light" title="Period">
                    {{ moment(this.defaultDate.start).format("MMMM") }} {{ moment(this.defaultDate.start).format("Y") }} {{ moment(this.defaultDate.start).format("D") }} -
                    {{ moment(this.defaultDate.end).format("D") }}
                </div>
            </div>
            <div class="text-accent text-2xl font-semibold @6xl:text-3xl" title="Total expenses">${{ this.costs.amount.reduce((acc, num) => acc + num, 0) }}</div>
        </div>
        <LineChartComponent
            class="h-1/2"
            :data="{ labels: this.costs.date, datasets: [{ label: 'Expenses', data: this.costs.amount, fill: true }] }"
            :options="{
                maintainAspectRatio: false,
                backgroundColor: getStyle('--primary-transparent'),
                borderColor: getStyle('--primary'),
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: { x: { border: { display: false }, display: false }, y: { display: false } },
                elements: {
                    line: {
                        borderWidth: 3,
                        tension: 0.4,
                    },
                    point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
                },
            }" />
    </div>
</template>

<script>
export default {
    props: {
        defaultData: Object,
        defaultDate: Object,
    },
    data() {
        return {
            costs: { date: [], amount: [] },
        };
    },
    created() {
        this.setCosts(this.defaultData, this.defaultDate);
    },
    methods: {
        setCosts(data, date) {
            if (!data) {
                data = this.defaultData;
            }
            if (!date) {
                date = this.defaultDate;
            }

            let costs = this.defineCosts(data, date);

            if (costs != this.costs) {
                this.costs = costs;
            }
        },
        defineCosts(data, date) {
            let costs = { date: [], amount: [] };

            let days = moment(date.start).startOf("day").diff(moment(date.end).endOf("day"), "day") * -1;

            for (let index = 0; index <= days; index++) {
                costs.date.push(moment(date.start).add(index, "day").format("DD MMM"));
            }

            costs.amount = new Array(days + 1).fill(0);

            data.forEach((item) => {
                let allCost = 0;
                item.costs.forEach((cost) => {
                    allCost += cost.amount;
                });
                let date = costs.date.indexOf(moment(item.date).format("DD MMM"));
                costs.amount[date] += allCost;
            });

            return costs;
        },
    },
};
</script>
