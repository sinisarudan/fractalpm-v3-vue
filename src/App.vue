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
  <v-app id="app">
    <v-app-bar
      :elevation="0"
    >
      <AppNavBar @nav-clicked="navClicked" />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <RouterLink
        class="router-link"
        to="/"
        @click="drawer = false"
      >
        <span><v-icon>mdi-home</v-icon></span>
        <span>{{ $t('common.home') }}</span>
      </RouterLink>
      <RouterLink
        class="router-link"
        to="/projects"
        @click="drawer = false"
      >
        <span><v-icon>mdi-package theme</v-icon></span>
        <span>{{ $t('sidebar.projects') }}</span>
      </RouterLink>
      <RouterLink
        class="router-link"
        to="/organizations"
        @click="drawer = false"
      >
        <span><v-icon>mdi-briefcase</v-icon></span>
        <span>{{ $t('sidebar.organizations') }}</span>
      </RouterLink>
      <RouterLink
        class="router-link"
        to="/user_account"
        @click="drawer = false"
      >
        <span><v-icon>mdi-account</v-icon></span>
        <span> {{ $t('sidebar.myAccount') }}</span>
      </RouterLink>
      <RouterLink
        class="router-link"
        to="/about"
        @click="drawer = false"
      >
        <span><v-icon>mdi-information</v-icon></span>
        <span>{{ $t('sidebar.about') }}</span>
      </RouterLink>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <AppNotifications />
        <router-view />
      </v-container>
    </v-main>
    <v-bottom-navigation :elevation="0">
      <AppSettings class="app-settings" />
    </v-bottom-navigation>
  </v-app>
</template>

<style lang="scss" scoped>
@import "variables";
.v-application {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif !important;
  background-color: rgb(var(--v-theme-background)) !important;
  color: rgb(var(--v-theme-on-background)) !important;
}
#app {
  // background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
@import "variables";
.v-bottom-navigation {
  height: 36px !important;
}
.app-settings {
  margin-left: auto;
  margin-right: 100px;
  height: 24px !important;
  padding: 3px;
}
.tf-label{
  //styleName: UI/Text/S/Medium;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.10000000149011612px;
  text-align: left;
  color: $secondary-color;
}
.v-card {
  border-radius: 16px !important;
}
.v-field__input {
  border: 1px solid rgb(var(--v-theme-text-field-border)) !important; //#EDEAFA
  border-radius: 8px !important;
  background-color: rgb(var(--v-theme-text-field-background)) !important;
}

.v-field__overlay {
  border: 1px solid rgb(var(--v-theme-text-field-border)) !important; //#EDEAFA
  border-radius: 8px !important;
  // background-color: rgb(var(--v-theme-text-field-background)) !important;
}
.v-bottom-navigation {
  background: rgb(var(--v-theme-background)) !important;
}

</style>
