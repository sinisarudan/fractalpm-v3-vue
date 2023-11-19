<script setup>
import { ref } from 'vue';

import AppSettings from './components/settings/AppSettings.vue';
import AppNotifications from './components/AppNotifications.vue';
import AppNavBar from './components/AppNavBar.vue';
// import Person from '@/models/users/Person';

/**
 * @type {import('vue').Ref<boolean>}
 */
const drawer = ref(false);

const navClicked = () => {
  drawer.value = !drawer.value;
};
</script>

<template>
  <v-app>
    <v-app-bar app>
      <AppNavBar @navClicked="navClicked" />
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
