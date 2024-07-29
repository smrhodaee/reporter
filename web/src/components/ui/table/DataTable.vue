<script setup lang="ts">
import Pagination from '@/components/ui/pagination/Pagination.vue';
defineProps<{
    items: any[],
    total: number,
    perPage: number,
    loading: boolean
}>()
const page = defineModel()
</script>

<template>
    <div class="data-table">
        <div class="body">
            <slot v-for="item in items" name="body" v-bind:item="item" />
        </div>
        <div class="middle">
            <div v-if="loading" class="spiner spiner-lg"></div>
        </div>
        <div class="bottom">
            <Pagination v-model="page" :per-page="perPage" :total="total" />
        </div>
    </div>
</template>


<style scoped lang="scss">
.data-table {
    display: flex;
    flex-direction: column;

    .body {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        overflow-y: auto;
    }
    .middle {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
    }

    .bottom {
        display: flex;
        margin: 0.5rem 0;
        align-self: flex-end;
        align-items: center;
    }
}
</style>