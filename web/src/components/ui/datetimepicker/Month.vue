<script setup lang="ts">
import { computed } from 'vue';
const month = defineModel<number>({ required: true })
const modifyMonth = (v: number) => {
    if(month.value + v > 12) return
    if(month.value + v < 1) return
    month.value = month.value + v
}

const monthName = computed(() => {
    switch (month.value-1) {
        case 0:
            return "فروردین"
        case 1:
            return "اردیبهشت"
        case 2:
            return "خرداد"
        case 3:
            return "تیر"
        case 4:
            return "مرداد"
        case 5:
            return "شهریور"
        case 6:
            return "مهر"
        case 7:
            return "آبان"
        case 8:
            return "آذر"
        case 9:
            return "دی"
        case 10:
            return "بهمن"
        case 11:
            return "اسفند"
    }
}) 
</script>

<template>
    <div class="month">
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-right']" @click="modifyMonth(1)" />
        <span class="name">{{ monthName }}</span>
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-left']" @click="modifyMonth(-1)" />
    </div>
</template>


<style scoped lang="scss">
.month {
    display: flex;
    user-select: none;
    justify-content: center;
    align-items: center;
    background-color: var(--tertiary-color);
    color: var(--on-tertiary-color);
    opacity: 0.85;

    .icon {
        font-size: 0.8rem;
        padding: 0.5rem;
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }
    }

    .name {
        width: 18%;
        text-align: center;
    }
}
</style>