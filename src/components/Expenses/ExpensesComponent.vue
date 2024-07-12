<template>
    <div>
        <div class="w-full h-full flex *:w-1/3 justify-between">
            <!-- all -->
            <div class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col justify-between">
                <div class="flex justify-between">
                    <div class="flex items-center">
                        <div class="font-semibold text-xl">{{ definedData.costs.all.count }}</div>
                        <div class="mx-2">/</div>
                        <div class="text-accent font-semibold text-2xl">${{ definedData.costs.all.amount }}</div>
                    </div>

                    <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                        <CIcon :icon="icon.cilCheck" class="h-full w-full" size="xxl" />
                    </div>
                </div>
                <div class="flex items-start *:text-sm" v-bind:class="definedData.profit.net > definedData.costs.all.amount ? '*:text-emerald-500' : '*:text-red-500'">
                    <div>(</div>
                    <div>
                        {{ definedData.profit.net == 0 ? 100 : ((definedData.costs.all.amount / definedData.profit.net) * 100).toFixed(2) }}
                        % &nbsp;
                    </div>
                    <CIcon v-bind:icon="definedData.costs.all.amount >= definedData.profit.net ? icon.cilArrowBottom : icon.cilArrowTop" />
                    <div>)</div>
                </div>

                <CProgress
                    v-bind:color="
                        (definedData.profit.net == 0 ? 100 : ((definedData.costs.all.amount / definedData.profit.net) * 100).toFixed(2)) >= 100 ? 'danger' : (definedData.profit.net == 0 ? 100 : ((definedData.costs.all.amount / definedData.profit.net) * 100).toFixed(2)) >= 70 ? 'warning' : 'success'
                    "
                    class="h-2 bg-transparent border-1 border-border-color"
                    :value="definedData.profit.net == 0 ? 100 : ((definedData.costs.all.amount / definedData.profit.net) * 100).toFixed(2)" />
            </div>
            <!-- products -->
            <div class="border-2 mx-4 bg-secondary/100 border-border-color rounded p-3 flex flex-col justify-between">
                <div class="flex justify-between">
                    <div class="flex items-center">
                        <div class="font-semibold text-xl">{{ definedData.costs.product.count }}</div>
                        <div class="mx-2">/</div>
                        <div class="text-accent font-semibold text-2xl">${{ definedData.costs.product.amount }}</div>
                    </div>

                    <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                        <CIcon :icon="icon.cilTruck" class="h-full w-full" size="xxl" />
                    </div>
                </div>
                <div class="flex items-start *:text-sm" v-bind:class="definedData.profit.net > definedData.costs.product.amount ? '*:text-emerald-500' : '*:text-red-500'">
                    <div>(</div>
                    <div>
                        {{ definedData.profit.net == 0 ? 100 : ((definedData.costs.product.amount / definedData.profit.net) * 100).toFixed(2) }}
                        % &nbsp;
                    </div>
                    <CIcon v-bind:icon="definedData.costs.product.amount >= definedData.profit.net ? icon.cilArrowBottom : icon.cilArrowTop" />
                    <div>)</div>
                </div>

                <CProgress
                    v-bind:color="
                        (definedData.profit.net == 0 ? 100 : ((definedData.costs.product.amount / definedData.profit.net) * 100).toFixed(2)) >= 100
                            ? 'danger'
                            : (definedData.profit.net == 0 ? 100 : ((definedData.costs.product.amount / definedData.profit.net) * 100).toFixed(2)) >= 70
                            ? 'warning'
                            : 'success'
                    "
                    class="h-2 bg-transparent border-1 border-border-color"
                    :value="definedData.profit.net == 0 ? 100 : ((definedData.costs.product.amount / definedData.profit.net) * 100).toFixed(2)" />
            </div>
            <!-- others -->
            <div class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col justify-between">
                <div class="flex justify-between">
                    <div class="flex items-center">
                        <div class="font-semibold text-xl">{{ definedData.costs.others.count }}</div>
                        <div class="mx-2">/</div>
                        <div class="text-accent font-semibold text-2xl">${{ definedData.costs.others.amount }}</div>
                    </div>

                    <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                        <CIcon :icon="icon.cilLightbulb" class="h-full w-full" size="xxl" />
                    </div>
                </div>
                <div class="flex items-start *:text-sm" v-bind:class="definedData.profit.net > definedData.costs.others.amount ? '*:text-emerald-500' : '*:text-red-500'">
                    <div>(</div>
                    <div>
                        {{ definedData.profit.net == 0 ? 100 : ((definedData.costs.others.amount / definedData.profit.net) * 100).toFixed(2) }}
                        % &nbsp;
                    </div>
                    <CIcon v-bind:icon="definedData.costs.others.amount >= definedData.profit.net ? icon.cilArrowBottom : icon.cilArrowTop" />
                    <div>)</div>
                </div>

                <CProgress
                    v-bind:color="
                        (definedData.profit.net == 0 ? 100 : ((definedData.costs.others.amount / definedData.profit.net) * 100).toFixed(2)) >= 100
                            ? 'danger'
                            : (definedData.profit.net == 0 ? 100 : ((definedData.costs.others.amount / definedData.profit.net) * 100).toFixed(2)) >= 70
                            ? 'warning'
                            : 'success'
                    "
                    class="h-2 bg-transparent border-1 border-border-color"
                    :value="definedData.profit.net == 0 ? 100 : ((definedData.costs.others.amount / definedData.profit.net) * 100).toFixed(2)" />
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
                profit: { total: 0, net: 0 },
                costs: { all: { amount: 0, count: 0 }, product: { amount: 0, count: 0 }, others: { amount: 0, count: 0 } },
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
                profit: { total: 0, net: 0 },
                costs: { all: { amount: 0, count: 0 }, product: { amount: 0, count: 0 }, others: { amount: 0, count: 0 } },
            };
            data.forEach((item) => {
                newDefinedData.profit.total += item.profit;
                newDefinedData.profit.net += item.profit / (1 + item.markup / 100);
                item.costs.forEach((cost) => {
                    newDefinedData.costs.all.amount += cost.amount;
                    newDefinedData.costs.all.count += 1;
                    if (cost.type == "product") {
                        newDefinedData.costs.product.amount += cost.amount;
                        newDefinedData.costs.product.count += 1;
                    } else {
                        newDefinedData.costs.others.amount += cost.amount;
                        newDefinedData.costs.others.count += 1;
                    }
                });
            });
            console.log(newDefinedData);
            return newDefinedData;
        },
    },
};
</script>
