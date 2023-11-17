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

const EMailMaxLength = 70;

/**
 * @type {Person}
 */
const user = ref(Person.PersonInit);

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
 * @name userLoggedIn
 * @param {Person} userToLogIn
 * @returns {Promise<void>}
 * @description
 */
const userLoggedIn = async (userToLogIn) => {
  const user = (await usersStore.login(userToLogIn));
  if (user) {
    localStorage.loggedInUser = JSON.stringify(user);
    notificationsStore.add(new Notification(`Welcome ${user.firstName}! You have Successfully Logged In.`, NotifLevel.SUCCESS));
    router.push({ name: 'home' });
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
      <v-btn color="blue" @click="submit">Login</v-btn>
    </div>
    <div>Don't have an account? <RouterLink to="/signup">Signup</RouterLink></div>
  </v-card>
  <v-snackbar v-model="showSnackbar" :timeout="3000">
    {{ snackbarMessage }}

    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbarMessage = undefined">OK</v-btn>
    </template>
  </v-snackbar>
</template>

<style lang="scss">

.login {
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
