<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
</script>

<template>
    <div class="flex min-h-screen overflow-hidden">
        <SidebarComponent />
        <div class="max-h-screen overflow-auto w-full bg-background">
            <div class="w-full flex justify-center mt-14 mb-16 *:max-w-[1400px] pb-[500px]">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>
