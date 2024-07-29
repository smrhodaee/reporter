<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { InputType } from './input-models.ts'

const mirror = ref<HTMLTextAreaElement>()
const textarea = ref<HTMLTextAreaElement>()

const value = defineModel<string>({ required: true })
const props = defineProps<{
    label: string
    type: InputType
}>()

const computedType = computed(() => {
    switch (props.type) {
        case InputType.FILE:
            return "file"
        case InputType.NUMBER:
            if (Number.isNaN(parseInt(value.value)))
                value.value = '0'
            return "number"
        case InputType.TEXT:
            return "text"
    }
})

onMounted(() => {
    if (textarea.value) {
        const textareaStyles = window.getComputedStyle(textarea.value);
        [
            'border',
            'width',
            'height',
            'boxSizing',
            'fontFamily',
            'fontSize',
            'fontWeight',
            'letterSpacing',
            'lineHeight',
            'padding',
            'textDecoration',
            'textIndent',
            'textTransform',
            'whiteSpace',
            'wordSpacing',
            'wordWrap',
        ].forEach((property: string) => {
            mirror.value?.style.setProperty(property, textareaStyles.getPropertyValue(property))
        });
    }
    textarea.value?.addEventListener('input', () => {
        if (textarea.value && mirror.value) {
            mirror.value.textContent = textarea.value.value;
            const newHeight = mirror.value.scrollHeight;
            textarea.value.style.height = `${newHeight}px`;
        }
    })
})
</script>

<template>
    <div class="text-input">
        <textarea rows="1" class="mirror" v-show="type == InputType.MULTILINE" ref="mirror"></textarea>
        <textarea rows="1" class="textarea" ref="textarea" v-show="type == InputType.MULTILINE" :placeholder="label"
            v-model="value"></textarea>
        <input v-if="type != InputType.MULTILINE" :type="computedType" :placeholder="label" v-model="value">
        <label>{{ label }}</label>
    </div>
</template>

<style scoped lang="scss">
.text-input {
    position: relative;
    min-height: fit-content;
    font-size: 0.9rem;
    border-radius: var(--border-radios-default);
    color: var(--on-surface-color);
    background: var(--surface-container-color);
    border-bottom: 0.125rem solid var(--secondary-color);
    overflow: hidden;


    .mirror {
        visibility: hidden;
        position: fixed;
        top: -1000rem;
        left: -1000rem;
    }

    label {
        position: absolute;
        top: 0.6rem;
        right: 0.9rem;
        color: var(--secondary-color);
        transform-origin: right center;
        pointer-events: none;
        transition: transform 250ms;
    }

    .textarea {
        resize: none;
        height: 2rem;
        max-height: 40vh;
    }

    input {
        padding-bottom: 0.2rem;
    }


    input,
    .textarea {
        width: 100%;
        margin-top: 1.3rem;
        padding-right: 1rem;
        padding-left: 1rem;
        background-color: transparent;

        &::placeholder {
            color: transparent;
        }

        &:focus,
        &:not(:placeholder-shown) {
            +label {
                transform: translateY(-0.6rem) scale(0.8);
            }
        }
    }
}
</style>