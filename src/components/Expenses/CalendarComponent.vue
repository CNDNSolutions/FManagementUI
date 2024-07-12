<template>
    <div>
        <VDatePicker v-model.range="this.date" :is-dark="true" @update:modelValue="this.$emit('dateUpdated')">
            <template #default="{ togglePopover }">
                <div class="flex justify-center items-center px-3 text-lg rounded max-h-9 h-9 min-h-9 hover:bg-primary/80 cursor-pointer active:bg-primary/70 bg-primary/90" @click="togglePopover()">
                    {{ moment(this.date.start).format("YYYY MMMM DD") }} - {{ moment(this.date.end).format("YYYY MMMM DD") }}
                </div>
            </template>
        </VDatePicker>
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: {
        defaultData: Object,
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
            let startDate = moment(this.defaultData[0].date);
            let endDate = moment(this.defaultData[this.defaultData.length - 1].date);

            this.date = {
                start: new Date(startDate.format("YYYY"), startDate.format("D") - 1, startDate.format("M")),
                end: new Date(endDate.format("YYYY"), endDate.format("M") - 1, endDate.format("D")),
            };
        },

        getDate() {
            return this.date;
        },
    },
};
</script>
