<script setup lang="ts">
import { ENotifLevel, useNotificationsStore } from '@/stores/notifications';
// import { onMounted } from 'vue'
// import { computed } from 'vue'

const notificationsStore = useNotificationsStore();

// onMounted(() => {
// })

// defineProps<{
//   msg: string
// }>()
const tbdClicked = () => {
  notificationsStore.add({ title: "To be Done", level: ENotifLevel.INFO });
}
</script>

<template>
  Settings <v-btn @click="tbdClicked" size="x-small">TBD</v-btn>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
</style>
