<script setup lang="ts">
import DataTable from '@/components/ui/table/DataTable.vue';
import { onMounted, ref, watch } from 'vue';
import { logStore } from '@/packages/log/log-store.ts'
import { getCategoryIcon } from '@/tools/icons.ts'
import TextInput from '@/components/ui/input/TextInput.vue';
import { InputType } from '@/components/ui/input/input-models';
const searchText = ref("")
const page = ref(0)

onMounted(() => {
    logStore.take = 10;
    logStore.fetchLogs(searchText.value)
})
watch(page, v => {
    logStore.skip = v * logStore.take
    logStore.fetchLogs(searchText.value)
})
function search() {
    page.value = 0
    logStore.fetchLogs(searchText.value)
}
</script>

<template>
    <div class="home">
        <form class="search-box" @submit.prevent="search">
            <TextInput :type="InputType.TEXT" class="txt" label="عنوان یا دسته بندی" v-model="searchText" />
            <button class="btn btn-tertiary">جستجو</button>
        </form>
        <DataTable :loading="logStore.loading" class="table" :items="logStore.logs" :total="logStore.total"
            :per-page="logStore.take" v-model="page">
            <template v-slot:body="{ item }">
                <div class="card mb-1">
                    <h4 class="title">{{ item.title }}</h4>
                    <h5 class="category">
                        <font-awesome-icon class="icon" :icon="getCategoryIcon(item.category)" />
                        <span>{{ item.category }}</span>
                    </h5>
                    <div class="body">
                        <p class="prop" v-for="prop in item.props">
                        <div class="title">{{ prop.title }} </div>
                        <div class="content" v-if="prop.type == 'link'">
                            <a :href="prop.value">{{ prop.value }}</a>
                        </div>
                        <div class="content" v-else-if="prop.type == 'image'">
                            <img :src="prop.value" :alt="prop.title">
                        </div>
                        <div class="content" v-else-if="prop.type == 'audio'">
                            <audio controls>
                                <source :src="prop.value">
                                مرورگر شما پخش کننده صدا را پشتیبانی نمی کند
                            </audio>
                        </div>
                        <div class="content" v-else-if="prop.type == 'video'">
                            <video width="300"controls>
                                <source :src="prop.value">
                                مرورگر شما پخش کننده فیلم را پشتیبانی نمی کند
                            </video>
                        </div>
                        <div class="content" v-else>{{ prop.value }}</div>
                        </p>
                    </div>
                    <div class="bottom">
                        <button class="btn btn-primary" @click="logStore.edit(item)">ویرایش</button>
                        <button class="btn btn-error" @click="logStore.delete(item)">حذف</button>
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
</template>


<style scoped lang="scss">
.home {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 3rem);
    padding: 1rem;
    word-wrap: break-word;

    .table {
        height: 100%;
    }

    .search-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .txt {
            flex-grow: 1;
            margin-left: 1rem;
        }
    }

    .card {
        max-width: 20rem;
        width: fit-content;
        height: fit-content;
        margin: 0.5rem;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        background-color: var(--secondary-container-color);
        color: var(--on-secondary-container-color);
        box-shadow: var(--secondary-fixed-dim-color) -1px 1px 3px;

        >.title {
            border-bottom: 1px solid var(--on-secondary-container-color);
            padding: 0.75rem 1.5rem;
            text-align: center;
        }

        .body {
            flex-grow: 1;

            .prop {
                position: relative;
                font-size: 0.9rem;
                margin: 0.9rem 0.5rem;
                border: 1px solid var(--on-secondary-container-color);
                border-radius: var(--border-radios-default);

                >.title {
                    position: absolute;
                    white-space: nowrap;
                    top: -0.9rem;
                    right: 0.5rem;
                    padding: 0 0.5rem;
                    background-color: var(--secondary-container-color);
                }

                >.content {
                    display: flex;
                    padding: 0.6rem;
                    justify-content: center;
                    align-items: center;

                    img {
                        width: 100%;
                        border-radius: var(--border-radios-default);
                    }
                    audio {
                        width: 100%;
                    }
                }
            }
        }

        .bottom {
            display: flex;
            border-top: 1px solid var(--on-secondary-container-color);
            justify-content: end;
            padding: 0.5rem;

            .btn:first-child {
                margin-left: 0.5rem;
            }
        }

        .category {
            display: flex;
            align-items: center;
            padding: 0.5rem;

            .icon {
                font-size: 1rem;
            }

            span {
                flex-grow: 1;
                padding: 0 0.5rem;
                text-align: center
            }
        }

    }
}
</style>@/packages/log/modals@/packages/log/log-store