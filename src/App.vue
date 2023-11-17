<script setup>
import { ref, onMounted } from 'vue'

import AppSettings from './components/settings/AppSettings.vue';
import AppNotifications from './components/AppNotifications.vue';
//TODO: remove this: for demoing `usersStore` working as expected
import { useUsersStore } from '@/stores/users';
import Person from '@/models/users/Person';

const drawer = ref(false);

const usersStore = useUsersStore();
// lifecycle hooks
onMounted( async () => {
  //TODO: remove this:  `usersStore` working as expected
  const loggedInUser = await usersStore.login(Person.PersonInit);
  console.log("[App] loggedInUser", loggedInUser);
  console.log("[App] loggedInUser.email", loggedInUser.email);

})
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <RouterLink class="logo" to="/"><img src="/assets/logo.png" alt="FractalPM" /></RouterLink>
      <div class="app-actions">
        <router-link to="/signup">
          <v-btn variant="outlined">Signup</v-btn>
        </router-link>
        <router-link to="/login">
          <v-btn variant="outlined">Login</v-btn>
        </router-link>
        <!-- <v-switch v-model="darkTheme" :label="darkTheme ? 'dark' : 'light'"></v-switch> -->
      </div>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" right bottom temporary>
      <RouterLink @click="drawer = false" class="router-link" to="/">Home</RouterLink>
      <RouterLink @click="drawer = false" class="router-link" to="/user_account"
        >My Account</RouterLink
      >
      <RouterLink @click="drawer = false" class="router-link" to="/about">About</RouterLink>
    </v-navigation-drawer>

    <!-- <v-toolbar></v-toolbar> -->
    <v-main>
      <v-container fluid>
        <AppNotifications />
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app><AppSettings /></v-footer>
  </v-app>
</template>

<style lang="scss" scoped>
.app-actions{
  display: flex;
  gap: 20px;
}
.router-link {
  margin: 10px;
}

.app-name {
  margin-right: 5px;
  font-size: 20px;
}
.logo {
  margin-right: 20px;
}
</style>

<style lang="scss">
.v-footer {
  text-align: right !important;
  right: 0px !important;
  position: absolute !important;
  // color: gray !important;
}
.v-navigation-drawer__content {
  display: flex !important;
  flex-direction: column !important;
}
</style>
