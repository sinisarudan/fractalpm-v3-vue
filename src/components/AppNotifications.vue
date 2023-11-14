<script setup lang="ts">
import { useNotificationsStore } from '@/stores/notifications'
import { onMounted } from 'vue'
const notifications = useNotificationsStore()

onMounted(() => {
  // notifications.add({title: "NotifTitleWARNING", level: ENotifLevel.WARNING});
  // notifications.add({title: "NotifTitleSUCCESS", level: ENotifLevel.SUCCESS});
  // notifications.expanded = false;
})

// defineProps<{
//   msg: string
// }>()

const alertClosed = (alertId: number | undefined) => {
  // console.log('Alert closed.', alertId)
  notifications.remove(alertId)
}
</script>

<template>
  <div hidden>
    <div>-- DEBUG --</div>
    <div>notifications-count:{{ notifications.count }}</div>
    <div>notifications-visible:{{ notifications.visible }}</div>
    <div>notifications-expanded:{{ notifications.expanded }}</div>
    <div>-- DEBUG-END --</div>
  </div>
  <!-- <v-alert
    type="warning"
    closable
    text="title-test-alert"
    data-test="alert"
  ></v-alert> -->
  <div>
    <v-alert
      class="alert"
      v-for="notification in notifications.notifications"
      v-bind:key="notification.id"
      :type="notification.level"
      closable
      :text="notification.title"
      @click:close="alertClosed(notification.id)"
      data-test="alert"
    ></v-alert>
  </div>
</template>

<style scoped>
.alert {
  margin: 2px;
}
</style>
