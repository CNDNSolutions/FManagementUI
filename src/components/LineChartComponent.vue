<script setup>
import { getStyle } from "@coreui/utils";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler } from "chart.js";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler);
</script>

<template>
    <div>
        <Line :data="this.data" :options="this.options" />
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        options: Object,
    },
};
</script>
