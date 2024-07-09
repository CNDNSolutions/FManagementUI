<script setup>
import { CChart } from "@coreui/vue-chartjs";
import { getStyle } from "@coreui/utils";
import { data } from "autoprefixer";
import moment from "moment";
</script>

<template>
    <div class="w-2/3 ml-2 rounded border-1 border-border-color bg-secondary/100 flex flex-col justify-between px-3">
        <div class="h-1/4 py-3 flex justify-between items-center">
            <div>
                <div class="font-bold text-2xl">Profit</div>
                <div class="text-base font-light">January {{ moment().local().format("Y") }} - December, {{ moment().local().format("Y") }}</div>
            </div>
            <div class="flex [&>*+*]:ml-2 items-end">
                <div class="text-accent text-3xl font-semibold">${{ mapped.profit.reduce((acc, num) => acc + num, 0) }}</div>
                <div class="w">/</div>
                <div class="text-2xl">(${{ mapped.profit.reduce((acc, num) => acc + num, 0) - mapped.costs.reduce((acc, num) => acc + num, 0) }})</div>
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
                borderSkipped: false,
                barThickness: 'flex',
                maxBarThickness: 8,
                barPercentage: 0.1,
                categoryPercentage: 0.3,
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
        };
    },
    mounted() {
        this.data.forEach((item) => {
            let date = moment(item.date, "YYYY-MM-DD HH:mm:ss");
            let itemMonth = date.format("MMM");

            this.mapped.profit[this.mapped.labels.indexOf(itemMonth)] += item.profit;

            let currentCosts = 0;
            item.costs.forEach((cost) => {
                currentCosts += cost.amount;
            });
            this.mapped.costs[this.mapped.labels.indexOf(itemMonth)] += currentCosts;
        });
        console.log(this.mapped);
    },
};
</script>
