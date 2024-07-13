<script setup>
import TitlePathComponent from "@/components/TitlePathComponent.vue";
</script>

<template>
    <div class="w-5/6 @container" v-if="monthData && yearData && lastMonthData">
        <TitlePathComponent />
        <div class="w-full flex flex-col [&>*+*]:mt-4"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            monthData: false,
            lastMonthData: false,
            yearData: false,
        };
    },
    mounted() {
        let data = JSON.parse(localStorage.getItem("data"));

        this.monthData = data.month;
        this.lastMonthData = data.lastMonth;
        this.yearData = data.year;
    },
    methods: {},
};
</script>
