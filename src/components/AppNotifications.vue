<script setup>
import { useNotificationsStore } from '@/stores/notifications';
import { onMounted } from 'vue';

const notifications = useNotificationsStore();

onMounted(() => {
  // notifications.add({title: "NotifTitleWARNING", level: NotifLevel.WARNING});
  // notifications.add({title: "NotifTitleSUCCESS", level: NotifLevel.SUCCESS});
  // notifications.expanded = false;
});

// defineProps<{
//   msg: string
// }>()

/**
 *
 * @param {(number | undefined)} alertId
 */
const alertClosed = (alertId) => {
  // console.log('Alert closed.', alertId)
  notifications.remove(alertId);
};
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
      v-for="notification in notifications.notifications"
      :key="notification.id"
      class="alert"
      :type="notification.level"
      closable
      :text="notification.title"
      data-test="alert"
      @click:close="alertClosed(notification.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
.alert {
  margin: 2px;
}
</style>
