<template>
    <div>
        <div class="w-full min-h-fit hover:*:bg-primary/10 *:cursor-pointer hover:*:border-primary/50 h-full flex @2xl:*:w-1/3 @2xl:[&>*+*]:ml-4 @2xl:[&>*+*]:!mt-0 @2xl:flex-row justify-between flex-col *:w-full [&>*+*]:!mt-4">
            <!-- turnover -->
            <div title="Turnover" class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col justify-between" @click="this.$router.push({ path: '/home/profit', query: { start: this.defaultData[0].date, end: this.defaultData[this.defaultData.length - 1].date, update: true } })">
                <div class="flex justify-between">
                    <div class="font-bold text-xl text-secondary-text">Turnover</div>
                    <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                        <CIcon :icon="icon.cilMoney" class="h-full w-full" size="xxl" />
                    </div>
                </div>

                <div class="text-accent font-semibold text-2xl">${{ definedData.profit.turnover.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
            </div>
            <!-- net porift -->
            <div title="Net profit" class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col justify-between" @click="this.$router.push({ path: '/home/profit', query: { start: this.defaultData[0].date, end: this.defaultData[this.defaultData.length - 1].date, update: true } })">
                <div class="flex justify-between">
                    <div class="font-bold text-xl text-secondary-text">Net profit</div>
                    <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                        <CIcon :icon="icon.cilDollar" class="h-full w-full" size="xxl" />
                    </div>
                </div>

                <div class="text-accent font-semibold text-2xl">${{ definedData.profit.net.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
            </div>
            <!-- expenses -->
            <div title="Total expenses" class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col justify-between" @click="this.$router.push({ path: '/home/expenses', query: { start: this.defaultData[0].date, end: this.defaultData[this.defaultData.length - 1].date, update: true } })">
                <div class="flex justify-between">
                    <div class="font-bold text-xl text-secondary-text">Expenses</div>
                    <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                        <CIcon :icon="icon.cilMoney" class="h-full w-full" size="xxl" />
                    </div>
                </div>

                <div class="text-accent font-semibold text-2xl">${{ definedData.costs.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import * as icon from "@coreui/icons";
import CIcon from "@coreui/icons-vue";
import { CProgress } from "@coreui/vue";

export default {
    components: {
        CIcon,
        CProgress,
    },
    data() {
        return {
            icon,

            definedData: {
                profit: { turnover: 0, net: 0 },
                costs: { total: 0 },
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
        setData(data) {
            let newDefinedData = this.defineData(data);
            this.definedData = newDefinedData;
        },
        defineData(data) {
            let newDefinedData = {
                profit: { turnover: 0, net: 0 },
                costs: { total: 0 },
            };
            data.forEach((item) => {
                newDefinedData.profit.turnover += item.profit;
                newDefinedData.profit.net += item.profit - item.profit / (1 + item.markup / 100);
                item.costs.forEach((cost) => {
                    newDefinedData.costs.total += cost.amount;
                    newDefinedData.profit.net -= cost.amount;
                });
            });

            return newDefinedData;
        },
    },
};
</script>
