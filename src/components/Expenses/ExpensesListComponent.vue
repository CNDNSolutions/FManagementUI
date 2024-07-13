<template>
    <div class="[&>*>*]:text-xs @lg:[&>*>*]:text-sm @xl:[&>*>*]:text-base rounded border-2 border-border-color bg-secondary/100">
        <div class="h-9 border-b-2 hover:*:bg-primary/5 *:h-full border-border-color flex items-center justify-between *:w-full *:overflow-hidden *:text-ellipsis *:whitespace-nowrap [&>*+*]:border-l-2 *:border-border-color *:flex *:items-center *:justify-center">
            <!-- <div class="!w-fit min-w-9 px-2">ID</div> -->
            <div class="flex items-center justify-center" @click="sortList('Date')" @dblclick="this.closed.includes('Date') ? this.closed.splice(this.closed.indexOf('Date'), 1) : this.closed.length < 4 ? this.closed.push('Date') : ''" v-bind:class="this.closed.includes('Date') ? ' *:overflow-hidden max-w-9' : ''">
                <div>Date</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Date' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="flex items-center justify-center" @click="sortList('Amount')" @dblclick="this.closed.includes('Amount') ? this.closed.splice(this.closed.indexOf('Amount'), 1) : this.closed.length < 4 ? this.closed.push('Amount') : ''" v-bind:class="this.closed.includes('Amount') ? ' *:overflow-hidden max-w-9' : ''">
                <div>Amount</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Amount' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="flex items-center justify-center" @click="sortList('Type')" @dblclick="this.closed.includes('Type') ? this.closed.splice(this.closed.indexOf('Type'), 1) : this.closed.length < 4 ? this.closed.push('Type') : ''" v-bind:class="this.closed.includes('Type') ? ' *:overflow-hidden max-w-9' : ''">
                <div>Type</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Type' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="@lg:!flex items-center justify-center !hidden" @click="sortList('Description')" @dblclick="this.closed.includes('Description') ? this.closed.splice(this.closed.indexOf('Description'), 1) : this.closed.length < 4 ? this.closed.push('Description') : ''" v-bind:class="this.closed.includes('Description') ? ' *:overflow-hidden max-w-9' : ''">
                <div>Description</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'Description' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
            <div class="flex items-center justify-center" @click="sortList('ExpensesProfit')" @dblclick="this.closed.includes('ExpenseProfit') ? this.closed.splice(this.closed.indexOf('ExpenseProfit'), 1) : this.closed.length < 4 ? this.closed.push('ExpenseProfit') : ''" v-bind:class="this.closed.includes('ExpenseProfit') ? ' *:overflow-hidden max-w-9' : ''">
                <div>Expenses / Profit</div>
                <CIcon :key="sort.ASC" class="ml-2" v-bind:icon="sort.by == 'ExpensesProfit' ? (sort.ASC ? icon.cilArrowTop : icon.cilArrowBottom) : icon.cilMinus" />
            </div>
        </div>
        <div v-for="item in definedData" class="h-9 border-b-2 *:h-full last:border-b-0 hover:bg-primary/5 border-border-color flex items-center justify-between *:w-full *:overflow-hidden *:text-ellipsis *:whitespace-nowrap [&>*+*]:border-l-2 *:border-border-color *:flex *:items-center *:justify-center">
            <div v-bind:class="this.closed.includes('Date') ? ' overflow-hidden max-w-9' : ''" :title="item.cost.date">{{ item.cost.date }}</div>
            <div v-bind:class="this.closed.includes('Amount') ? ' overflow-hidden max-w-9' : ''" :title="'$' + item.cost.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')">${{ item.cost.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
            <div v-bind:class="this.closed.includes('Type') ? ' overflow-hidden max-w-9' : ''" :title="item.cost.type.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '')">{{ item.cost.type.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
            <div v-bind:class="this.closed.includes('Description') ? ' overflow-hidden max-w-9' : ''" class="!hidden @lg:!block" :title="item.cost.description">{{ item.cost.description }}</div>
            <div v-bind:class="this.closed.includes('ExpenseProfit') ? ' overflow-hidden max-w-9' : ''" :title="item.cost.expensesProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '%'">{{ item.cost.expensesProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}%</div>
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

            closed: [],

            sort: {
                by: "Date",
                ASC: true,
            },

            definedData: [
                {
                    profit: { total: 0, net: 0 },
                    cost: { date: "", amount: 0, type: "", description: "", expensesProfit: 0 },
                },
            ],
        };
    },

    props: {
        defaultData: Object,
    },

    mounted() {
        this.setData(this.defaultData);
    },
    methods: {
        sortList(by) {
            this.definedData = this.getSortedList(by, !this.sort.ASC);
            this.sort.ASC = !this.sort.ASC;
            this.sort.by = by;
        },
        getSortedList(by, asc) {
            let data = this.definedData;
            if (by == "Amount") {
                return asc ? [...data].sort((a, b) => a.cost.amount - b.cost.amount) : [...data].sort((a, b) => b.cost.amount - a.cost.amount);
            }
            if (by == "ExpensesProfit") {
                return asc ? [...data].sort((a, b) => a.cost.expensesProfit - b.cost.expensesProfit) : [...data].sort((a, b) => b.cost.expensesProfit - a.cost.expensesProfit);
            }
            if (by == "Date") {
                return asc ? [...data].sort((a, b) => moment(a.cost.date).unix() - moment(b.cost.date).unix()) : [...data].sort((a, b) => moment(b.cost.date).unix() - moment(a.cost.date).unix());
            }
            if (by == "Description") {
                return asc ? [...data].sort((a, b) => a.cost.description.length - b.cost.description.length) : [...data].sort((a, b) => b.cost.description.length - a.cost.description.length);
            }
            if (by == "Type") {
                return asc ? [...data].sort((a, b) => a.cost.type.length - b.cost.type.length) : [...data].sort((a, b) => b.cost.type.length - a.cost.type.length);
            }
        },
        setData(data) {
            let newDefinedData = this.defineData(data);
            this.definedData = newDefinedData;
        },
        defineData(data) {
            let newDefinedData = [];
            data.forEach((item) => {
                item.costs.forEach((cost) => {
                    let newDefinedDataEl = {
                        profit: { total: 0, net: 0 },
                        cost: { date: "", amount: 0, type: "", description: "", expensesProfit: 0 },
                    };

                    newDefinedDataEl.profit.total = item.profit;
                    newDefinedDataEl.profit.net = item.profit - item.profit / (1 + item.markup / 100);
                    newDefinedDataEl.cost.date = moment(item.date).format("D MMMM YYYY");
                    newDefinedDataEl.cost.type = cost.type;
                    newDefinedDataEl.cost.amount = cost.amount;
                    newDefinedDataEl.cost.description = cost.description;
                    newDefinedDataEl.cost.expensesProfit = (newDefinedDataEl.profit.net == 0 ? 100 : (newDefinedDataEl.cost.amount / newDefinedDataEl.profit.net) * 100).toFixed(2);

                    newDefinedData.push(newDefinedDataEl);
                });
            });
            return newDefinedData;
        },
    },
};
</script>
