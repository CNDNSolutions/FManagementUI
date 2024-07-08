<script setup>
import { CChart } from "@coreui/vue-chartjs";
import { getStyle } from "@coreui/utils";
</script>

<template>
    <div class="w-2/3 ml-2 rounded border-1 border-border-color bg-secondary/100 flex flex-col justify-between px-3">
        <div class="h-1/4 py-3 flex justify-between">
            <div>
                <div class="font-bold text-2xl">Profit</div>
                <div class="text-base font-light">January 1, 2022 - December 31, 2022</div>
            </div>
            <div class="text-accent text-3xl font-semibold">$651.2</div>
        </div>
        <CChart
            type="bar"
            class="h-3/4 w-full"
            :custom-tooltips="false"
            :data="{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
                datasets: [
                    {
                        label: 'Profit',
                        backgroundColor: getStyle('--primary'),
                        data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                        barPercentage: 0.6,
                    },
                    {
                        label: 'Expenses',
                        backgroundColor: getStyle('--text'),
                        data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                        barPercentage: 0.6,
                    },
                ],
            }"
            :options="{
                borderSkipped: false,
                barThickness: 'flex',
                maxBarThickness: 8,
                barPercentage: 0.1,
                categoryPercentage: 0.3,
                borderRadius: 20,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawTicks: false,
                        },

                        max: 11,

                        ticks: {
                            maxTicksLimit: 11,
                            autoSkip: false,
                            stepSize: 1,
                            color: getStyle('--text'),
                        },
                    },
                    y: {
                        grid: {
                            color: getStyle('--border-color'),
                        },

                        border: {
                            display: false,

                            dash: [4, 4],
                        },

                        ticks: {
                            padding: 20,
                            maxTicksLimit: 5,
                            autoSkip: false,
                            stepSize: 5,
                            color: getStyle('--text'),
                        },
                    },
                },
            }" />
    </div>
</template>

<script></script>
