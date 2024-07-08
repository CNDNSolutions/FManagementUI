<script setup>
import CIcon from "@coreui/icons-vue";
import * as icon from "@coreui/icons";
</script>

<template>
    <div class="flex flex-col rounded border-1 border-border-color bg-secondary/100 p-4 hover:bg-primary/10 cursor-pointer">
        <div class="flex justify-between">
            <div class="font-bold text-2xl">Others</div>
            <CIcon :icon="icon.cilLightbulb" size="xxl" class="border-1 box-content p-1 rounded border-primary bg-primary/20" />
        </div>

        <div class="flex flex-col mt-1">
            <div class="flex items-end">
                <div class="text-2xl">152</div>
                <div class="text-xl ml-2">Oreders for</div>
            </div>
            <div class="font-bold text-3xl text-accent">$1245.5</div>
        </div>
        <div class="mt-auto flex items-start *:text-sm *:text-red-500">
            <div>(</div>
            <div>17.2% &nbsp;</div>
            <CIcon :icon="icon.cilArrowTop" />
            <div>)</div>
        </div>
    </div>
</template>

<script>
export default {};
</script>
