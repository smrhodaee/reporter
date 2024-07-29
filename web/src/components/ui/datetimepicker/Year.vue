<script setup lang="ts">
const year = defineModel<number>({ required: true })
const modifyYear = (v: number) => year.value += v
</script>

<template>
    <div class="year">
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-right']" @click="modifyYear(1)" />
        <div class="value">{{ year }}</div>
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-left']" @click="modifyYear(-1)" />
    </div>
</template>


<style scoped lang="scss">
.year {
    display: flex;
    user-select: none;
    justify-content: center;
    border-radius: 0.5rem 0.5rem 0 0;
    align-items: center;
    background-color: var(--tertiary-color);
    color: var(--on-tertiary-color);

    .icon {
        font-size: 0.8rem;
        padding: 0.5rem;
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }
    }

    .value {
        width: 10%;
        text-align: center;
    }
}
</style>