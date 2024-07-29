import { reactive } from "vue";

export const errorStore = reactive({
    message: "",
    show: false,
    submit(value: string) {
        this.message = value
        this.show = true
    }
})