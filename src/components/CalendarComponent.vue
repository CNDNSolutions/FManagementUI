<template>
    <div>
        <VDatePicker v-model.range="this.date" :is-dark="true" @popover-will-hide="this.$emit('dateUpdated')">
            <template #default="{ togglePopover }">
                <div class="flex justify-center items-center px-3 text-lg rounded max-h-9 h-9 min-h-9 hover:bg-primary/80 cursor-pointer active:bg-primary/70 bg-primary/90" @click="togglePopover()">{{ moment(this.date.start).format("YYYY MMMM DD") }} - {{ moment(this.date.end).format("YYYY MMMM DD") }}</div>
            </template>
        </VDatePicker>
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: {
        defaultDate: Object,
    },
    data() {
        return {
            date: { start: 0, end: 0 },
        };
    },
    mounted() {
        this.setDate();
    },
    methods: {
        moment,

        setDate() {
            this.date = {
                start: new Date(moment(this.defaultDate.start).format("YYYY"), moment(this.defaultDate.start).subtract(1, "month").format("M"), moment(this.defaultDate.start).format("D")),
                end: new Date(moment(this.defaultDate.end).format("YYYY"), moment(this.defaultDate.end).subtract(1, "month").format("M"), moment(this.defaultDate.end).format("D")),
            };
        },

        getDate() {
            return this.date;
        },
    },
};
</script>
