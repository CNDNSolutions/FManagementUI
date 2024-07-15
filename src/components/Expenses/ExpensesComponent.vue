<template>
    <div>
        <div class="w-full min-h-fit h-full flex @2xl:*:w-1/3 @2xl:[&>*+*]:ml-4 @2xl:[&>*+*]:!mt-0 @2xl:flex-row justify-between flex-col *:w-full [&>*+*]:!mt-4">
            <!-- total -->
            <div title="Total expenses" class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col justify-between">
                <div class="flex justify-between">
                    <div class="font-bold text-xl text-secondary-text">Total</div>
                    <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                        <CIcon :icon="icon.cilMoney" class="h-full w-full" size="xxl" />
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="font-semibold text-xl">{{ definedData.costs.total.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
                    <div class="mx-2">/</div>
                    <div class="text-accent font-semibold text-2xl">${{ definedData.costs.total.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
                </div>
                <div class="flex justify-between">
                    <div class="text-sm text-emerald-500">0%</div>
                    <div class="text-sm" v-bind:class="definedData.profit.turnover > definedData.costs.total.amount ? 'text-emerald-500' : 'text-red-500'">
                        {{
                            definedData.profit.turnover == 0
                                ? definedData.costs.total.amount
                                : ((definedData.costs.total.amount / definedData.profit.turnover) * 100)
                                      .toFixed(2)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }}%
                    </div>
                </div>
                <CProgress
                    v-bind:color="(definedData.profit.turnover == 0 ? 100 : ((definedData.costs.total.amount / definedData.profit.turnover) * 100).toFixed(2)) >= 100 ? 'danger' : (definedData.profit.turnover == 0 ? 100 : ((definedData.costs.total.amount / definedData.profit.turnover) * 100).toFixed(2)) >= 70 ? 'warning' : 'success'"
                    class="h-2 bg-transparent border-1 border-border-color"
                    :value="definedData.profit.turnover == 0 ? 100 : ((definedData.costs.total.amount / definedData.profit.turnover) * 100).toFixed(2)" />
            </div>
            <!-- products -->
            <div title="Product expenses" class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col justify-between">
                <div class="flex justify-between">
                    <div class="font-bold text-xl text-secondary-text">Product</div>
                    <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                        <CIcon :icon="icon.cilTruck" class="h-full w-full" size="xxl" />
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="font-semibold text-xl">{{ definedData.costs.product.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
                    <div class="mx-2">/</div>
                    <div class="text-accent font-semibold text-2xl">${{ definedData.costs.product.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
                </div>
                <div class="flex justify-between">
                    <div class="text-sm text-emerald-500">0%</div>
                    <div class="text-sm" v-bind:class="definedData.profit.turnover > definedData.costs.total.amount ? 'text-emerald-500' : 'text-red-500'">
                        {{
                            definedData.profit.turnover == 0
                                ? definedData.costs.product.amount
                                : ((definedData.costs.product.amount / definedData.profit.turnover) * 100)
                                      .toFixed(2)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }}%
                    </div>
                </div>

                <CProgress
                    v-bind:color="(definedData.profit.turnover == 0 ? 100 : ((definedData.costs.product.amount / definedData.profit.turnover) * 100).toFixed(2)) >= 100 ? 'danger' : (definedData.profit.turnover == 0 ? 100 : ((definedData.costs.product.amount / definedData.profit.turnover) * 100).toFixed(2)) >= 70 ? 'warning' : 'success'"
                    class="h-2 bg-transparent border-1 border-border-color"
                    :value="definedData.profit.turnover == 0 ? 100 : ((definedData.costs.product.amount / definedData.profit.turnover) * 100).toFixed(2)" />
            </div>
            <!-- other -->
            <div title="Other expenses" class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col justify-between">
                <div class="flex justify-between">
                    <div class="font-bold text-xl text-secondary-text">Other</div>
                    <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                        <CIcon :icon="icon.cilLightbulb" class="h-full w-full" size="xxl" />
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="font-semibold text-xl">{{ definedData.costs.other.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
                    <div class="mx-2">/</div>
                    <div class="text-accent font-semibold text-2xl">${{ definedData.costs.other.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</div>
                </div>
                <div class="flex justify-between">
                    <div class="text-sm text-emerald-500">0%</div>
                    <div class="text-sm" v-bind:class="definedData.profit.turnover > definedData.costs.other.amount ? 'text-emerald-500' : 'text-red-500'">
                        {{
                            definedData.profit.turnover == 0
                                ? definedData.costs.other.amount
                                : ((definedData.costs.other.amount / definedData.profit.turnover) * 100)
                                      .toFixed(2)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }}%
                    </div>
                </div>

                <CProgress
                    v-bind:color="(definedData.profit.turnover == 0 ? 100 : ((definedData.costs.other.amount / definedData.profit.turnover) * 100).toFixed(2)) >= 100 ? 'danger' : (definedData.profit.turnover == 0 ? 100 : ((definedData.costs.other.amount / definedData.profit.turnover) * 100).toFixed(2)) >= 70 ? 'warning' : 'success'"
                    class="h-2 bg-transparent border-1 border-border-color"
                    :value="definedData.profit.turnover == 0 ? 100 : ((definedData.costs.other.amount / definedData.profit.turnover) * 100).toFixed(2)" />
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
                profit: { turnover: 0 },
                costs: { total: { amount: 0, count: 0 }, product: { amount: 0, count: 0 }, other: { amount: 0, count: 0 } },
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
                profit: { turnover: 0 },
                costs: { total: { amount: 0, count: 0 }, product: { amount: 0, count: 0 }, other: { amount: 0, count: 0 } },
            };
            data.forEach((item) => {
                newDefinedData.profit.turnover += item.profit;
                item.costs.forEach((cost) => {
                    newDefinedData.costs.total.amount += cost.amount;
                    newDefinedData.costs.total.count += 1;
                    if (cost.type == "product") {
                        newDefinedData.costs.product.amount += cost.amount;
                        newDefinedData.costs.product.count += 1;
                    } else {
                        newDefinedData.costs.other.amount += cost.amount;
                        newDefinedData.costs.other.count += 1;
                    }
                });
            });
            return newDefinedData;
        },
    },
};
</script>
