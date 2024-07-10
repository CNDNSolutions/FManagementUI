<script setup>
import { CChart } from "@coreui/vue-chartjs";
import { getStyle } from "@coreui/utils";
</script>

<template>
    <CChart type="line" :custom-tooltips="false" :data="data" :options="chartConfig" />
</template>

<script>
export default {
    data() {
        return {
            chartConfig: {
                backgroundColor: getStyle("--primary-transparent"),
                borderColor: getStyle("--primary"),
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: { x: { border: { display: false }, display: false }, y: { display: false } },
                elements: {
                    line: {
                        borderWidth: 3,
                        tension: 0.4,
                    },
                    point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
                },
            },
        };
    },
    props: {
        data: Object,
        config: Object,
    },
    mounted() {
        if (this.config) {
            this.chartConfig = this.config;
        }
    },
};
</script>
