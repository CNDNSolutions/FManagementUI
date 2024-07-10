<script setup>
import DefaultChartComponent from "@/components/DefaultChartComponent.vue";
import * as icon from "@coreui/icons";
import CIcon from "@coreui/icons-vue";
import { CChart } from "@coreui/vue-chartjs";
import { end, start } from "@popperjs/core";
import moment from "moment";
import { getStyle } from "@coreui/utils";
import axios from "axios";
</script>

<template>
    <div class="flex flex-col">
        <div class="flex justify-between mb-2 items-center h-9">
            <div class="">
                <VDatePicker v-model="potentialDate" @did-move="setPotentialDate($event[0].monthComps.firstDayOfMonth)" :is-dark="true">
                    <template #default="{ togglePopover }">
                        <div
                            class="flex justify-center items-center px-3 text-lg rounded max-h-9 h-9 min-h-9 border-2 border-border-color hover:bg-primary/10 cursor-pointer active:bg-primary/20"
                            @click="
                                () => {
                                    if (this.potentialDate != this.date) {
                                        setPotentialDate(this.date);
                                    }
                                    togglePopover();
                                }
                            ">
                            {{ moment(this.date).format("MMMM") }} {{ moment(this.date).format("YYYY") }}
                        </div>
                    </template>
                    <template #footer>
                        <div class="w-full px-4 pb-3">
                            <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md" @click="setDate()">Select</button>
                        </div>
                    </template>
                </VDatePicker>
            </div>

            <div class="flex *:max-h-9 *:h-9 *:min-h-9 *:border-y *:border-border-color *:flex *:justify-center *:items-center *:px-3 hover:*:bg-primary/10 cursor-pointer *:text-lg active:*:bg-primary/20">
                <div ref="expensesViewProductsButton" class="rounded-l border-l" @click="changeChartType('product')" v-bind:class="chartType == 'product' ? 'bg-secondary/100' : ''">Products</div>
                <div ref="expensesViewOthersButton" class="rounded-r border-r" @click="changeChartType('others')" v-bind:class="chartType == 'others' ? 'bg-secondary/100' : ''">Others</div>
            </div>
        </div>
        <div class="h-[400px] flex rounded border-2 border-border-color bg-secondary/100 hover:bg-primary/10 cursor-pointer">
            <DefaultChartComponent
                :key="reload"
                class="h-full w-full"
                :data="{ labels: this.costs.date, datasets: [{ label: 'Expenses', data: this.costs.cost[this.chartType], fill: true }] }"
                :config="{
                    backgroundColor: getStyle('--primary-transparent'),
                    borderColor: getStyle('--primary'),
                    plugins: { legend: { display: false } },
                    maintainAspectRatio: false,
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
                            grid: {
                                color: getStyle('--border-color'),
                            },

                            border: {
                                display: false,

                                dash: [4, 4],
                            },

                            ticks: {
                                padding: 10,
                                autoSkip: false,
                                stepSize: 50,
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
export default {
    props: {
        monthData: Object,
    },
    data() {
        return {
            date: moment().local().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
            potentialDate: moment().local().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
            chartType: "product",

            costs: { date: [], cost: { product: [], others: [] } },

            reload: true,
            loadedData: {},
        };
    },
    created() {
        this.setCosts(this.monthData);
        console.log(this.costs);
    },
    methods: {
        setPotentialDate(date) {
            this.potentialDate = date;
        },
        setDate() {
            this.date = moment(this.potentialDate).format("YYYY-MM-DD HH:mm:ss");
            this.loadData();
        },
        changeChartType(type) {
            this.chartType = type;
        },
        setCosts(data) {
            this.costs = { date: [], cost: { product: [], others: [] } };
            let days = moment(this.date).daysInMonth();
            this.costs.cost.product = new Array(days).fill(0);
            this.costs.cost.others = new Array(days).fill(0);

            for (let index = 1; index < days + 1; index++) {
                this.costs.date.push(index.toString());
            }
            data.forEach((item) => {
                let productCost = 0;
                let othersCost = 0;
                item.costs.forEach((cost) => {
                    if (cost.type == "product") {
                        productCost += cost.amount;
                    } else {
                        othersCost += cost.amount;
                    }
                });
                let date = moment(item.date).format("D");
                this.costs.cost.product[date] = productCost;
                this.costs.cost.others[date] = othersCost;
            });
        },
        loadData() {
            this.dataLoaded = false;
            console.log(this.date);
            axios
                .get("http://localhost:8000/api/Entries?periodStart=" + this.date + "&periodEnd=" + moment(this.date).endOf("month").format("YYYY-MM-DD HH:mm:ss"))
                .then((response) => {
                    this.loadedData = response.data;
                    this.setCosts(this.loadedData);
                    this.reload = !this.reload;
                })
                .catch((response) => {
                    console.log(response);
                });
        },
    },
};
</script>
