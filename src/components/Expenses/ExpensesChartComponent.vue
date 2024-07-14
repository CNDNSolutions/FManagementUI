<template>
    <div class="flex flex-col">
        <div class="flex flex-col *:w-full mb-2 [&>*>*]:w-full [&>*+*]:mt-2 justify-between items-start @lg:flex-row @lg:*:w-fit @lg:[&>*>*]:w-fit @lg:[&>*+*]:mt-0 @lg:[&>*+*]:ml-2">
            <div class="flex *:max-h-9 *:h-9 *:min-h-9 *:border-y *:border-border-color *:flex *:justify-center *:items-center *:px-3 hover:*:bg-primary/10 cursor-pointer *:text-lg active:*:bg-primary/20" title="Group by">
                <div class="rounded-l border-l" @click="setData(false, false, 'year')" v-bind:class="chart.group == 'year' ? 'bg-secondary/100' : ''">Year</div>
                <div class="border-y" @click="setData(false, false, 'month')" v-bind:class="chart.group == 'month' ? 'bg-secondary/100' : ''">Month</div>
                <div class="rounded-r border-r" @click="setData(false, false, 'day')" v-bind:class="chart.group == 'day' ? 'bg-secondary/100' : ''">Day</div>
            </div>

            <div class="flex *:max-h-9 *:h-9 *:min-h-9 *:border-y *:border-border-color *:flex *:justify-center *:items-center *:px-3 hover:*:bg-primary/10 cursor-pointer *:text-lg active:*:bg-primary/20" title="Expenses type">
                <div class="rounded-l border-l" @click="chart.content = 'total'" v-bind:class="chart.content == 'total' ? 'bg-secondary/100' : ''">Total</div>
                <div class="border-y" @click="chart.content = 'product'" v-bind:class="chart.content == 'product' ? 'bg-secondary/100' : ''">Products</div>
                <div class="rounded-r border-r" @click="chart.content = 'other'" v-bind:class="chart.content == 'other' ? 'bg-secondary/100' : ''">Other</div>
            </div>
        </div>
        <div class="flex flex-grow rounded border-2 border-border-color bg-secondary/100">
            <BarChartComponent
                v-if="chart.type == 'bar'"
                class="h-full w-full"
                :data="{
                    labels: this.definedData.date,
                    datasets: [{ label: 'Expenses', data: this.definedData.amount[this.chart.content], fill: true }],
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
                v-if="chart.type == 'line'"
                class="h-full w-full"
                :data="{
                    labels: this.definedData.date,
                    datasets: [{ label: 'Expenses', data: this.definedData.amount[this.chart.content], fill: true }],
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

            definedData: { date: [], amount: { total: [], product: [], other: [] } },
            chart: {
                type: "line",
                group: "day",
                content: "total",
            },
        };
    },
    mounted() {
        this.setData(this.defaultData, this.defaultDate);
    },
    methods: {
        getStyle,

        setData(data, date, group) {
            data = !data ? this.data : data;
            date = !date ? this.date : date;
            group = !group ? this.chart.group : group;

            this.data = data;
            this.chart.group = group;
            this.date = date;

            let newDefinedData = this.defineData(data, date, group);

            if (newDefinedData.chart.type != this.chart.type) {
                this.chart.type = newDefinedData.chart.type;
            }
            if (newDefinedData.data != this.definedData) {
                this.definedData = newDefinedData.data;
            }
        },

        defineData(data, date, group) {
            let newData = { date: [], amount: { total: [], product: [], other: [] } };

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

            newData.amount.product = new Array(days + 1).fill(0);
            newData.amount.total = new Array(days + 1).fill(0);
            newData.amount.other = new Array(days + 1).fill(0);
            let chart = { type: "line" };
            if (days + 1 == 1) {
                chart.type = "bar";
            }

            data.forEach((item) => {
                let productCost = 0;
                let otherCost = 0;
                let totalCost = 0;
                item.costs.forEach((cost) => {
                    totalCost += cost.amount;
                    if (cost.type == "product") {
                        productCost += cost.amount;
                    } else {
                        otherCost += cost.amount;
                    }
                });
                let date = newData.date.indexOf(moment(item.date).format(group == "day" ? "D MMM" : group == "month" ? "MMM YYYY" : "YYYY"));
                newData.amount.total[date] += totalCost;
                newData.amount.product[date] += productCost;
                newData.amount.other[date] += otherCost;
            });

            return { data: newData, chart: chart };
        },
    },
};
</script>
