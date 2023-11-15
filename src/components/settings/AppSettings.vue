<script setup>
import { NotifLevel } from '@/models/notifications/NotifLevel';
import Notification from '@/models/notifications/Notification';
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
  notificationsStore.add( new Notification("To be Done", NotifLevel.WARNING));
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
