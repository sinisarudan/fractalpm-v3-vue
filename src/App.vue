<script setup lang="ts">
import { ref, onMounted } from 'vue'

import AppSettings from './components/settings/AppSettings.vue';
import AppNotifications from './components/AppNotifications.vue';

const drawer = ref<boolean>(false);

// lifecycle hooks
onMounted(() => {
  
})
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <RouterLink to="/"><img src="/assets/logo.png" alt="FractalPM" /></RouterLink>
      <!-- <v-switch v-model="darkTheme" :label="darkTheme ? 'dark' : 'light'"></v-switch> -->
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