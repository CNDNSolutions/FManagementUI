<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
import { CContainer } from "@coreui/vue";
import axios from "axios";
import moment from "moment";
</script>

<template>
    <div class="flex min-h-screen overflow-hidden" v-if="loaded" :key="reload">
        <SidebarComponent />
        <div class="max-h-screen overflow-auto w-full bg-background">
            <div class="w-full flex justify-center mt-14 mb-16 *:max-w-[1400px]">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loaded: false,
            reload: false,
        };
    },
    mounted() {
        this.loadData(false);
    },
    methods: {
        loadData(reload) {
            let data = {};
            axios
                .get("http://localhost:8000/api/Entries/")
                .then((response) => {
                    data.month = response.data;
                    axios
                        .get("http://localhost:8000/api/Entries?periodStart=" + moment().local().startOf("year").format("YYYY-MM-DD HH:mm:ss"))
                        .then((response) => {
                            data.year = response.data;
                            axios
                                .get("http://localhost:8000/api/Entries?periodStart=" + moment().local("YYYY-MM-DD HH:mm:ss").subtract(1, "month").startOf("month").format("YYYY-MM-DD HH:mm:ss"))
                                .then((response) => {
                                    data.lastMonth = response.data;
                                    data.expires = moment().local().add(2, "minute").unix();
                                    localStorage.setItem("data", JSON.stringify(data));
                                    this.loaded = true;
                                    if (reload) {
                                        this.reload = !this.reload;
                                    }
                                })
                                .catch((response) => {
                                    console.log(response);
                                });
                        })
                        .catch((response) => {
                            console.log(response);
                        });
                })
                .catch((response) => {
                    console.log(response);
                });
        },
    },
    watch: {
        $route(to, from) {
            if (!localStorage.getItem("data") || JSON.parse(localStorage.getItem("data")).expires < moment().local().unix()) {
                this.loadData(true);
            } else {
                this.loaded = true;
            }
        },
    },
};
</script>
