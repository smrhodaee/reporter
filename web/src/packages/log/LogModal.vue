<script setup lang="ts">
import Modal from '@/components/ui/modal/Modal.vue';
import TextInput from '@/components/ui/input/TextInput.vue';
import SelectInput from '@/components/ui/input/SelectInput.vue';
import { ref } from 'vue';
import { Property } from '@/services/models';
import { logStore } from './log-store';
import { Mode } from './models';
import { InputType } from '@/components/ui/input/input-models';
import DateTimePicker from '@/components/ui/datetimepicker/DateTimePicker.vue'

const loading = ref(false)
const types = ref([
    {
        value: "text",
        title: "متن"
    },
    {
        value: "integer",
        title: "عدد"
    },
    {
        value: "image",
        title: "تصویر"
    },
    {
        value: "audio",
        title: "صدا"
    },
    {
        value: "video",
        title: "فیلم"
    },
    {
        value: "datetime",
        title: "تاریخ"
    },
    {
        value: "link",
        title: "پیوند"
    }
])


const addProperty = () => {
    logStore.log.props.push(new Property("", "", "text"))
}

const removeProperty = (i: number) => {
    logStore.log.props.splice(i, 1)
}

const deleteLog = async () => {
    loading.value = true
    await logStore.deleteSubmit()
    loading.value = false
}

const addOrEditLog = async () => {
    loading.value = true
    await logStore.addOrEditSubmit()
    loading.value = false
}

const getPropInputType = (value: string) => {
    switch (value) {
        case "integer":
            return InputType.NUMBER
        case "media":
            return InputType.FILE
        case "html":
            return InputType.MULTILINE
        default:
            return InputType.TEXT
    }
}

</script>

<template>
    <Modal :model-value="logStore.modalMode != Mode.CLOSED"
        @update:model-value="(v) => { if (v == false) logStore.modalMode = Mode.CLOSED }">
        <template #header>
            <span v-if="logStore.modalMode == Mode.EDIT">ویرایش گزارش</span>
            <span v-else-if="logStore.modalMode == Mode.ADD">افزودن گزارش</span>
            <span v-else-if="logStore.modalMode == Mode.DELETE">حذف گزارش</span>
        </template>
        <template #body>
            <form v-if="logStore.modalMode != Mode.DELETE" @submit.prevent="">
                <TextInput :type="InputType.TEXT" class="mb-05" label="عنوان" v-model="logStore.log.title" />
                <TextInput :type="InputType.TEXT" class="mb-05" label="دسته بندی" v-model="logStore.log.category" />
                <div class="props">
                    <div v-for="(_, i) in logStore.log.props" class="prop">
                        <div class="top">
                            <h4 class="title">ویژگی {{ i + 1 }} :</h4>
                            <div class="btn btn-error" @click="removeProperty(i)">حذف</div>
                        </div>
                        <div class="bottom">
                            <TextInput :type="InputType.TEXT" class="mb-05" label="عنوان ویژگی"
                                v-model="logStore.log.props[i].title" />
                            <SelectInput class="mb-05" label="نوع" :options="types" v-model="logStore.log.props[i].type" />
                            <DateTimePicker class="mb-05" v-if="logStore.log.props[i].type == 'datetime'" v-model="logStore.log.props[i].value" />
                            <TextInput v-else class="mb-05" :type="getPropInputType(logStore.log.props[i].type)"
                                label="مقدار ویژگی" v-model="logStore.log.props[i].value" />
                        </div>
                    </div>
                </div>
            </form>
            <div class="delete" v-else>
                <span>آیا از حذف کردن <h4>{{ logStore.log.title }}</h4> مطمئن هستید؟</span>
            </div>
        </template>
        <template #footer>
            <button v-if="logStore.modalMode != Mode.DELETE" class="w-100 btn-lg btn-tertiary me-1"
                @click="addProperty">افزودن ویژگی</button>
            <div class="ctrl" v-if="logStore.modalMode == Mode.EDIT">
                <button v-if="!loading" class="btn-lg btn-primary" @click="addOrEditLog">ویرایش
                    گزارش</button>
                <div class="spiner" v-else></div>
            </div>
            <div class="ctrl" v-else-if="logStore.modalMode == Mode.ADD">
                <button v-if="!loading" class="btn-lg btn-primary" @click="addOrEditLog">افزودن
                    گزارش</button>
                <div class="spiner" v-else></div>
            </div>
            <div class="ctrl" v-else-if="logStore.modalMode == Mode.DELETE">
                <button v-if="!loading" class="btn-lg btn-error" @click="deleteLog">حذف گزارش</button>
                <div class="spiner error" v-else></div>
            </div>
        </template>
    </Modal>
</template>

<style scoped lang="scss">
.delete {
    word-wrap: break-word;
    text-align: center;

    h4 {
        display: inline;
    }
}

.ctrl {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        width: 100%;
    }
}

form {
    width: 22rem;
    max-height: 22rem;

    @media screen and (max-width: 420px) {
        width: 300px;
    }

    .props {
        .prop {
            .top {
                display: flex;
                margin: 0.5rem 0.25rem;
                align-items: center;
                justify-content: space-between;
            }

            .bottom {
                display: flex;
                flex-direction: column;
            }
        }
    }
}
</style>./log-store