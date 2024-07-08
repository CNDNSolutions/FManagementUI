<template>
    <div class="mb-3">
        <div class="font-medium text-3xl" v-if="route">{{ route[route.length - 1].name }}</div>
        <div class="mt-2 flex">
            <div class="flex *:font-light *:text-sm" v-for="page in route">
                <router-link v-if="page != route[route.length - 1]" :to="page.uri">{{ page.name }}</router-link>
                <div v-else>{{ page.name }}</div>
                <div class="ml-2 mr-2" v-if="page != route[route.length - 1]">/</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            route: false,
        };
    },
    mounted() {
        let route = this.$router.currentRoute.value.path.replace(/^\/+|\/+$/g, "").split("/");

        this.route = route.map((string, key) => {
            let uri = "";
            for (let i = 0; i <= key; i++) {
                uri = uri + "/" + route[i];
            }
            let name = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            return { uri: uri, name: name };
        });
    },
};
</script>
