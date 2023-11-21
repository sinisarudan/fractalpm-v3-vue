<script setup>
import { onMounted, computed } from 'vue';
// import { NotifLevel } from '@/models/notifications/NotifLevel';
// import Notification from '@/models/notifications/Notification';
// import { useNotificationsStore } from '@/stores/notifications';
import { useUsersStore } from '@/stores/users';
import { useRouter } from 'vue-router';
// import { onMounted } from 'vue'
// import { computed } from 'vue'

// const notificationsStore = useNotificationsStore();

const usersStore = useUsersStore();
const router = useRouter();

const emit = defineEmits(['navClicked']);

onMounted(() => {
  // keeping user login session:
  if (localStorage.loggedInUser) {
    try {
      // TODO: add security transformations: hash, salt, pass
      usersStore.user = JSON.parse(localStorage.loggedInUser);
    } catch {
      localStorage.loggedInUser = null;
    }
  }
  console.log('[App] usersStore.user', usersStore?.user);
  console.log('[App] usersStore.user.email', usersStore?.user?.email);
});

/**
 * @function
 * @name showLogin
 * @returns {boolean}
 */
const showLogin = computed(
  () =>
    router.currentRoute.value.path !== '/login' && !usersStore.user
);

/**
 * @function
 * @name showSignUp
 * @returns {boolean}
 */
const showSignUp = computed(
  () =>
  router.currentRoute.value.path !== '/signup' && !usersStore.user
);

/**
 * @function
 * @name showSignUp
 * @returns {boolean}
 */
const showUserAccountBtn = computed(
  () => {
    return router.currentRoute.value.path !== '/user_account' && usersStore.user;
  });

const navClicked = () => {
  emit('navClicked');
};

const openUserAccount = () => {
  router.push({ name: 'UserAccountView' });
};

// onMounted(() => {
// })

// defineProps<{
//   msg: string
// }>()

</script>

<template>
  <v-app-bar-nav-icon variant="text" @click.stop="navClicked"></v-app-bar-nav-icon>
  <RouterLink class="logo" to="/"><img src="/assets/logo.png" alt="FractalPM" /></RouterLink>
  <div class="app-actions">
    <router-link v-if="showSignUp" to="/signup">
      <v-btn variant="outlined">Signup</v-btn>
    </router-link>
    <router-link v-if="showLogin" to="/login">
      <v-btn variant="outlined">Login</v-btn>
    </router-link>
    <!-- <v-switch v-model="darkTheme" :label="darkTheme ? 'dark' : 'light'"></v-switch> -->
    <!-- version with one button for login/register <v-btn
        @click="openUserAccount"
        v-if="showUserAccountBtn"
        variant="outlined"
        >{{ usersStore.user ? usersStore.user.firstName : "Login/Register"
        }}<v-icon>mdi-account-cog</v-icon></v-btn
      > -->
      <v-btn
        @click="openUserAccount"
        v-if="showUserAccountBtn"
        variant="outlined"
        >{{ usersStore.user?.firstName }}<v-icon>mdi-account-cog</v-icon></v-btn
      >
  </div>
</template>

<style lang="scss" scoped>
.app-actions{
  display: flex;
  gap: 20px;
}
</style>
