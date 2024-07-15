<template>
    <CSidebar v-bind:class="visible ? 'max-[1000px]:w-full' : ''" color-scheme="dark" class="nunito-all border" :narrow="this.narrow" :overlaid="this.overlaid" :visible="true">
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
        <!-- border-top h-12 hover:bg-gray-700/25 cursor-pointer -->
        <CSidebarFooter class="border-top h-12 hover:bg-gray-700/25 cursor-pointer" @click="close()">
            <CIcon customClassName="nav-icon" v-bind:icon="icon.cilChevronLeft" class="!h-6 transition-transform duration-500 ease-out" ref="closeIcon" />
        </CSidebarFooter>
    </CSidebar>
</template>

<script>
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem, CBadge, CNavGroup, CSidebarFooter, CSidebarToggler } from "@coreui/vue";
import CIcon from "@coreui/icons-vue";
import * as icon from "@coreui/icons";

export default {
    components: {
        CSidebar,
        CSidebarHeader,
        CSidebarBrand,
        CSidebarNav,
        CNavTitle,
        CNavItem,
        CBadge,
        CNavGroup,
        CSidebarFooter,
        CSidebarToggler,
        CIcon,
    },
    data() {
        return {
            icon,

            mobile: false,
            overlaid: true,
            visible: true,
            narrow: false,
        };
    },
    created() {
        if (window.innerWidth <= 1000) {
            this.setMobile();
        } else {
            this.setDesktop();
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth <= 1000) {
                if (!this.mobile) {
                    this.setMobile();
                }
            } else {
                if (this.mobile) {
                    this.setDesktop();
                }
            }
        });

        console.log(this.overlaid);
    },
    methods: {
        setMobile() {
            if (this.narrow) {
                this.$refs.closeIcon.$el.classList.toggle("rotate-180");
            }
            this.mobile = true;
            this.overlaid = true;
        },
        setDesktop() {
            this.mobile = false;
            this.overlaid = false;
        },
        close() {
            if (this.mobile) {
                this.overlaid = false;
                this.visible = false;
            } else {
                this.narrow = !this.narrow;
                this.$refs.closeIcon.$el.classList.toggle("rotate-180");
            }
        },
        show() {
            this.overlaid = true;
            this.visible = true;
        },
        goTo(path) {
            this.$router.replace({ path: path });
            if (this.mobile) {
                this.close();
            }
        },
    },
};
</script>
