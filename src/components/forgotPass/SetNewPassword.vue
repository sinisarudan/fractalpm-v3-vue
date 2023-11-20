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

const emit = defineEmits(['passwordChanged']);

const MaxLength = 100;
const MinLength = 8;

const form = ref();

/**
 * @type {import('vue').Ref<(boolean)>}
 */
const hidePass = ref(true);

const passRulesArray = [
  (v) => (v && v.length >= MinLength && v.length < MaxLength) || `At least ${MinLength} characters long and maximum of ${MaxLength} characters`,
  (v) => (/[A-Z]/.test(v) && /[a-z]/.test(v)) || 'Has at least 1 uppercase and 1 lowercase character',
  (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Has at least 1 special character',
  (v) => /\d/.test(v) || 'Has at least 1 digit'
];

const passRules = ref(passRulesArray);

const passConfirmRules = ref([...passRulesArray,
  (v) => (v && password.value === v) || 'Passwords don\'t match'
]);

/**
 * @type {import('vue').Ref<boolean>}
 */
const valid = ref(false);

/**
 * @type {import('vue').Ref<string>}
 */
const password = ref('');

/**
 * @type {import('vue').Ref<string>}
 */
const passwordConfirm = ref('');

/**
 * @type {import('vue').Ref<string>}
 */
const error = ref();

/**
 * @type {import('vue').Ref<string>}
 */
const status = ref();

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

const setNewPassword = async () => {
  if (await validateForm()) {
    console.log('[enterCode] valid');
    const result = await usersStore.setNewPassword(password);
    if (result) {
      error.value = undefined;
      status.value = 'Successful Password Reset';
      emit('passwordChanged');
    } else {
      error.value = 'Unable to reset password';
      status.value = undefined;
    }
  }
};

</script>

<template>
    <v-card class="set-new-password">
        <v-card-title class="text-h5">Set New Password</v-card-title>
        <v-form class="form" v-model="valid" ref="form">
          <div class="tf-label">Password</div>
          <v-text-field
            class="t-field"
                v-model="password"
                label="Enter your password"
                :rules="passRules"
                :type="hidePass ? 'password' : 'text'"
                :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="hidePass = !hidePass"
                required
            >
            </v-text-field>
            <div class="tf-label">Confirm Password</div>
            <v-text-field
            class="t-field"
                v-model="passwordConfirm"
                label="Enter your password"
                :rules="passConfirmRules"
                :type="hidePass ? 'password' : 'text'"
                :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="hidePass = !hidePass"
                required
            >
            </v-text-field>
        </v-form>
        <div v-if="status" class = "status"><v-icon color="green">mdi-checkbox-marked-circle</v-icon>{{ status }}</div>
        <div v-if="error" class = "error"><v-icon color="red">mdi-alert-circle</v-icon>{{ error }}</div>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="primary-button" block variant="flat" @click="setNewPassword">Continue</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>
.set-new-password {
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
