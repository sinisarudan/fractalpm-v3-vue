<script setup>
import { ref, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';
// import Person from '@/models/users/Person';
// import { useRouter } from 'vue-router';
// import Notification from '@/models/notifications/Notification';
// import { useNotificationsStore } from '@/stores/notifications';
// import { NotifLevel } from '@/models/notifications/NotifLevel';

const usersStore = useUsersStore();
// const notificationsStore = useNotificationsStore();
// const router = useRouter();

const emit = defineEmits(['continue']);

const MaxLength = 100;

const form = ref();

const emailPhoneRules = ref([
  (v) => (v && v.length > 0) || 'E-mail or Phone is required',
  (v) => (v && v.length <= MaxLength) || `Maximum ${MaxLength} characters`,
  (v) =>
    !v ||
    /^(?:\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+|\s*(?:\+?\d|\d)(?:\s*-*\s*\d){6,30}\s*)$/.test(v) ||
    'E-mail or Phone must be valid'
]);

/**
 * @type {import('vue').Ref<boolean>}
 */
const valid = ref(false);

/**
 * @type {import('vue').Ref<string>}
 */
const error = ref();

onMounted(() => {
//   watch(forgotRecoveryEmailPhone, validateForm);
});

/**
 * @type {Promise<boolean>}
 */
const validateForm = async () => {
  const validationObject = await form.value.validate();
  // console.log('validationObject', JSON.stringify(validationObject.errors));
  return validationObject.valid;
};

/**
 * @type {import('vue').Ref<string>}
 */
const forgotRecoveryEmailPhone = ref('');

const enterCode = async () => {
  if (await validateForm()) {
    console.log('[enterCode] valid');
    const result = await usersStore.sendOTPCode(forgotRecoveryEmailPhone.value);
    if (result) {
      error.value = undefined;
      emit('continue', forgotRecoveryEmailPhone.value);
    } else {
      error.value = 'Unable to send code';
    }
  }
};

</script>

<template>
    <v-card class="forgot-password">
        <v-card-title class="text-h5">Trouble logging in?</v-card-title>
        <v-form class="form" v-model="valid" ref="form">
        <div class="tf-label">Email or phone number</div>
        <v-text-field
        class="t-field"
            v-model="forgotRecoveryEmailPhone"
            :counter="MaxLength"
            :rules="emailPhoneRules"
            placeholder="johndoe@gmail.com"
            required
        >
        </v-text-field>
        </v-form>
        <div v-if="error" class = "error"><v-icon color="red">mdi-alert-circle</v-icon>{{ error }}</div>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#8155FF" block variant="flat" @click="enterCode">Continue</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>
.forgot-password {
    padding: 35px;
    .error {
      color: red;
      font-size: 12px;
    }
  .form {
    margin-top: 24px;
    // max-height: 350px;
    // overflow-y: scroll;
    .tf-label{
      text-align: left;
    }
    .t-field{
      margin-bottom: 12px;
    }
  }
}
// .actions {
//   padding: 5px;
//   margin: auto;
// }
</style>
