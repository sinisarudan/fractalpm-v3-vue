<script setup>

import { useDark } from '@vueuse/core';
// import { NotifLevel } from '@/models/notifications/NotifLevel';
// import Notification from '@/models/notifications/Notification';
// import { useNotificationsStore } from '@/stores/notifications';
// import { useSettingsStore } from '@/stores/settings';
// import { onMounted, computed } from 'vue';
// import { ref } from 'vue';
import { useTheme } from 'vuetify';
// import { JSONsafeStringify } from '@/utils/JSONHelpers';

import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const theme = useTheme();
const languages = [
  { title: 'en' },
  { title: 'ur' }
];

// const darkMode = ref(false);

/**
 * @type {import('vue').Ref<boolean>}
 */
const isDark = useDark();

// const notificationsStore = useNotificationsStore();
// const settingsStore = useSettingsStore();

const setTheme = () => {
  // isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? 'fractalPMDarkTheme' : 'fractalPMLightTheme';
  // Optional: Get value of current theme
  console.log(`Current theme is dark? ${theme.global.current.value.dark}`);
  // console.log('[AppSettings] theme.global.current', JSONsafeStringify(theme.global.current));
  console.log('i18n.locale', i18n.locale.value);
};

/**
   * changes the language.
   * @param {string} languageCode
   */
const setLanguage = (languageCode) => {
  i18n.locale.value = languageCode;
};

</script>

<template>
  <div class="app-settings">
    <div class="theme-switch-wrapped">
      <v-switch
        v-model="isDark"
        class="theme-switch"
        inset flat
        @update:model-value="setTheme()"
      >
        <template #append>
          <v-icon class="light" size="12">
            mdi-white-balance-sunny
          </v-icon>
          <v-icon class="dark" size="12">
            mdi-moon-waxing-crescent
          </v-icon>
        </template>
      </v-switch>
    </div>
    <div class="lang-selector">
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            class="lang-btn"
            block
            v-bind="props"
          >
            <div class="img-text">
              <v-img :src="`/assets/${i18n.locale.value}-flag.png`" class="lang-flag-image" />
              {{ $t(`application.${i18n.locale.value}Code`) }}
              <v-icon>mdi-chevron-down</v-icon>
            </div>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(language, index) in languages"
            :key="index"
            @click="setLanguage(language.title)"
          >
            <v-img :src="`/assets/${language.title}-flag.png`" class="lang-flag-image" />
            <v-list-item-title>{{ $t(`application.${language.title}Code`) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/styles/settings';
.app-settings {
  display: flex;
  height: 24px !important;
  flex-direction: row;
  vertical-align: top !important;
  .theme-switch-wrapped {
    .v-switch__thumb {
      transform: none !important;
    }
    .v-switch .v-selection-control {
      min-height: 24px !important;
      height: 24px !important;
    }
    position: relative;
    // .theme-switch {
    //   // width: 16px !important;
    //   // height: 12px !important;
    // }
    .light {
      position: absolute;
      left: 5px;
      pointer-events: none;
    }
    .dark {
      position: absolute;
      right: 20px;
      pointer-events: none;
    }
  }
}
.lang-selector {
    .lang-btn {
      border-radius: 12px !important;
      height: 24px !important;
      padding-top: 5px !important;
      // color: yellow !important;
    }
    .v-btn__content {
      display: flex !important;
      flex-direction: row !important;
      vertical-align: middle !important;
    }
  }
  .v-list-item__content {
      display: flex !important;
      flex-direction: row !important;
      vertical-align: middle !important;
    }
  .lang-flag-image {
      width: 12px !important;
      height: 12px !important;
      margin-right: 4px !important;
    }
    .img-text {
      display: flex;
      flex-direction: row;
    }
</style>
