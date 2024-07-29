<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Timer from "./timer.ts"
import { ToastType } from "./types.ts"
const toast = ref<HTMLDivElement>()
const progress = ref<HTMLDivElement>()
const show = defineModel<boolean>()
let timer: Timer
const props = defineProps<{
    type: ToastType
    title: string
    message: string
    duration: number
}>()

watch(show, v => {
    if (v) open()
})

onMounted(() => {
    timer = new Timer(props.duration, (ms) => {
        if (ms == 0) {
            toast.value?.classList.remove("active");
            setTimeout(() => {
                if (progress.value) progress.value.style.right = '0'
                show.value = false
            }, 500);
        } else {
            if (progress.value) progress.value.style.right = `${100 - ((ms / props.duration) * 100)}%`
        }
    })
    toast.value?.addEventListener('mouseenter', () => timer.pause())
    toast.value?.addEventListener('mouseleave', () => timer.resume())
    if (show.value) open()
})

const open = () => {
    toast.value?.classList.add("active");
    timer.start()
}

const close = () => {
    timer.stop()
}

</script>
<template>
    <div ref="toast" class="toast" :class="{ 'error': type == ToastType.ERROR }">
        <div class="content">
            <font-awesome-icon class="icon" v-if="type == ToastType.ERROR" :icon="['fas', 'circle-exclamation']" />
            <font-awesome-icon class="icon" v-if="type == ToastType.SUCCESS" :icon="['fas', 'circle-check']" />
            <div class="body">
                <span class="title">{{ title }}</span>
                <span class="caption">{{ message }}</span>
            </div>
        </div>
        <font-awesome-icon class="close" :icon="['fas', 'xmark']" @click="close" />
        <div ref="progress" class="progress"></div>
    </div>
</template>

<style scoped lang="scss">
.toast {
    position: fixed;
    bottom: 1.25rem;
    left: 2rem;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transform: translateX(calc(-100% - 2rem));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
    z-index: 500;

    &.active {
        transform: translateX(0%);

        ~button {
            pointer-events: none;
        }
    }

    &.error {
        background-color: var(--error-container-color);
        color: var(--on-error-container-color);

        .progress {
            background-color: var(--error-color);
        }

        .content .icon {
            color: var(--error-color);
        }
    }

    .progress {
        width: 100%;
        height: 3px;
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .content {
        display: flex;
        align-items: center;
        margin: 0 1.5rem;

        .body {
            display: flex;
            flex-direction: column;

            span {
                font-size: 1rem;
                font-weight: 400;

                &.title {
                    font-weight: 600;
                    text-align: left;
                }
            }
        }

        .icon {
            font-size: 1.5rem;
            margin-left: 0.5rem;
        }
    }

    .close {
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        padding: 0.25rem;
        cursor: pointer;
        opacity: 0.7;

        &:hover {
            opacity: 1;
        }
    }
}
</style>