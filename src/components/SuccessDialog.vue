<script setup>
// import { ref } from 'vue';
// import Notification from '@/models/notifications/Notification';
// import { useNotificationsStore } from '@/stores/notifications';
// import { NotifLevel } from '@/models/notifications/NotifLevel';

// const notificationsStore = useNotificationsStore();
// const router = useRouter();

const props = defineProps({
  message: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

</script>

<template>
  <v-card class="success-dialog on-background-darken-2">
    <img
      class="success-image"
      src="/assets/success.jpg"
      :alt="props.message"
      width="258"
      height="148"
    >
    <div
      v-if="props.message"
      class="status"
    >
      <!-- <v-icon>mdi-checkbox-marked-circle</v-icon> -->
      {{ props.message }}
    </div>
    <v-card-actions>
      <v-spacer />
      <v-btn
        class="primary-button"
        width="400px"
        variant="flat"
        @click="close"
      >
        Continue
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-btn
    size="xs"
    color="transparent"
    variant="flat"
    icon
    class="close-button"
    @click="close"
  >
    <v-icon color="white">
      mdi-close
    </v-icon>
  </v-btn>
</template>

<style lang="scss" scoped>
.success-dialog {
    .success-image {
      margin-bottom: 24px;
    }
    padding: 35px;
    text-align: center;
    align-items: center;
    .status {
      font-family: Manrope;
      font-size: 18px;
      font-weight: 800;
      line-height: 24px;
      letter-spacing: 0.30000001192092896px;
      text-align: center;

    }
  }
</style>
