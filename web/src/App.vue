<script setup lang="ts">
import Sidebar from '@/components/partials/Sidebar.vue';
import Toast from '@/components/ui/toast/Toast.vue';
import { ToastType } from '@/components/ui/toast/types.ts';
import Home from '@/views/Home.vue';
import { ref } from 'vue';
import { errorStore } from './store/error';
import LogModal from '@/packages/log/LogModal.vue';
const sidebar = ref(localStorage.getItem('sidebar') != '0')
</script>

<template>
  <div class="app">
    <Sidebar v-model="sidebar" />
    <Home :class="{ 'side-effect': sidebar }" />
    <Toast :duration="3000" :type="ToastType.ERROR" v-model="errorStore.show" :message="errorStore.message"
      title="خطا رخ داده است" />
    <LogModal />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;

  .side-effect {
    margin-right: 300px;

    @media screen and (max-width: 800px) {
      margin-right: 0;
    }
  }
}
</style>
./packages/log/modals