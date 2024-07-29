<script setup lang="ts">
import { ref } from 'vue';

interface Option {
    title: string
    value: any
}
const props = defineProps<{
    label: string,
    options: Array<Option>
}>()
const value = defineModel<any>({ required: true })
const selectedIndex = ref(props.options.findIndex((v) => v.value == value.value))
</script>

<template>
    <div class="select-input">
        <span :class="{ 'active': i == selectedIndex }" class="option" v-for="(opt, i) in options"
            @click="selectedIndex = i; value = options[i].value">
            {{ opt.title }}
        </span>
    </div>
</template>

<style scoped lang="scss">
.select-input {
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    background-color: var(--surface-container-color);
    color: var(--on-surface-color);
    border-bottom: 2px solid var(--secondary-color);

    .option {
        cursor: pointer;
        user-select: none;
        width: 100%;
        height: 100%;
        text-align: center;
        border-radius: 0.5rem;
        padding: 0.5rem 0.5rem;

        &.active {
            background-color: var(--secondary-color);
            color: var(--on-secondary-color);
        }

        &:hover:not(.active) {
            background-color: var(--secondary-container-color);
            color: var(--on-secondary-container-color);
        }
    }
}
</style>