<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
</script>

<template>
    <div class="flex min-h-screen">
        <SidebarComponent />
        <RouterView />
    </div>
</template>
