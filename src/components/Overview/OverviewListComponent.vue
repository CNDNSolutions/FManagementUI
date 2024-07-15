<template>
    <div class="[&>*>*]:text-xs @lg:[&>*>*]:text-sm @xl:[&>*>*]:text-base rounded border-2 border-border-color bg-secondary/100">
        <div class="h-9 border-b-2 hover:*:bg-primary/5 *:h-full border-border-color flex items-center justify-between *:w-full *:overflow-hidden *:text-ellipsis *:whitespace-nowrap [&>*+*]:border-l-2 *:border-border-color *:flex *:items-center *:justify-center">
            <div class="flex items-center justify-center" @click="sortList('Date')">
                <div>Date</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Date' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="flex items-center justify-center" @click="sortList('Turnover')">
                <div>Turnover</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Turnover' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="flex items-center justify-center" @click="sortList('Net')">
                <div>Net profit</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Net' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="flex items-center justify-center" @click="sortList('Costs')">
                <div>Total expenses</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Costs' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
        </div>
        <div v-for="item in definedData" class="h-9 border-b-2 *:h-full last:border-b-0 hover:bg-primary/5 border-border-color flex items-center justify-between *:w-full *:overflow-hidden *:text-ellipsis *:whitespace-nowrap [&>*+*]:border-l-2 *:border-border-color *:flex *:items-center *:justify-center">
            <div>{{ moment(item.date).format("D MMMM YYYY") }}</div>
            <div class="hover:bg-primary/10" @click="this.$router.push({ path: '/home/profit', query: { start: item.date, end: item.date, update: true } })">${{ item.profit.turnover.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
            <div class="hover:bg-primary/10" @click="this.$router.push({ path: '/home/profit', query: { start: item.date, end: item.date, update: true } })">${{ item.profit.net.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
            <div class="hover:bg-primary/10" @click="this.$router.push({ path: '/home/expenses', query: { start: item.date, end: item.date, update: true } })">${{ item.costs.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
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

            definedData: [{ date: "", profit: { turnover: 0, net: 0 }, costs: { total: 0 } }],

            sort: {
                by: "Date",
                ASC: true,
            },
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
            data = !data ? this.defaultData : data;

            this.definedData = this.defineData(data);
        },
        sortList(by) {
            this.definedData = this.getSortedList(this.definedData, by, !this.sort.ASC);
            this.sort.ASC = !this.sort.ASC;
            this.sort.by = by;
        },
        defineData(data) {
            let newData = [];
            data.forEach((item) => {
                let newDataEl = { date: "", profit: { turnover: 0, net: 0 }, costs: { total: 0 } };
                newDataEl.date = item.date;
                newDataEl.profit.turnover = parseInt(item.profit.toFixed(0));
                newDataEl.profit.net = parseFloat(item.profit.toFixed(2));
                item.costs.forEach((cost) => {
                    newDataEl.profit.net -= parseFloat(cost.amount.toFixed(2));
                    newDataEl.costs.total += parseInt(cost.amount.toFixed(0));
                });
                newData.push(newDataEl);
            });

            return newData;
        },
        getSortedList(data, by, asc) {
            if (by == "Turnover") {
                return asc ? [...data].sort((a, b) => a.profit.turnover - b.profit.turnover) : [...data].sort((a, b) => b.profit.turnover - a.profit.turnover);
            }
            if (by == "Date") {
                return asc ? [...data].sort((a, b) => moment(a.date).unix() - moment(b.date).unix()) : [...data].sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
            }
            if (by == "Costs") {
                return asc ? [...data].sort((a, b) => a.costs.total - b.costs.total) : [...data].sort((a, b) => b.costs.total - a.costs.total);
            }
            if (by == "Net") {
                return asc ? [...data].sort((a, b) => a.profit.net - b.profit.net) : [...data].sort((a, b) => b.profit.net - a.profit.net);
            }
        },
    },
};
</script>
