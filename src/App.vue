<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<template>
    <div class="flex min-h-screen overflow-hidden">
        <SidebarComponent ref="sidebar" />
        <div class="max-h-screen overflow-auto w-full bg-background">
            <HeaderComponent @show-sidebar="this.$refs.sidebar.show()" />
            <div class="w-full flex justify-center mt-14 mb-16 *:max-w-[1400px] pb-[500px]">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>
