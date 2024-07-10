<script setup>
import CIcon from "@coreui/icons-vue";
import * as icon from "@coreui/icons";
</script>

<template>
    <div class="flex flex-col justify-between rounded border-1 border-border-color bg-secondary/100 p-3 hover:bg-primary/10 cursor-pointer">
        <div class="flex justify-between">
            <div class="font-bold text-xl text-secondary-text">Others</div>
            <CIcon :icon="icon.cilLightbulb" size="xxl" class="border-1 box-content p-1 rounded border-primary bg-primary/20" />
        </div>

        <div class="flex justify-between items-center">
            <div class="text-2xl">{{ costsCount }}</div>
            <div class="font-bold text-2xl text-accent @6xl:text-3xl">${{ currentCosts }}</div>
        </div>
        <div class="flex items-start *:text-sm *:text-red-500">
            <div>(</div>
            <div>17.2% &nbsp;</div>
            <CIcon :icon="icon.cilArrowTop" />
            <div>)</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            costsCount: 0,
            currentCosts: 0,
            lastMontCosts: 0,
        };
    },
    props: {
        data: Object,
    },

    mounted() {
        this.data.forEach((item) => {
            let timeCost = 0;
            let timeCostsCount = 0;
            item.costs.forEach((cost) => {
                if (cost.type != "product") {
                    timeCost += cost.amount;
                    timeCostsCount += 1;
                }
            });
            this.currentCosts += timeCost;
            this.costsCount += timeCostsCount;
        });
    },
};
</script>
