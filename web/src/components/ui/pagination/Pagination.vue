<script setup lang="ts">
import { computed } from 'vue';
const page = defineModel({ default: 0 })
const props = defineProps<{
    total: number
    perPage: number
}>()

const maxPages = computed(() => {
    return Math.ceil(props.total / props.perPage)
})

function next() {
    if(page.value != maxPages.value-1) {
        page.value++
    }
}

function prev() {
    if(page.value != 0) {
        page.value--
    }
}

</script>

<template>
    <div class="pagination" v-if="maxPages > 1">
        <div class="obj ctrl" :class="{ 'disable': page == 0 }" title="قبلی" @click="prev">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </div>
        <div class="obj" v-for="i in maxPages" :class="{ 'active': page == i - 1 }" @click="page = i - 1">
            {{ i }}
        </div>
        <div class="obj ctrl" :class="{ 'disable': page == maxPages-1 }" title="بعدی" @click="next">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </div>
    </div>
</template>


<style scoped lang="scss">
.pagination {
    display: flex;
    direction: ltr;

    .obj {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
        border-radius: 0.5rem;
        background-color: var(--secondary-fixed-color);
        color: var(--on-secondary-fixed-color);
        cursor: pointer;

        &.active {
            background-color: var(--primary-color);
            color: var(--on-primary-color);
        }

        &:hover:not(.active) {
            background-color: var(--secondary-fixed-dim-color);
        }
    }

    .ctrl {
        font-size: 0.6rem;

        &.disable {
            cursor: default;
            background-color: var(--surface-container-high-color);
            color: var(--on-surface-container-color);

            &:hover {
                background-color: var(--surface-container-high-color);
            }
        }
    }
}
</style>