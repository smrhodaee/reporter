<script setup lang="ts">
import { ref, watch } from 'vue';
import Dates from './Dates.vue';
import Month from './Month.vue';
import Year from './Year.vue';
import { DateTime } from './models.ts'

const value = defineModel<string>({ required: true })
const selected = ref(DateTime.parse(value.value))

watch(selected, v => {
    value.value = v.toString()
}, {
    deep: true
})
</script>

<template>
    <div>
        <div class="top">
            <Year v-model="selected.year" />
            <Month v-model="selected.month" />
            <Dates v-model="selected" />
        </div>
    </div>
</template>


<style scoped lang="scss">
.top {
    display: flex;
    flex-direction: column;
}
</style>