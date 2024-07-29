<script setup lang="ts">
import { computed, ref } from 'vue';
import { Mds } from 'mds.persian.datetime'
import PersianDateTime = Mds.PersianDateTime;
import { DateTime } from './models';

const today = ref(PersianDateTime.now)
const selected = defineModel<DateTime>({ required: true })

const days = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
];

const dates = computed(() => {

    const tmp = selected.value.toPersianDate()
    var output = [];
    for (let i = 0; i < tmp.getDateOfFirstDayOfMonth.dayOfWeek; i++)
        output.push(0)
    for (let i = 0; i < tmp.getMonthDays; i++)
        output.push(i + 1)
    return output
})

function selectDay(d: number) {
    selected.value.day = d
}

</script>

<template>
    <div class="dates">
        <div class="grid">
            <div class="day" v-for="day in days">
                {{ day }}
            </div>
            <div v-for="d in dates">
                <button @click="selectDay(d)" class="date"
                    :class="{ 'today': today.day == d && today.month == selected.month && today.year == selected.year, 'selected': selected.day == d }"
                    v-if="d != 0">{{ d }}</button>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.dates {
    border-radius: 0 0 0.5rem 0.5rem;
    background-color: var(--surface-container-highest-color);
    color: var(--on-surface-container-color);

    .grid {
        display: grid;
        align-content: center;
        justify-items: center;
        grid-template-columns: repeat(7, 1fr);
        column-gap: 0.25rem;
        row-gap: 0.5rem;
        font-weight: 600;
        padding: 0.5rem;


        .day {
            font-size: 0.7rem;
        }

        .date {
            border-radius: 50%;
            cursor: pointer;
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            font-size: 0.8rem;
            justify-content: center;
            align-items: center;
            background-color: var(--surface-container-color);
            color: var(--on-surface-container-color);

            &.today {
                background-color: var(--tertiary-container-color);
                color: var(--on-tertiary-container-color);
            }

            &.selected {
                border: 2px solid var(--tertiary-color);
            }
        }
    }
}
</style>