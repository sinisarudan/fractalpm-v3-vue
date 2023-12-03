<script setup>
import { inject } from 'vue';

import { useDark } from '@vueuse/core';
// import { NotifLevel } from '@/models/notifications/NotifLevel';
// import Notification from '@/models/notifications/Notification';
// import { useNotificationsStore } from '@/stores/notifications';
// import { useSettingsStore } from '@/stores/settings';
// import { onMounted, computed } from 'vue';
// import { ref } from 'vue';
import { useTheme } from 'vuetify';
import { JSONsafeStringify } from '@/utils/JSONHelpers';

const theme = useTheme();
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
  console.log('[AppSettings] theme.global.current', JSONsafeStringify(theme.global.current));
};

</script>

<template>
  <div>
    <div class="theme-switch-wrapped">
      <!-- <v-switch
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
      </v-switch> -->
    </div>
    <v-btn @click="$i18n.locale = 'ur'; console.log('$i18n', $i18n);">
      ur
    </v-btn>
    <v-btn @click="$i18n.locale = 'en'; console.log('$i18n', $i18n);">
      en
    </v-btn>
  </div>
</template>

<style lang="scss">
// @use '@/styles/settings';
.v-switch__thumb {
      transform: none !important;
    }

.theme-switch-wrapped {
  // .theme-switch {

  // }
  position: relative;
  .light {
    position: absolute;
    left: 10px;
    // top: 10px;
    // z-index: 1000 !important;
    pointer-events: none;
  }
  .dark {
    position: absolute;
    right: 28px;
    // top: 10px;
    // z-index: 1000 !important;
    pointer-events: none;
  }
}
.custom-class {
    background: rgb(var(--v-theme-primary));
    color: rgba(var(--v-theme-on-primary), 0.9);
  }
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
</style>
