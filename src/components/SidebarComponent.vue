<script setup>
import {
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
} from "@coreui/vue";
import CIcon from "@coreui/icons-vue";
import * as icon from "@coreui/icons";
</script>

<template>
    <CSidebar
        color-scheme="white"
        class="!min-h-full nunito-all border-r"
        :narrow="narrow">
        <CSidebarNav>
            <CSidebarHeader>
                <CSidebarBrand class="font-bold">CNDN</CSidebarBrand>
            </CSidebarHeader>
            <CNavTitle>Nav Title</CNavTitle>
            <CNavItem href="#">
                <CIcon customClassName="nav-icon" :icon="icon.cilSpeedometer" />
                Nav item
            </CNavItem>
            <CNavItem href="#">
                <CIcon customClassName="nav-icon" :icon="icon.cilSpeedometer" />
                With badge
                <CBadge class="ms-auto" color="primary">NEW</CBadge>
            </CNavItem>
            <CNavGroup>
                <template #togglerContent>
                    <CIcon customClassName="nav-icon" :icon="icon.cilPuzzle" />
                    Nav dropdown
                </template>
                <CNavItem href="#">
                    <span class="nav-icon"
                        ><span class="nav-icon-bullet"></span
                    ></span>
                    Nav dropdown item
                </CNavItem>
                <CNavItem href="#">
                    <span class="nav-icon"
                        ><span class="nav-icon-bullet"></span
                    ></span>
                    Nav dropdown item
                </CNavItem>
            </CNavGroup>
            <CNavGroup>
                <template #togglerContent>
                    <CIcon customClassName="nav-icon" :icon="icon.cilPuzzle" />
                    Nav dropdown2
                </template>
                <CNavItem href="#">
                    <span class="nav-icon"
                        ><span class="nav-icon-bullet"></span
                    ></span>
                    Nav dropdown item
                </CNavItem>
                <CNavItem href="#">
                    <span class="nav-icon"
                        ><span class="nav-icon-bullet"></span
                    ></span>
                    Nav dropdown item
                </CNavItem>
            </CNavGroup>
            <CNavItem href="https://coreui.io">
                <CIcon
                    customClassName="nav-icon"
                    :icon="icon.cilCloudDownload" />
                Download CoreUI
            </CNavItem>
            <CNavItem href="https://coreui.io/pro/">
                <CIcon customClassName="nav-icon" :icon="icon.cilLayers" />
                Try CoreUI PRO
            </CNavItem>
        </CSidebarNav>
        <CSidebarFooter
            class="border-top hover:bg-gray-300"
            @click="narrow = !narrow">
            <CSidebarToggler />
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
};
</script>
