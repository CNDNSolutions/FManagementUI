<script setup>
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem, CBadge, CNavGroup, CSidebarFooter, CSidebarToggler } from "@coreui/vue";
import CIcon from "@coreui/icons-vue";
import * as icon from "@coreui/icons";
</script>

<template>
    <CSidebar color-scheme="dark" class="nunito-all border" :narrow="narrow">
        <CSidebarNav>
            <CSidebarHeader class="border-bottom mb-3 min-w-12">
                <CSidebarBrand class="font-bold">CNDN</CSidebarBrand>
            </CSidebarHeader>
            <CNavItem href="#" @click="goTo('/home/dashboard')">
                <CIcon customClassName="nav-icon" :icon="icon.cilSpeedometer" />
                Dashboard
            </CNavItem>
            <CNavTitle class="mt-0">Statistics</CNavTitle>
            <CNavItem href="#" @click="goTo('/home/overview')">
                <CIcon customClassName="nav-icon" :icon="icon.cilCompass" />
                Overview
            </CNavItem>
            <CNavTitle class="mt-0">Details</CNavTitle>
            <CNavItem href="#" @click="goTo('/home/expenses')">
                <CIcon customClassName="nav-icon" :icon="icon.cilMoney" />
                Expenses
            </CNavItem>
            <CNavItem href="#" @click="goTo('/home/profit')">
                <CIcon customClassName="nav-icon" :icon="icon.cilWallet" />
                Profit
            </CNavItem>
        </CSidebarNav>
        <CSidebarFooter class="border-top h-12 hover:bg-gray-700/25 cursor-pointer" @click="close()">
            <CIcon customClassName="nav-icon" :icon="icon.cilChevronRight" class="!h-6 transition-transform duration-500 ease-out" ref="closeIcon" />
        </CSidebarFooter>
    </CSidebar>
</template>

<script>
export default {
    data() {
        return {
            narrow: true,
        };
    },
    methods: {
        close() {
            this.narrow = !this.narrow;
            this.$refs.closeIcon.$el.classList.toggle("rotate-180");
        },
        goTo(path) {
            this.$router.replace({ path: path });
        },
    },
};
</script>
