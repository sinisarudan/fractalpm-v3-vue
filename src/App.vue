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
    <v-app-bar :elevation="0" app>
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
#app {
  background-color: white;
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
.primary-button {
  border-radius: var(--v-btn-border-radius, 12px) !important;
  background-color: #8155FF !important;
  color: white !important;
  // height: 48px !important;
  //styleName: UI/Text/M/Medium;
  font-family: Inter !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 24px !important;
  letter-spacing: 0px !important;
  text-transform: none !important;
  // padding-left: 0px !important;
  // padding-right: 0px !important;
}
.v-messages__message {
  // background-color: yellow !important;
  //styleName: UI/Text/XS/Medium;
  font-family: Inter !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 16px !important;
  letter-spacing: 0.20000000298023224px !important;
  text-align: left !important;
  color: #FF7676 !important;
  margin-top: 10px !important;
}
.v-messages__message::before {
  content: url('https://api.iconify.design/mdi/alert-circle.svg');
  color: #FF7676 !important;
  margin-right: 8px !important; /* Adjust the space between the icon and the text */
  filter: invert(59%) sepia(94%) saturate(2816%) hue-rotate(345deg) brightness(100%) contrast(105%);
}
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
.v-text-field .v-input__details {
    padding-inline: 0px !important;
}
.tf-label{
  //styleName: UI/Text/S/Medium;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.10000000149011612px;
  text-align: left;
  color: #4C4F51;
}
.t-field{
  margin-bottom: 12px;
  //styleName: UI/Text/M/Light;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 24px !important;
}
</style>
