<script setup lang="ts">
import { logStore } from '@/packages/log/log-store';
const isSidebarOpen = defineModel<boolean>()

function toggle() {
    const tmp = !isSidebarOpen.value
    isSidebarOpen.value = tmp;
    localStorage.setItem('sidebar', tmp ? '1' : '0')
}
</script>

<template>
    <div class="sidebar" :class="{ 'active': isSidebarOpen }">
        <div class="toggle" @click="toggle">
            <font-awesome-icon class="icon" :icon="['fas', 'angles-left']" />
        </div>
        <div v-if="isSidebarOpen" class="wrapper" @click="toggle"></div>
        <nav>
            <button class="w-100 btn-lg btn-primary mb-1" @click="logStore.add">افزودن گزارش</button>
            <span>تعداد گزارشات : {{ logStore.total }}</span>
        </nav>
    </div>
</template>

<style scoped lang="scss">
.sidebar {
    position: fixed;
    width: 300px;
    transition: right 0.3s ease-out;
    top: 0;
    right: -300px;
    z-index: 120;

    &.active {
        right: 0;

        .toggle .icon {
            transform: rotate(-180deg);
        }
    }

    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.164);
        z-index: 100;
        display: none;


        @media screen and (max-width: 800px) {
            display: block;
        }
    }

    .toggle {
        border-radius: 0.5rem;
        cursor: pointer;
        position: absolute;
        left: 0;
        width: 3rem;
        height: 3rem;
        display: flex;
        font-size: 0.9rem;
        align-items: center;
        justify-content: center;
        margin-left: -1.5rem;
        z-index: 101;
        top: 0;
        background-color: var(--surface-container-highest-color);


        .icon {
            margin-left: -1rem;
            transition: transform 0.3s ease;
        }

        &:hover {
            box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 12px;
        }
    }

    nav {
        display: flex;
        z-index: 250;
        position: absolute;
        top: 0;
        width: 100%;
        right: 0;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        margin-left: 1rem;
        padding: 0.5rem;
        background-color: var(--surface-container-highest-color);
        color: var(--on-surface-container-color);

        .brand {
            margin-bottom: 1rem;
            width: 50%;
        }
    }
}
</style>@/packages/log/modals@/packages/log/log-store