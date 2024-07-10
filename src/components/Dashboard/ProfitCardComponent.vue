<script setup>
import { CChart } from "@coreui/vue-chartjs";
import { getStyle } from "@coreui/utils";
import { data } from "autoprefixer";
import moment from "moment";
</script>

<template>
    <div class="rounded border-1 border-border-color bg-secondary/100 flex flex-col justify-between px-3">
        <div class="h-1/3 py-3 flex flex-col justify-between items-start @6xl:flex-row">
            <div>
                <div class="font-bold text-2xl">Profit</div>
                <div class="text-base font-light">January {{ moment().local().format("Y") }} - December, {{ moment().local().format("Y") }}</div>
            </div>
            <div class="flex [&>*+*]:ml-2 items-end">
                <div class="text-accent text-2xl font-semibold @6xl:text-3xl">${{ profit.toFixed(2) }}</div>
                <div class="">/</div>
                <div class="text-xl @6xl:text-2xl">(${{ (profit - mapped.costs.reduce((acc, num) => acc + num, 0)).toFixed(2) }})</div>
            </div>
        </div>
        <CChart
            type="bar"
            class="h-3/4 w-full"
            :custom-tooltips="false"
            :data="{
                labels: this.mapped.labels,
                datasets: [
                    {
                        label: 'Profit',
                        backgroundColor: getStyle('--primary'),
                        data: this.mapped.profit,
                        barPercentage: 0.6,
                    },
                    {
                        label: 'Expenses',
                        backgroundColor: getStyle('--text'),
                        data: this.mapped.costs,
                        barPercentage: 0.6,
                    },
                ],
            }"
            :options="{
                barThickness: 'flex',
                maxBarThickness: 8,
                barPercentage: 1,
                categoryPercentage: 0.4,
                borderRadius: 20,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawTicks: false,
                        },

                        max: 11,

                        ticks: {
                            maxTicksLimit: 11,
                            autoSkip: false,
                            stepSize: 1,
                            color: getStyle('--text'),
                        },
                    },
                    y: {
                        grid: {
                            color: getStyle('--border-color'),
                        },

                        border: {
                            display: false,

                            dash: [4, 4],
                        },

                        ticks: {
                            padding: 20,
                            maxTicksLimit: 5,
                            autoSkip: false,
                            stepSize: 5,
                            color: getStyle('--text'),
                        },
                    },
                },
            }" />
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
    },
    data() {
        return {
            mapped: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                profit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                costs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            profit: 0,
        };
    },
    mounted() {
        this.data.forEach((item) => {
            let date = moment(item.date, "YYYY-MM-DD HH:mm:ss");
            let itemMonth = date.format("MMM");

            this.mapped.profit[this.mapped.labels.indexOf(itemMonth)] += item.profit;

            this.profit += item.profit / (1 + item.markup / 100);

            let currentCosts = 0;
            item.costs.forEach((cost) => {
                currentCosts += cost.amount;
            });
            this.mapped.costs[this.mapped.labels.indexOf(itemMonth)] += currentCosts;
        });
    },
};
</script>
