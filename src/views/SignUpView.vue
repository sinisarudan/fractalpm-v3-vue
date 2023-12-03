<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import AppLayoutWithIntro from '@/components/AppLayoutWithIntro.vue';
import Person from '@/models/users/Person';
import { useUsersStore } from '@/stores/users';
import { useRouter } from 'vue-router';
import Notification from '@/models/notifications/Notification';
import { useNotificationsStore } from '@/stores/notifications';
import { NotifLevel } from '@/models/notifications/NotifLevel';

const usersStore = useUsersStore();
const notificationsStore = useNotificationsStore();
const router = useRouter();

const first_nameMaxLength = 30;
const last_nameMaxLength = 35;
const EMailMaxLength = 70;

/**
   * @type {boolean}
   */
const SETUP_PASSWORD = false;

/**
 * @type {import('vue').Ref<Person>}
 */
const user = ref(Person.PersonInit);

/**
 * @type {import('vue').Ref<string>}
 */
const passwordConfirm = ref('');

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
 * @type {import('vue').Ref<(string | undefined)>}
 */
const hidePass = ref(true);

const form = ref();

const emailRules = ref([
  (v) => (v && v.length > 0) || 'E-mail is required',
  (v) => (v && v.length <= EMailMaxLength) || `Maximum ${EMailMaxLength} characters`,
  (v) =>
    !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'E-mail must be valid'
]);

const fNameRules = ref([
  (v) => (v && v.length > 0) || 'First name is required',
  (v) => (v && v.length <= first_nameMaxLength) || `Maximum ${first_nameMaxLength} characters`
]);

const lNameRules = ref([
  (v) => (v && v.length > 0) || 'Last name is required',
  (v) => (v && v.length <= last_nameMaxLength) || `Maximum ${last_nameMaxLength} characters`
]);

const PassMinLength = 8;
const PassMaxLength = 100;

const passRulesArray = [
  (v) => (v && v.length >= PassMinLength && v.length < PassMaxLength) || `At least ${PassMinLength} characters long and maximum of ${PassMaxLength} characters`,
  (v) => (/[A-Z]/.test(v) && /[a-z]/.test(v)) || 'Has at least 1 uppercase and 1 lowercase character',
  (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Has at least 1 special character',
  (v) => /\d/.test(v) || 'Has at least 1 digit'
];

const passRules = ref(passRulesArray);

const passConfirmRules = ref([...passRulesArray,
  (v) => (v && user.value.password === v) || 'Passwords don\'t match'
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
 * @name userSignedUp
 * @param {Person} userToRegister
 * @returns {Promise<void>}
 * @description
 */
const userSignedUp = async (userToRegister) => {
  const user = (await usersStore.signup(userToRegister));
  if (user) {
    // TODO: add security transformations: hash, salt, pass ...
    // so far password is removed before storing:
    localStorage.loggedInUser = JSON.stringify({ ...JSON.parse(JSON.stringify(user)), password: undefined });

    notificationsStore.add(new Notification(`Welcome ${user.first_name}! You have Successfully Signed Up.`, NotifLevel.SUCCESS));
    notificationsStore.add(new Notification('Check for a confirmation email to set a password.', NotifLevel.WARNING));
    router.push({ name: 'home' });
  }
};

const submit = async () => {
  if (await validateForm()) {
    // console.log("[submit] user.value", user.value); //WARNING: contains password
    userSignedUp(user.value);
  } else {
    snackbarMessage.value = 'Form is not valid';
  }
};
</script>

<template>
  <AppLayoutWithIntro>
    <div class="signup">
      <div><h1>{{ $t('signup.createAccount') }}</h1></div>
      <div><h2>{{ $t("login.submessage") }}</h2></div>
      <v-form
        ref="form"
        v-model="valid"
        class="form"
      >
        <div class="tf-label">
          {{ $t('common.firstName') }}
        </div>
        <v-text-field
          v-model="user.first_name"
          :counter="first_nameMaxLength"
          :label="$t('placeholders.enterFirstName')"
          :rules="fNameRules"
          required
        />

        <div class="tf-label">
          {{ $t('common.lastName') }}
        </div>
        <v-text-field
          v-model="user.last_name"
          :counter="last_nameMaxLength"
          :label="$t('placeholders.enterLastName')"
          :rules="lNameRules"
          required
        />

        <div class="tf-label">
          {{ $t('placeholders.email') }}
        </div>
        <v-text-field
          v-model="user.email"
          :counter="EMailMaxLength"
          :label="$t('placeholders.enterEmail')"
          :rules="emailRules"
          placeholder="johndoe@gmail.com"
          required
        />

        <div v-if="SETUP_PASSWORD">
          <div class="tf-label">
            {{ $t('placeholders.password') }}
          </div>
          <v-text-field
            v-model="user.password"

            label="Create a Password"
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

            label="Confirm Password"
            :rules="passConfirmRules"
            :type="hidePass ? 'password' : 'text'"
            :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
            required
            @click:append="hidePass = !hidePass"
          />
        </div>
      </v-form>
      <div class="actions on-background-darken-1">
        <v-btn
          block
          @click="submit"
        >
          {{ $t('signup.createAccount') }}
        </v-btn>
        <div class="agree">
          By signing up, you agree with <a href="#">our terms</a> and <a href="#">privacy policy</a>.
        </div>
        <div>
          {{ $t('signup.already') }}  <RouterLink to="/login">
            {{ $t('login.login') }}
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
          OK
        </v-btn>
      </template>
    </v-snackbar>
  </AppLayoutWithIntro>
</template>

<style lang="scss">
@import "../variables";
.signup {
  min-width: 440px;
  // padding: 15px;
  // overflow: scroll;
  // text-align: left;
  // // height: 100%;
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
    color: $secondary-color;
  }
  .close {
    margin: 5px;
  }
  .form {
    margin-top: 24px;
    // max-height: 350px;
    // overflow-y: scroll;
  }
}
.actions {
  // padding: 5px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: left;
  // color: $main-color;
  .agree {
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.10000000149011612px;
    text-align: left;
  }
}
</style>
<style lang="scss" scoped>
  @import "../variables";
</style>
