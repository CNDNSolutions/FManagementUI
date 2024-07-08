<script setup>
import { CChart } from "@coreui/vue-chartjs";
import { getStyle } from "@coreui/utils";
</script>

<template>
    <div class="h-3/5 mb-2 rounded border-1 border-border-color bg-secondary/100 hover:bg-primary/10 cursor-pointer flex flex-col justify-between">
        <div class="w-full p-3 flex justify-between items-center">
            <div class="flex flex-col">
                <div class="font-bold text-2xl">Expenses</div>
                <div class="text-base font-light">January - July 2023</div>
            </div>
            <div class="text-accent text-3xl font-semibold">$651.2</div>
        </div>
        <CChart
            type="line"
            class="h-auto"
            :custom-tooltips="false"
            :data="{ labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], datasets: [{ label: 'Expenses', data: [78, 81, 80, 45, 34, 12, 40], fill: true }] }"
            :options="{
                backgroundColor: getStyle('--primary-transparent'),
                borderColor: getStyle('--primary'),
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                scales: { x: { border: { display: false }, display: false }, y: { display: false } },
                elements: {
                    line: {
                        color: 'red',
                        borderWidth: 2,
                        tension: 0.4,
                    },
                    point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
                },
            }" />
    </div>
</template>

<script></script>
