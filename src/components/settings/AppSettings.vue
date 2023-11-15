<script setup lang="ts">
import { ENotifLevel } from '@/models/notifications/notifications-vos';
import { useNotificationsStore } from '@/stores/notifications';
import { useSettingsStore } from '@/stores/settings'
// import { onMounted } from 'vue'
// import { computed } from 'vue'

const notificationsStore = useNotificationsStore();
const settingsStore = useSettingsStore();

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
  Settings {{ settingsStore.lang }} <v-btn @click="tbdClicked" size="x-small">TBD</v-btn>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
</style>
