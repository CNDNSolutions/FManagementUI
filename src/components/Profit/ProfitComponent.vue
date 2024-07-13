<template>
    <div>
        <!-- w-full *:flex min-h-fit flex *:w-1/2 [&>*>*]:w-1/2 [&>*>*+*]:ml-4 [&>*+*]:ml-4 justify-between -->
        <div class="w-full *:flex min-h-fit flex flex-col *:w-full *:flex-col [&>*+*]:mt-4 [&>*>*+*]:mt-4 justify-between @lg:*:flex-row @lg:[&>*>*]:w-1/2 @lg:[&>*>*+*]:mt-0 @lg:[&>*>*+*]:ml-4 @3xl:flex-row @3xl:[&>*+*]:mt-0 @3xl:[&>*+*]:ml-4">
            <!-- Turnover -->
            <div>
                <div title="Turnover" class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col">
                    <div class="flex justify-between">
                        <div class="font-bold text-xl text-secondary-text">Turnover</div>

                        <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                            <CIcon :icon="icon.cilMoney" class="h-full w-full" size="xxl" />
                        </div>
                    </div>

                    <div class="text-accent font-semibold text-2xl">
                        ${{
                            profit.turnover
                                .toFixed(0)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }}
                    </div>
                </div>
                <!-- Gross profit -->
                <div title="Gross profit" class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col">
                    <div class="flex justify-between">
                        <div class="font-bold text-xl text-secondary-text">Gross profit</div>

                        <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                            <CIcon :icon="icon.cilDiamond" class="h-full w-full" size="xxl" />
                        </div>
                    </div>

                    <div class="text-accent font-semibold text-2xl">
                        ${{
                            profit.gross
                                .toFixed(0)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }}
                    </div>
                </div>
            </div>
            <!-- Marginal profit -->
            <div>
                <div title="Marginal profit" class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col">
                    <div class="flex justify-between">
                        <div class="font-bold text-xl text-secondary-text">Marginal profit</div>

                        <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                            <CIcon :icon="icon.cilFlagAlt" class="h-full w-full" size="xxl" />
                        </div>
                    </div>

                    <div class="text-accent font-semibold text-2xl">
                        ${{
                            profit.marginal
                                .toFixed(0)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }}
                    </div>
                </div>

                <!-- Net profit -->
                <div title="Net profit" class="border-2 bg-secondary/100 border-border-color rounded p-3 flex flex-col">
                    <div class="flex justify-between">
                        <div class="font-bold text-xl text-secondary-text">Net profit</div>

                        <div class="bg-primary/20 border-1 border-primary/50 rounded ml-2 h-9 w-9 p-1">
                            <CIcon :icon="icon.cilDollar" class="h-full w-full" size="xxl" />
                        </div>
                    </div>

                    <div class="text-accent font-semibold text-2xl">
                        ${{
                            profit.net
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as icon from "@coreui/icons";
import CIcon from "@coreui/icons-vue";

export default {
    components: {
        CIcon,
    },
    data() {
        return {
            icon,

            profit: { turnover: 0, gross: 0, marginal: 0, net: 0 },
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
            if (!data) {
                data = this.defaultData;
            }
            this.profit = this.defineProfit(data);
        },
        defineProfit(data) {
            let newProfit = { turnover: 0, gross: 0, marginal: 0, net: 0 };
            data.forEach((item) => {
                newProfit.turnover += parseInt(item.profit.toFixed(0));
                newProfit.gross += parseInt((item.profit - item.profit / (1 + item.markup / 100)).toFixed(0));
                newProfit.marginal += parseInt((item.profit - item.profit / (1 + item.markup / 100)).toFixed(0));
                newProfit.net += parseFloat((item.profit - item.profit / (1 + item.markup / 100)).toFixed(2));
                item.costs.forEach((cost) => {
                    newProfit.net -= parseFloat(cost.amount.toFixed(2));
                    newProfit.marginal -= cost.isVariable ? parseInt(cost.amount.toFixed(0)) : 0;
                });
            });
            return newProfit;
        },
    },
};
</script>
