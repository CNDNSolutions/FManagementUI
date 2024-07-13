<template>
    <div class="flex flex-col">
        <div class="flex justify-between mb-2 items-start">
            <div>
                <div class="flex *:max-h-9 *:h-9 *:min-h-9 *:border-y *:border-border-color *:flex *:justify-center *:items-center *:px-3 hover:*:bg-primary/10 cursor-pointer *:text-lg active:*:bg-primary/20" title="Group by">
                    <div class="rounded-l border-l" @click="setProfit(false, false, 'year')" v-bind:class="chartGroup == 'year' ? 'bg-secondary/100' : ''">Year</div>
                    <div class="border-y" @click="setProfit(false, false, 'month')" v-bind:class="chartGroup == 'month' ? 'bg-secondary/100' : ''">Month</div>
                    <div class="rounded-r border-r" @click="setProfit(false, false, 'day')" v-bind:class="chartGroup == 'day' ? 'bg-secondary/100' : ''">Day</div>
                </div>
            </div>

            <div>
                <div class="flex *:max-h-9 *:h-9 *:min-h-9 *:border-y *:border-border-color *:flex *:justify-center *:items-center *:px-3 hover:*:bg-primary/10 cursor-pointer *:text-lg active:*:bg-primary/20" title="Profit type">
                    <div class="rounded-l border-l" @click="chartType = 'turnover'" v-bind:class="chartType == 'turnover' ? 'bg-secondary/100' : ''">Turnover</div>
                    <div class="border-y" @click="chartType = 'gross'" v-bind:class="chartType == 'gross' ? 'bg-secondary/100' : ''">Gross</div>
                    <div class="border-y" @click="chartType = 'marginal'" v-bind:class="chartType == 'marginal' ? 'bg-secondary/100' : ''">Marginal</div>
                    <div class="rounded-r border-r" @click="chartType = 'net'" v-bind:class="chartType == 'net' ? 'bg-secondary/100' : ''">Net</div>
                </div>
            </div>
        </div>
        <div class="flex flex-grow rounded border-2 border-border-color bg-secondary/100">
            <BarChartComponent
                v-if="chart == 'bar'"
                class="h-full w-full"
                :data="{
                    labels: this.profit.date,
                    datasets: [{ label: 'Profit', data: this.profit[this.chartType], fill: true }],
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
                    labels: this.profit.date,
                    datasets: [{ label: 'Profit', data: this.profit[this.chartType], fill: true }],
                }"
                :options="{
                    maintainAspectRatio: false,
                    backgroundColor: getStyle('--primary-transparent'),
                    borderColor: getStyle('--primary'),
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
            data: {},
            date: {},
            chart: "line",
            chartGroup: "day",
            chartType: "turnover",

            profit: { date: [], amount: { turnover: [], gross: [], marginal: [], net: [] } },
        };
    },
    mounted() {
        this.setProfit(this.defaultData, this.defaultDate);
    },
    methods: {
        getStyle,

        setProfit(data, date, group) {
            if (!date) {
                date = this.date;
            }
            if (!data) {
                data = this.data;
            }
            if (!group) {
                group = this.chartGroup;
            }

            this.data = data;
            this.chartGroup = group;
            this.date = date;

            let newProfit = this.defineProfit(data, date, group);

            if (newProfit.chart != this.chart) {
                this.chart = newProfit.chart;
            }
            this.profit = newProfit.profit;

            console.log(this.profit);
        },

        defineProfit(data, date, group) {
            let newProfit = { date: [], amount: { turnover: [], gross: [], marginal: [], net: [] } };

            let days =
                moment(date.start)
                    .startOf(group == "day" ? "day" : group == "month" ? "month" : "year")
                    .diff(moment(date.end).endOf(group == "day" ? "day" : group == "month" ? "month" : "year"), group == "day" ? "day" : group == "month" ? "month" : "year") * -1;

            for (let index = 0; index <= days; index++) {
                newProfit.date.push(
                    moment(date.start)
                        .add(index, group == "day" ? "day" : group == "month" ? "month" : "year")
                        .format(group == "day" ? "D MMM" : group == "month" ? "MMM YYYY" : "YYYY")
                );
            }

            newProfit.turnover = new Array(days + 1).fill(0);
            newProfit.gross = new Array(days + 1).fill(0);
            newProfit.marginal = new Array(days + 1).fill(0);
            newProfit.net = new Array(days + 1).fill(0);

            let chart = "line";
            if (days + 1 == 1) {
                chart = "bar";
            }

            data.forEach((item) => {
                let date = newProfit.date.indexOf(moment(item.date).format(group == "day" ? "D MMM" : group == "month" ? "MMM YYYY" : "YYYY"));

                newProfit.turnover[date] += parseInt(item.profit.toFixed(0));
                newProfit.gross[date] += parseInt((item.profit - item.profit / (1 + item.markup / 100)).toFixed(0));
                newProfit.marginal[date] += parseInt((item.profit - item.profit / (1 + item.markup / 100)).toFixed(0));
                newProfit.net[date] += parseFloat((item.profit - item.profit / (1 + item.markup / 100)).toFixed(2));
                item.costs.forEach((cost) => {
                    newProfit.net[date] -= parseFloat(cost.amount.toFixed(2));
                    newProfit.marginal[date] -= cost.isVariable ? parseInt(cost.amount.toFixed(0)) : 0;
                });
            });

            return { profit: newProfit, chart: chart };
        },
    },
};
</script>
