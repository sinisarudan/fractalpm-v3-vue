<script setup>
import { ref } from 'vue';
// import Notification from '@/models/notifications/Notification';
// import { useNotificationsStore } from '@/stores/notifications';
// import { NotifLevel } from '@/models/notifications/NotifLevel';

// const notificationsStore = useNotificationsStore();
// const router = useRouter();

const props = defineProps(['message']);

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

</script>

<template>
    <v-card class="success-dialog">
        <img src="/assets/success.jpg" alt="Your Password has been set successfully" />
        <div v-if="props.message" class = "status">
          <!-- <v-icon>mdi-checkbox-marked-circle</v-icon> -->
          {{ props.message }}
        </div>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="primary-button" block variant="flat" @click="close">Continue</v-btn>
        </v-card-actions>
    </v-card>
    <v-btn size="xs" color="transparent" variant="flat" icon @click="close" class="close-button">
      <v-icon color="white">mdi-close</v-icon>
    </v-btn>
</template>

<style lang="scss" scoped>
.success-dialog {
    padding: 35px;
    text-align: center;
    .status {
      color: #0D0D0D;
      font-size: 18px;
      font-weight: 800;
    }
  }
</style>
