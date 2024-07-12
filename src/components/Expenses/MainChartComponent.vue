<template>
    <div class="flex flex-col">
        <div class="flex justify-between mb-2 items-start">
            <div>
                <div class="flex *:max-h-9 *:h-9 *:min-h-9 *:border-y *:border-border-color *:flex *:justify-center *:items-center *:px-3 hover:*:bg-primary/10 cursor-pointer *:text-lg active:*:bg-primary/20" title="Group by">
                    <div class="rounded-l border-l" @click="setCosts(false, false, 'year')" v-bind:class="chartGroup == 'year' ? 'bg-secondary/100' : ''">Year</div>
                    <div class="border-y" @click="setCosts(false, false, 'month')" v-bind:class="chartGroup == 'month' ? 'bg-secondary/100' : ''">Month</div>
                    <div class="rounded-r border-r" @click="setCosts(false, false, 'day')" v-bind:class="chartGroup == 'day' ? 'bg-secondary/100' : ''">Day</div>
                </div>
            </div>

            <div>
                <div class="flex *:max-h-9 *:h-9 *:min-h-9 *:border-y *:border-border-color *:flex *:justify-center *:items-center *:px-3 hover:*:bg-primary/10 cursor-pointer *:text-lg active:*:bg-primary/20" title="Expenses type">
                    <div class="rounded-l border-l" @click="chartType = 'all'" v-bind:class="chartType == 'all' ? 'bg-secondary/100' : ''">All</div>
                    <div class="border-y" @click="chartType = 'product'" v-bind:class="chartType == 'product' ? 'bg-secondary/100' : ''">Products</div>
                    <div class="rounded-r border-r" @click="chartType = 'others'" v-bind:class="chartType == 'others' ? 'bg-secondary/100' : ''">Others</div>
                </div>
            </div>
        </div>
        <div class="flex flex-grow rounded border-2 border-border-color bg-secondary/100">
            <BarChartComponent
                v-if="chart == 'bar'"
                class="h-full w-full"
                :data="{
                    labels: this.costs.date,
                    datasets: [{ label: 'Expenses', data: this.costs.amount[this.chartType], fill: true }],
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
                            min: 0,
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
                    labels: this.costs.date,
                    datasets: [{ label: 'Expenses', data: this.costs.amount[this.chartType], fill: true }],
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
                            min: 0,
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
            chartType: "all",

            costs: { date: [], amount: { all: [], product: [], others: [] } },
        };
    },
    mounted() {
        this.setCosts(this.defaultData, this.defaultDate);
    },
    methods: {
        getStyle,

        setCosts(data, date, group) {
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

            let costs = this.defineCosts(data, date, group);

            if (costs.chart != this.chart) {
                this.chart = costs.chart;
            }
            if (costs.costs != this.costs) {
                this.costs = costs.costs;
            }
        },

        defineCosts(data, date, group) {
            let costs = { date: [], amount: { all: [], product: [], others: [] } };

            let days =
                moment(date.start)
                    .startOf(group == "day" ? "day" : group == "month" ? "month" : "year")
                    .diff(moment(date.end).endOf(group == "day" ? "day" : group == "month" ? "month" : "year"), group == "day" ? "day" : group == "month" ? "month" : "year") * -1;

            for (let index = 0; index <= days; index++) {
                costs.date.push(
                    moment(date.start)
                        .add(index, group == "day" ? "day" : group == "month" ? "month" : "year")
                        .format(group == "day" ? "D MMM" : group == "month" ? "MMM YYYY" : "YYYY")
                );
            }

            costs.amount.product = new Array(days + 1).fill(0);
            costs.amount.all = new Array(days + 1).fill(0);
            costs.amount.others = new Array(days + 1).fill(0);
            let chart = "line";
            if (days + 1 == 1) {
                chart = "bar";
            }

            data.forEach((item) => {
                let productCost = 0;
                let othersCost = 0;
                let allCost = 0;
                item.costs.forEach((cost) => {
                    allCost += cost.amount;
                    if (cost.type == "product") {
                        productCost += cost.amount;
                    } else {
                        othersCost += cost.amount;
                    }
                });
                let date = costs.date.indexOf(moment(item.date).format(group == "day" ? "D MMM" : group == "month" ? "MMM YYYY" : "YYYY"));
                costs.amount.all[date] += allCost;
                costs.amount.product[date] += productCost;
                costs.amount.others[date] += othersCost;
            });

            return { costs: costs, chart: chart };
        },
    },
};
</script>
