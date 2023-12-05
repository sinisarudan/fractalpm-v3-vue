<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useDisplay } from 'vuetify';
import AppLayoutWithIntro from '@/components/AppLayoutWithIntro.vue';
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
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const usersStore = useUsersStore();
const notificationsStore = useNotificationsStore();
const router = useRouter();
const { mobile } = useDisplay();

const EMailMaxLength = 70;

/**
 * @type {import('vue').Ref<Person>}
 */
const user = ref(Person.PersonInit);

/**
 * @type {import('vue').Ref<(string | undefined)>}
 */
const snackbarMessage = ref();

const showSnackbar = computed({
  get: () => !!snackbarMessage.value,

  /**
   * @type {import('vue').Ref<boolean>}
   */
  set: (val) => (snackbarMessage.value = val ? '' : undefined)
});

/**
 * @type {import('vue').Ref<(boolean)>}
 */
const hidePass = ref(true);

const form = ref();

const emailRules = ref([
  (v) => (v && v.length > 0) || i18n.t('errors.emailRequired'),
  (v) => (v && v.length <= EMailMaxLength) || i18n.t('errors.maximum', { no: EMailMaxLength }),
  (v) =>
    !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || i18n.t('errors.invalidEmail')
]);

const passRules = ref([
  (v) => (v && v.length > 0) || i18n.t('errors.passwordRequired')
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

    notificationsStore.add(new Notification(`Welcome ${user.first_name}! You have Successfully Logged In.`, NotifLevel.SUCCESS));
    router.push({ name: 'home' });
  } else {
    notificationsStore.add(new Notification(i18n.t('login.error'), NotifLevel.ERROR));
  }
};

const submit = async () => {
  if (await validateForm()) {
    // console.log("[submit] user.value", user.value); //WARNING: contains password
    userLoggedIn(user.value);
  } else {
    snackbarMessage.value = i18n.t('errors.formNotValid');
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
  notificationsStore.add(new Notification(i18n.t('login.passSetSuccess'), NotifLevel.SUCCESS));
  passwordChangedSuccess.value = i18n.t('login.passSetSuccess');
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
  <AppLayoutWithIntro>
    <div class="login">
      <div class="on-background">
        <div class="on-background-darken-1">
          <h1>{{ $t("login.welcome") }}</h1>
        </div>
        <div>
          <h2>{{ $t("login.submessage") }}</h2>
        </div>
      </div>
      <v-form
        ref="form"
        v-model="valid"
        class="form"
      >
        <div class="tf-label">
          {{ $t("placeholders.email") }}
        </div>
        <v-text-field
          v-model="user.email"
          :counter="EMailMaxLength"
          :label="$t('placeholders.enterEmail')"
          :rules="emailRules"
          placeholder="johndoe@gmail.com"
          required
        />

        <div class="tf-label">
          {{ $t("placeholders.password") }}
        </div>
        <v-text-field
          v-model="user.password"
          :label="$t('placeholders.enterPassword')"
          :rules="passRules"
          :type="hidePass ? 'password' : 'text'"
          :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
          required
          @click:append="hidePass = !hidePass"
        />
      </v-form>
      <div class="actions on-background-darken-1">
        <div class="forgot-pass-link">
          <a
            href="void:"
            @click.prevent="forgotPasswordShow = true"
          ><h2>{{ $t("login.forgot") }}</h2></a>
        </div>
        <v-btn
          class="primary-button"
          block
          @click="submit"
        >
          {{ $t("login.login") }}
        </v-btn>
        <div class="note">
          {{ $t("login.noAccount") }} <RouterLink to="/signup">
            {{ $t("login.signup") }}
          </RouterLink>
        </div>
      </div>
    </div>
    <v-snackbar
      v-model="showSnackbar"
      :timeout="3000"
    >
      {{ snackbarMessage }}

      <template #actions>
        <v-btn
          color="blue"
          variant="text"
          @click="snackbarMessage = undefined"
        >
          {{ $t('common.ok') }}
        </v-btn>
      </template>
    </v-snackbar>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="forgotPasswordShow"
          persistent
          :fullscreen="mobile"
          :max-width="mobile ? 'none' : '400px'"
          data-testid="forgot-password-dialog"
        >
          <ForgotPass @continue="forgotPassContinue" />
          <v-btn
            size="xs"
            color="transparent"
            variant="flat"
            icon
            class="close-button"
            @click="hideAllDialogs();"
          >
            <v-icon color="white">
              mdi-close
            </v-icon>
          </v-btn>
        </v-dialog>

        <v-dialog
          v-model="otpCodeShow"
          persistent
          :fullscreen="mobile"
          :max-width="mobile ? 'none' : '500px'"
          data-testid="otp-code-dialog"
        >
          <OTPDialog
            :forgot-recovery-email-phone="forgotRecoveryEmailPhone"
            @verified="hideAllDialogs(); setNewPasswordShow = true;"
          />
          <v-btn
            size="xs"
            color="transparent"
            variant="flat"
            icon
            class="close-button"
            @click="hideAllDialogs();"
          >
            <v-icon color="white">
              mdi-close
            </v-icon>
          </v-btn>
        </v-dialog>

        <v-dialog
          v-model="setNewPasswordShow"
          persistent
          :fullscreen="mobile"
          :max-width="mobile ? 'none' : '400px'"
          data-testid="set-new-password-dialog"
        >
          <SetNewPassword
            @password-changed="passwordChanged"
          />
          <v-btn
            size="xs"
            color="transparent"
            variant="flat"
            icon
            class="close-button"
            @click="hideAllDialogs();"
          >
            <v-icon color="white">
              mdi-close
            </v-icon>
          </v-btn>
        </v-dialog>
        <v-dialog
          v-model="successDialogShow"
          persistent
          :fullscreen="mobile"
          :max-width="mobile ? 'none' : '400px'"
          data-testid="success-dialog"
        >
          <SuccessDialog
            :message="passwordChangedSuccess"
            @close="hideAllDialogs"
          />
          <v-btn
            size="xs"
            color="transparent"
            variant="flat"
            icon
            class="close-button"
            @click="hideAllDialogs();"
          >
            <v-icon color="white">
              mdi-close
            </v-icon>
          </v-btn>
        </v-dialog>
      </v-row>
    </template>
  </AppLayoutWithIntro>
</template>

<style lang="scss">
@import "../variables";
.close-button {
    position: absolute;
    top: -30px;
    right:0px;
    // margin: 30px;
}
h1 {
  //styleName: Hero/S;
  font-family: Manrope;
  font-size: 32px;
  font-weight: 800;
  line-height: 48px;
  letter-spacing: 0.30000001192092896px;
  text-align: left;
  // color: $main-color;
}
h2 {
  //styleName: UI/Text/M/Regular;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  // color: $secondary-color;
}
.login {
  min-width: 438px;
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
  }
  .forgot-pass-link {
    text-align: right;
  }
  .note {
    //styleName: UI/Text/M/Medium;
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
  }
}
.actions {
  // padding: 5px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 19px;
}
</style>
<style lang="scss" scoped>
@import "../variables";
</style>
