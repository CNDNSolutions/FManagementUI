<template>
    <div class="[&>*>*]:text-xs @lg:[&>*>*]:text-sm @xl:[&>*>*]:text-base rounded border-2 border-border-color bg-secondary/100">
        <div class="h-9 border-b-2 hover:*:bg-primary/5 *:h-full border-border-color flex items-center justify-between *:w-full *:overflow-hidden *:text-ellipsis *:whitespace-nowrap [&>*+*]:border-l-2 *:border-border-color *:flex *:items-center *:justify-center">
            <!-- <div class="!w-fit min-w-9 px-2">ID</div> -->
            <div class="flex items-center justify-center" @click="sortList('Date')">
                <div>Date</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Date' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="flex items-center justify-center" @click="sortList('Turnover')">
                <div>Turnover</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Turnover' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="flex items-center justify-center" @click="sortList('Gross')">
                <div>Gross Profit</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Gross' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="flex items-center justify-center" @click="sortList('Marginal')">
                <div>Marginal Profit</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Marginal' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="flex items-center justify-center" @click="sortList('Net')">
                <div>Net Profit</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Net' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
        </div>
        <div v-for="item in profit" class="h-9 border-b-2 *:h-full last:border-b-0 hover:bg-primary/5 border-border-color flex items-center justify-between *:w-full *:overflow-hidden *:text-ellipsis *:whitespace-nowrap [&>*+*]:border-l-2 *:border-border-color *:flex *:items-center *:justify-center">
            <div>{{ moment(item.date).format("D MMMM YYYY") }}</div>
            <div>${{ item.turnover.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
            <div>${{ item.gross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
            <div>${{ item.marginal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
            <div>${{ item.net.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import * as icon from "@coreui/icons";
import CIcon from "@coreui/icons-vue";

export default {
    components: {
        CIcon,
    },

    data() {
        return {
            icon,

            sort: {
                by: "Date",
                ASC: true,
            },

            profit: [{ date: "", turnover: 0, gross: 0, marginal: 0, net: 0 }],
        };
    },

    props: {
        defaultData: Object,
    },

    mounted() {
        this.setData(this.defaultData);
    },
    methods: {
        moment,

        setData(data) {
            if (!data) {
                data = this.defaultData;
            }

            this.profit = this.defineProfit(data);
        },
        sortList(by) {
            this.profit = this.getSortedList(this.profit, by, !this.sort.ASC);
            this.sort.ASC = !this.sort.ASC;
            this.sort.by = by;
        },
        defineProfit(data) {
            let newProfit = [];
            data.forEach((item) => {
                let newProfitEl = { date: "", turnover: 0, gross: 0, marginal: 0, net: 0 };
                newProfitEl.date = item.date;
                newProfitEl.turnover = item.profit.toFixed(0);
                newProfitEl.gross = (item.profit - item.profit / (1 + item.markup / 100)).toFixed(0);
                newProfitEl.marginal = (item.profit - item.profit / (1 + item.markup / 100)).toFixed(0);
                newProfitEl.net = (item.profit - item.profit / (1 + item.markup / 100)).toFixed(2);
                item.costs.forEach((cost) => {
                    newProfitEl.net -= cost.amount.toFixed(2);
                    newProfitEl.marginal -= cost.isVariable ? cost.amount.toFixed(0) : 0;
                });
                newProfit.push(newProfitEl);
            });

            return newProfit;
        },
        getSortedList(data, by, asc) {
            if (by == "Turnover") {
                return asc ? [...data].sort((a, b) => a.turnover - b.turnover) : [...data].sort((a, b) => b.turnover - a.turnover);
            }
            if (by == "Gross") {
                return asc ? [...data].sort((a, b) => a.gross - b.gross) : [...data].sort((a, b) => b.gross - a.gross);
            }
            if (by == "Date") {
                return asc ? [...data].sort((a, b) => moment(a.date).unix() - moment(b.date).unix()) : [...data].sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
            }
            if (by == "Marginal") {
                return asc ? [...data].sort((a, b) => a.marginal - b.marginal) : [...data].sort((a, b) => b.marginal - a.marginal);
            }
            if (by == "Net") {
                return asc ? [...data].sort((a, b) => a.net - b.net) : [...data].sort((a, b) => b.net - a.net);
            }
        },
    },
};
</script>
