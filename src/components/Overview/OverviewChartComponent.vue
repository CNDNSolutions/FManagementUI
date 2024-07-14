<template>
    <div class="flex flex-col">
        <div class="flex *:max-h-9 *:h-9 *:min-h-9 *:border-y *:border-border-color *:flex *:justify-center *:items-center *:px-3 hover:*:bg-primary/10 cursor-pointer *:text-lg active:*:bg-primary/20" title="Group by">
            <div class="rounded-l border-l" @click="setData(this.defaultData, this.defaultDate, 'year')" v-bind:class="chartGroup == 'year' ? 'bg-secondary/100' : ''">Year</div>
            <div class="border-y" @click="setData(this.defaultData, this.defaultDate, 'month')" v-bind:class="chartGroup == 'month' ? 'bg-secondary/100' : ''">Month</div>
            <div class="rounded-r border-r" @click="setData(this.defaultData, this.defaultDate, 'day')" v-bind:class="chartGroup == 'day' ? 'bg-secondary/100' : ''">Day</div>
        </div>
        <div class="mt-2 flex flex-grow rounded border-2 border-border-color bg-secondary/100">
            <BarChartComponent
                v-if="chart == 'bar'"
                class="h-full w-full"
                :data="{
                    labels: this.data.date,
                    datasets: [{ label: 'Profit', data: this.data.profit, fill: true }],
                }"
                :options="{
                    backgroundColor: getStyle('--primary'),
                    barThickness: 'flex',
                    maxBarThickness: 8,
                    barPercentage: 1,
                    categoryPercentage: 0.4,
                    borderRadius: 20,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            displayColors: false,
                            callbacks: {
                                label: (tooltipItem) => {
                                    return tooltipItem.dataset.label + ': $' + tooltipItem.formattedValue;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            afterFit: (axis) => {
                                axis.paddingRight = 0;
                            },
                            grid: {
                                display: false,
                                drawTicks: false,
                            },

                            ticks: {
                                maxTicksLimit: 11,
                                autoSkip: false,
                                stepSize: 1,
                                color: getStyle('--text'),
                            },
                        },
                        y: {
                            afterFit: (axis) => {
                                axis.paddingTop = 6;
                            },
                            grid: {
                                color: getStyle('--border-color'),
                            },

                            border: {
                                display: false,

                                dash: [4, 4],
                            },

                            ticks: {
                                callback: function (value, index, values) {
                                    if (Math.floor(value) === value) {
                                        return '$' + value;
                                    }
                                },
                                padding: 10,
                                color: getStyle('--text'),
                            },
                        },
                    },
                }" />
            <LineChartComponent
                v-if="chart == 'line'"
                class="h-full w-full"
                :data="{
                    labels: this.data.date,
                    datasets: [
                        { label: 'Profit', data: this.data.profit, borderColor: getStyle('--primary') },
                        { label: 'Expenses', data: this.data.costs, borderColor: getStyle('--danger') },
                    ],
                }"
                :options="{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            displayColors: false,
                            callbacks: {
                                label: (tooltipItem) => {
                                    return tooltipItem.dataset.label + ': $' + tooltipItem.formattedValue;
                                },
                            },
                        },
                    },

                    scales: {
                        x: {
                            afterFit: (axis) => {
                                axis.paddingRight = 0;
                            },
                            grid: {
                                color: getStyle('--border-color'),
                            },
                            border: {
                                display: false,

                                dash: [4, 4],
                            },

                            ticks: {
                                autoSkip: false,
                                stepSize: 1,
                                color: getStyle('--text'),
                            },
                        },

                        y: {
                            afterFit: (axis) => {
                                axis.paddingTop = 6;
                            },
                            grid: {
                                color: getStyle('--border-color'),
                            },

                            border: {
                                display: false,

                                dash: [4, 4],
                            },
                            ticks: {
                                callback: function (value, index, values) {
                                    if (Math.floor(value) === value) {
                                        return '$' + value;
                                    }
                                },
                                padding: 10,

                                color: getStyle('--text'),
                            },
                        },
                    },
                    elements: {
                        line: {
                            borderWidth: 3,
                            tension: 0.4,
                        },
                        point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
                    },
                }" />
        </div>
    </div>
</template>

<script>
import BarChartComponent from "@/components/BarChartComponent.vue";
import moment from "moment";
import LineChartComponent from "@/components/LineChartComponent.vue";
import { getStyle } from "@coreui/utils";

export default {
    components: {
        LineChartComponent,
        BarChartComponent,
    },

    props: {
        defaultData: Object,
        defaultDate: Object,
    },
    data() {
        return {
            data: {
                date: [],
                profit: [],
                costs: [],
            },
            chart: "line",
            chartGroup: "day",
        };
    },
    mounted() {
        this.setData(this.defaultData, this.defaultDate);
    },
    methods: {
        getStyle,

        setData(data, date, group = this.chartGroup) {
            let newData = this.defineData(data, date, group);

            if (newData.chart != this.chart) {
                this.chart = newData.chart;
            }
            this.data = newData.data;
        },

        defineData(data, date, group) {
            let newData = { date: [], profit: [], costs: [] };

            let days =
                moment(date.start)
                    .startOf(group == "day" ? "day" : group == "month" ? "month" : "year")
                    .diff(moment(date.end).endOf(group == "day" ? "day" : group == "month" ? "month" : "year"), group == "day" ? "day" : group == "month" ? "month" : "year") * -1;

            for (let index = 0; index <= days; index++) {
                newData.date.push(
                    moment(date.start)
                        .add(index, group == "day" ? "day" : group == "month" ? "month" : "year")
                        .format(group == "day" ? "D MMM" : group == "month" ? "MMM YYYY" : "YYYY")
                );
            }

            newData.profit = new Array(days + 1).fill(0);
            newData.costs = new Array(days + 1).fill(0);

            let chart = "line";
            if (days + 1 == 1) {
                chart = "bar";
            }

            data.forEach((item) => {
                let date = newData.date.indexOf(moment(item.date).format(group == "day" ? "D MMM" : group == "month" ? "MMM YYYY" : "YYYY"));

                newData.profit[date] += parseFloat((item.profit - item.profit / (1 + item.markup / 100)).toFixed(2));
                item.costs.forEach((cost) => {
                    newData.costs[date] += parseFloat(cost.amount.toFixed(2));
                });
            });

            return { data: newData, chart: chart };
        },
    },
};
</script>
