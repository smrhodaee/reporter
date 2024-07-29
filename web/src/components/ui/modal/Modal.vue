<script setup lang="ts">
import { ref } from 'vue';

const isOpened = defineModel<boolean>({ default: false })
const inner = ref<HTMLElement>()
const wrapper = ref<HTMLElement>()

const outsideClick = (e: Event) => {
    if (inner.value) {
        if ((e.target as HTMLElement).contains(inner.value)) {
            inner.value?.classList.add('bigger')
            setTimeout(() => {
                inner.value?.classList.remove('bigger')
            }, 300)
        }
    }
}
</script>

<template>
    <div class="modal" v-if="isOpened" @click="outsideClick">
        <div ref="wrapper" class="wrapper">
            <div ref="inner" class="inner">
                <div class="header">
                    <slot name="header" />
                    <font-awesome-icon class="icon" :icon="['fas', 'xmark']" @click="isOpened = false" />
                </div>
                <div class="body">
                    <slot name="body" />
                </div>
                <div class="footer">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@keyframes fade {
    0% {
        top: calc(50% - 3rem);
    }

    100% {
        top: calc(50%)
    }
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 300;

    background-color: rgba(0, 0, 0, 0.164);

    .wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: fade 0.2s linear normal;
        animation-timing-function: ease-out;

        .inner {
            background-color: var(--surface-color);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease-out;

            &.bigger {
                transform: scale(1.1);
            }



            .header {
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid gray;

                .icon {
                    margin-right: 1rem;
                    cursor: pointer;
                }
            }

            .body {
                padding: 1rem;
                max-height: 80vh;
                overflow-y: auto;
            }

            .footer {
                display: flex;
                align-items: center;
                padding: 1rem;
                border-top: 1px solid gray;
            }
        }
    }

}
</style>