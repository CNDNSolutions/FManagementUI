<script setup lang="ts">
import CIcon from "@coreui/icons-vue";
import * as icon from "@coreui/icons";
</script>

<template>
    <div class="w-full h-16 border-b-2 border-border-color items-center px-16 hidden max-[1000px]:flex">
        <div class="p-1 border-1 rounded bg-primary/10 border-border-color flex justify-items-center active:bg-primary/20" @click="this.$emit('show-sidebar')">
            <CIcon :icon="icon.cilMenu" size="xxl" />
        </div>
    </div>
</template>
