<script setup>
import ExpensesCardComponent from "@/components/Dashboard/ExpensesCardComponent.vue";
import ProfitCardComponent from "@/components/Dashboard/ProfitCardComponent.vue";
import OthersExpensesComponent from "@/components/Dashboard/OthersExpensesComponent.vue";
import ProductsExpensesComponent from "@/components/Dashboard/ProductsExpensesComponent.vue";
import TitlePathComponent from "@/components/TitlePathComponent.vue";

import { CChart } from "@coreui/vue-chartjs";
import axios from "axios";
</script>

<template>
    <div v-if="data" class="w-4/5">
        <TitlePathComponent />
        <div class="w-full h-[500px] flex">
            <div class="w-1/3 flex flex-col mr-2">
                <ExpensesCardComponent v-if="data" :data="data" />

                <div class="h-2/5 flex mt-2">
                    <OthersExpensesComponent class="h-full w-1/2 mr-2" />
                    <ProductsExpensesComponent class="h-full w-1/2 ml-2" />
                </div>
            </div>
            <ProfitCardComponent />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: false,
        };
    },
    mounted() {
        axios
            .get("http://localhost:8000/api/Entries/")
            .then((response) => {
                this.data = response.data;
            })
            .catch((response) => {
                console.log(response);
            });
    },
};
</script>
