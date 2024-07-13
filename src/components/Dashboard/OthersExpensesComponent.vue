<script setup>
import CIcon from "@coreui/icons-vue";
import * as icon from "@coreui/icons";
</script>

<template>
    <div class="flex flex-col justify-between rounded border-2 border-border-color bg-secondary/100 p-3 hover:bg-primary/10 cursor-pointer">
        <div class="flex justify-between">
            <div class="font-bold text-xl text-secondary-text">Others</div>
            <CIcon :icon="icon.cilLightbulb" size="xxl" class="border-1 box-content p-1 rounded border-primary bg-primary/20" />
        </div>

        <div class="flex justify-between items-center">
            <div class="text-2xl">{{ costs.currentMonth.count }}</div>
            <div class="font-bold text-2xl text-accent @6xl:text-3xl">${{ costs.currentMonth.amount }}</div>
        </div>
        <div v-bind:class="costs.lastMonth.amount > costs.currentMonth.amount ? ' *:text-emerald-500 ' : ' *:text-red-500'" class="flex items-start *:text-sm">
            <div>(</div>
            <div>{{ costs.lastMonth.amount == 0 ? 100 : (((costs.currentMonth.amount - costs.lastMonth.amount) / costs.lastMonth.amount) * 100).toFixed(2).toString().replace("-", "") }} % &nbsp;</div>
            <CIcon v-bind:icon="costs.lastMonth.amount > costs.currentMonth.amount ? icon.cilArrowBottom : icon.cilArrowTop" />
            <div>)</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            costs: {
                currentMonth: {
                    count: 0,
                    amount: 0,
                },
                lastMonth: {
                    amount: 0,
                    count: 0,
                },
            },
        };
    },
    props: {
        defaultData: Object,
    },

    mounted() {
        this.setCosts(this.defaultData);
    },
    methods: {
        setCosts(data) {
            if (!data) {
                data = this.defaultData;
            }

            this.costs.currentMonth = this.defineCosts(data.currentMonth);
            this.costs.lastMonth = this.defineCosts(data.lastMonth);
        },
        defineCosts(data) {
            let costs = { amount: 0, count: 0 };

            data.forEach((item) => {
                item.costs.forEach((cost) => {
                    if (cost.type != "product") {
                        costs.amount += cost.amount;
                        costs.count += 1;
                    }
                });
            });

            return costs;
        },
    },
};
</script>
