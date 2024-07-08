<script setup>
import ExpensesChardCardComponent from "@/components/Dashboard/ExpensesCardComponent.vue";
import ProfitChardCardComponent from "@/components/Dashboard/ProfitCardComponent.vue";
import OthersExpensesComponent from "@/components/Dashboard/OthersExpensesComponent.vue";
import ProductsExpensesComponent from "@/components/Dashboard/ProductsExpensesComponent.vue";
import TitlePathComponent from "@/components/TitlePathComponent.vue";

import { CChart } from "@coreui/vue-chartjs";
</script>

<template>
    <div class="w-4/5">
        <TitlePathComponent />
        <div class="w-full h-[500px] flex">
            <div class="w-1/3 flex flex-col mr-2">
                <ExpensesChardCardComponent />

                <div class="h-2/5 flex mt-2">
                    <OthersExpensesComponent class="h-full w-1/2 mr-2" />
                    <ProductsExpensesComponent class="h-full w-1/2 ml-2" />
                </div>
            </div>
            <ProfitChardCardComponent />
        </div>
    </div>
</template>
