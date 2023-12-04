<script setup>
import { ref, onMounted } from 'vue';
// import { useUsersStore } from '@/stores/users';
// import Person from '@/models/users/Person';
// import { useRouter } from 'vue-router';
// import Notification from '@/models/notifications/Notification';
// import { useNotificationsStore } from '@/stores/notifications';
// import { NotifLevel } from '@/models/notifications/NotifLevel';

// const usersStore = useUsersStore();
// const notificationsStore = useNotificationsStore();
// const router = useRouter();
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const emit = defineEmits(['password-changed']);

const PassMaxLength = 100;
const PassMinLength = 8;

const form = ref();

/**
 * @type {import('vue').Ref<(boolean)>}
 */
const hidePass = ref(true);

const passRulesArray = [
  (v) => (v && v.length >= PassMinLength && v.length < PassMaxLength) || i18n.t('errors.minimumMaximum', { min: PassMinLength, max: PassMaxLength }),
  (v) => (/[A-Z]/.test(v) && /[a-z]/.test(v)) || i18n.t('errors.upperLower'),
  (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || i18n.t('errors.specialChar'),
  (v) => /\d/.test(v) || i18n.t('errors.digit')
];

const passRules = ref(passRulesArray);

const passConfirmRules = ref([...passRulesArray,
  (v) => (v && password.value === v) || i18n.t('errors.passwordsMatching')
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
    error.value = undefined;
    // status.value = 'Successful Password Reset';
    emit('password-changed', password.value);
  }
};

</script>

<template>
  <v-card class="set-new-password">
    <v-card-title class="on-background-darken-1">
      {{ $t('login.setNewPassword') }}
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      class="form"
    >
      <div class="tf-label">
        {{ $t('placeholders.password') }}
      </div>
      <v-text-field
        v-model="password"
        class="t-field"
        :label="$t('placeholders.enterPassword')"
        :rules="passRules"
        :type="hidePass ? 'password' : 'text'"
        :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
        required
        @click:append="hidePass = !hidePass"
      />
      <div class="tf-label">
        {{ $t('placeholders.confirmPassword') }}
      </div>
      <v-text-field
        v-model="passwordConfirm"
        class="t-field"
        :label="$t('placeholders.enterPassword')"
        :rules="passConfirmRules"
        :type="hidePass ? 'password' : 'text'"
        :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
        required
        @click:append="hidePass = !hidePass"
      />
    </v-form>
    <div
      v-if="status"
      class="status"
    >
      <v-icon color="green">
        mdi-checkbox-marked-circle
      </v-icon>{{ status }}
    </div>
    <div
      v-if="error"
      class="text-error"
    >
      <v-icon color="red">
        mdi-alert-circle
      </v-icon>{{ error }}
    </div>
    <v-card-actions>
      <v-spacer />
      <v-btn
        class="primary-button"
        block
        variant="flat"
        @click="setNewPassword"
      >
        {{ $t('common.continue') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.set-new-password {
    padding: 35px;
    // min-width: 300px;
    // .error {
    //   color: red;
    //   font-size: 12px;
    // }
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

<style lang="scss">
.v-card-title {
  //styleName: Hero/XS;
  font-family: Manrope;
  font-size: 24px;
  font-weight: 800;
  line-height: 48px;
  letter-spacing: 0.30000001192092896px;
  text-align: left;
}
</style>
