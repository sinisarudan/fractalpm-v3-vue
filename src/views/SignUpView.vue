<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import Person from '@/models/users/Person';
import { useUsersStore } from '@/stores/users';
import { useRouter } from 'vue-router';
import Notification from '@/models/notifications/Notification';
import { useNotificationsStore } from '@/stores/notifications';
import { NotifLevel } from '@/models/notifications/NotifLevel';

const usersStore = useUsersStore();
const notificationsStore = useNotificationsStore();
const router = useRouter();

const FirstNameMaxLength = 30;
const LastNameMaxLength = 35;
const EMailMaxLength = 70;

/**
 * @type {Person}
 */
const user = ref(Person.PersonInit);
const passwordConfirm = ref('');

const showSnackbar = computed({
  get: () => !!snackbarMessage.value,

  /**
   * @type {boolean}
   */
  set: (val) => (snackbarMessage.value = val ? '' : undefined)
});

/**
 * @type {string | undefined}
 */
const snackbarMessage = ref();

/**
 * @type {string | undefined}
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
  (v) => (v && v.length <= FirstNameMaxLength) || `Maximum ${FirstNameMaxLength} characters`
]);

const lNameRules = ref([
  (v) => (v && v.length > 0) || 'Last name is required',
  (v) => (v && v.length <= LastNameMaxLength) || `Maximum ${LastNameMaxLength} characters`
]);

const passRules = ref([
  (v) => (v && v.length > 0) || 'Password is required'
]);

/**
 * @type {boolean}
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
  const user = (await usersStore.register(userToRegister));
  if (user) {
    // TODO: add security transformations: hash, salt, pass ...
    // so far password is removed before storing:
    localStorage.loggedInUser = JSON.stringify({ ...JSON.parse(JSON.stringify(user)), password: undefined });

    notificationsStore.add(new Notification(`Welcome ${user.firstName}! You have Successfully Signed Up.`, NotifLevel.SUCCESS));
    router.push({ name: 'home' });
  } else {
    notificationsStore.add(new Notification('Signup Error.', NotifLevel.ERROR));
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
  <v-card class="signup">
    <div><h1>Create Account</h1></div>
    <div>Start managing your projects the right way.</div>
    <v-form class="form" v-model="valid" ref="form">

      <div class="tf-label">First Name</div>
      <v-text-field
        class="t-field"
        v-model="user.firstName"
        :counter="FirstNameMaxLength"
        label="Enter your first name"
        :rules="fNameRules"
        required
      >
      </v-text-field>

      <div class="tf-label">Last Name</div>
      <v-text-field
        class="t-field"
        v-model="user.lastName"
        :counter="LastNameMaxLength"
        label="Enter your last name"
        :rules="lNameRules"
        required
      >
      </v-text-field>

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
        label="Create a Password"
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
        label="Confirm Password"
        :rules="passRules"
        :type="hidePass ? 'password' : 'text'"
        :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="hidePass = !hidePass"
        required
      >
      </v-text-field>
    </v-form>
    <div class="actions">
      <v-btn color="blue" @click="submit">Create Account</v-btn>
    </div>
    <div>By signing up, you agree with <a src="">our terms</a> and <a src="">privacy policy</a>.</div>
    <div>Already have an account?  <RouterLink to="/login">Login</RouterLink></div>
  </v-card>
  <v-snackbar v-model="showSnackbar" :timeout="3000">
    {{ snackbarMessage }}

    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbarMessage = undefined">OK</v-btn>
    </template>
  </v-snackbar>
</template>

<style lang="scss">

.signup {
  min-width: 300px;
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
}
.actions {
  padding: 5px;
  margin: auto;
}
</style>
<style lang="scss" scoped></style>
