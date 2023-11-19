<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import ForgotPass from '@/components/forgotPass/ForgotPass.vue';
import OTPDialog from '@/components/forgotPass/OTPDialog.vue';
import SetNewPassword from '@/components/forgotPass/SetNewPassword.vue';
import SuccessDialog from '@/components/SuccessDialog.vue';
import Person from '@/models/users/Person';
import { useUsersStore } from '@/stores/users';
import { useRouter } from 'vue-router';
import Notification from '@/models/notifications/Notification';
import { useNotificationsStore } from '@/stores/notifications';
import { NotifLevel } from '@/models/notifications/NotifLevel';

const usersStore = useUsersStore();
const notificationsStore = useNotificationsStore();
const router = useRouter();

const EMailMaxLength = 70;

/**
 * @type {import('vue').Ref<Person>}
 */
const user = ref(Person.PersonInit);

const showSnackbar = computed({
  get: () => !!snackbarMessage.value,

  /**
   * @type {import('vue').Ref<boolean>}
   */
  set: (val) => (snackbarMessage.value = val ? '' : undefined)
});

/**
 * @type {import('vue').Ref<(string | undefined)>}
 */
const snackbarMessage = ref();

/**
 * @type {import('vue').Ref<(boolean)>}
 */
const hidePass = ref(true);

const form = ref();

const emailRules = ref([
  (v) => (v && v.length > 0) || 'E-mail is required',
  (v) => (v && v.length <= EMailMaxLength) || `Maximum ${EMailMaxLength} characters`,
  (v) =>
    !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'E-mail must be valid'
]);

const passRules = ref([
  (v) => (v && v.length > 0) || 'Password is required'
]);

/**
 * @type {import('vue').Ref<boolean>}
 */
const valid = ref(false);

onMounted(() => {
  watch(user.value, validateForm);
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
 * @function
 * @name userLoggedIn
 * @param {Person} userToLogIn
 * @returns {Promise<void>}
 * @description
 */
const userLoggedIn = async (userToLogIn) => {
  const user = (await usersStore.login(userToLogIn));
  if (user) {
    // TODO: add security transformations: hash, salt, pass ...
    // so far password is removed before storing:
    localStorage.loggedInUser = JSON.stringify({ ...JSON.parse(JSON.stringify(user)), password: undefined });

    notificationsStore.add(new Notification(`Welcome ${user.firstName}! You have Successfully Logged In.`, NotifLevel.SUCCESS));
    router.push({ name: 'home' });
  } else {
    notificationsStore.add(new Notification('Login Error.', NotifLevel.ERROR));
  }
};

const submit = async () => {
  if (await validateForm()) {
    // console.log("[submit] user.value", user.value); //WARNING: contains password
    userLoggedIn(user.value);
  } else {
    snackbarMessage.value = 'Form is not valid';
  }
};

/**
 * @type {import('vue').Ref<(boolean)>}
 */
const forgotPasswordShow = ref(false);

/**
 * @type {import('vue').Ref<(boolean)>}
 */
const otpCodeShow = ref(false);

/**
 * @type {import('vue').Ref<(boolean)>}
 */
const setNewPasswordShow = ref(false);

const hideAllDialogs = () => {
  forgotPasswordShow.value = false;
  otpCodeShow.value = false;
  setNewPasswordShow.value = false;
  passwordChangedSuccess.value = undefined;
};

const passwordChanged = () => {
  hideAllDialogs();
  notificationsStore.add(new Notification('Your Password has been set successfully.', NotifLevel.SUCCESS));
  passwordChangedSuccess.value = 'Your Password has been set successfully';
};

/**
 * @type {import('vue').Ref<(string | undefined)>}
 */
const forgotRecoveryEmailPhone = ref();

const forgotPassContinue = (forgotRecoveryEmailPhoneInput) => {
  forgotRecoveryEmailPhone.value = forgotRecoveryEmailPhoneInput;
  hideAllDialogs();
  otpCodeShow.value = true;
};

/**
 * @type {import('vue').Ref<(string | undefined)>}
 */
const passwordChangedSuccess = ref();

const successDialogShow = computed({
  get: () => !!passwordChangedSuccess.value,

  /**
   * @type {import('vue').Ref<boolean>}
   */
  set: (val) => (passwordChangedSuccess.value = val ? '' : undefined)
});

</script>

<template>
  <v-card class="login">
    <div>
      <div><h1>Welcome Back</h1></div>
      <div>Start managing your projects the right way.</div>
    </div>
    <v-form class="form" v-model="valid" ref="form">
      <div class="tf-label">Email</div>
      <v-text-field
      class="t-field"
        v-model="user.email"
        :counter="EMailMaxLength"
        label="Enter your email"
        :rules="emailRules"
        placeholder="johndoe@gmail.com"
        required
      >
      </v-text-field>

      <div class="tf-label">Password</div>
      <v-text-field
      class="t-field"
        v-model="user.password"
        label="Enter your password"
        :rules="passRules"
        :type="hidePass ? 'password' : 'text'"
        :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="hidePass = !hidePass"
        required
      >
      </v-text-field>
    </v-form>
    <div class="actions">
      <div class="forgot-pass-link"><a href="void:" @click.prevent="forgotPasswordShow = true">Forgot Password?</a></div>
      <v-btn color="#8155FF" block variant="flat" @click="submit">Login</v-btn>
    </div>
    <div>Don't have an account? <RouterLink to="/signup">Signup</RouterLink></div>
  </v-card>
  <v-snackbar v-model="showSnackbar" :timeout="3000">
    {{ snackbarMessage }}

    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbarMessage = undefined">OK</v-btn>
    </template>
  </v-snackbar>
  <template>
    <v-row justify="center">
      <v-dialog
        v-model="forgotPasswordShow"
        width="auto"
        persistent
        data-testid="forgot-password-dialog"
      >
        <ForgotPass @continue="forgotPassContinue" />
        <v-btn size="xs" color="transparent" variant="flat" icon @click="hideAllDialogs();" class="close-button">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-dialog>

      <v-dialog
        v-model="otpCodeShow"
        width="auto"
        persistent
        data-testid="otp-code-dialog"
      >
        <OTPDialog @verified="hideAllDialogs(); setNewPasswordShow = true;" :forgotRecoveryEmailPhone="forgotRecoveryEmailPhone" />
        <v-btn size="xs" color="transparent" variant="flat" icon @click="hideAllDialogs();" class="close-button">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-dialog>

      <v-dialog
        v-model="setNewPasswordShow"
        width="auto"
        persistent
        data-testid="set-new-password-dialog"
      >
        <SetNewPassword @passwordChanged="passwordChanged" :forgotRecoveryEmailPhone="forgotRecoveryEmailPhone" />
        <v-btn size="xs" color="transparent" variant="flat" icon @click="hideAllDialogs();" class="close-button">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-dialog>
      <v-dialog
        v-model="successDialogShow"
        width="auto"
        persistent
        data-testid="set-new-password-dialog"
      >
      <SuccessDialog :message="passwordChangedSuccess" @close="hideAllDialogs" />
        <v-btn size="xs" color="transparent" variant="flat" icon @click="hideAllDialogs();" class="close-button">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-dialog>
    </v-row>
  </template>
</template>

<style lang="scss">
.close-button {
    position: absolute;
    top: -30px;
    right:0px;
    // margin: 30px;
  }
.login {
  min-width: 400px;
  padding: 15px;
  overflow: scroll;
  text-align: left;
  // height: 100%;
  .close {
    margin: 5px;
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
  .forgot-pass-link {
    text-align: right;
  }
}
.actions {
  padding: 5px;
  margin: auto;
}
</style>
<style lang="scss" scoped></style>
