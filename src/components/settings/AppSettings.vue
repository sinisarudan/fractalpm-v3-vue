<script setup>
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

// const toggleTheme = () => {
//   isDark.value = !isDark.value;
//   setTheme();
// };

// onMounted(() => {
// })

// defineProps<{
//   msg: string
// }>()
// const tbdClicked = () => {
//   notificationsStore.add(new Notification('To be Done', NotifLevel.INFO));
// };

/*

const colorMode = useColorMode({
  modes: {
    dim: 'dim',
    cafe: 'cafe'
  },
  attribute: 'theme'
}); // 'light' or 'dark'
*/

</script>

<template>
  <!-- theme btn (instead of switch): <v-btn
    :icon="true"
    size="small"
    @click="toggleTheme"
  >
    <span>
      <v-icon
        color="on-primary"
      >
        {{
          isDark
            ? "mdi-white-balance-sunny"
            : "mdi-moon-waxing-crescent"
        }}
      </v-icon>
    </span>
  </v-btn> -->

  <!-- <v-container>
    <v-responsive class="d-flex align-center text-center">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn color="primary">
            Primary
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="secondary">
            Secondary
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="error">
            Error
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn color="info">
            Info
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="success">
            Success
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="warning">
            Warning
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container> -->

  <div class="theme-switch-wrapped">
    <!-- <v-icon class="light">
      mdi-white-balance-sunny
    </v-icon>
    <v-icon class="dark">
      mdi-moon-waxing-crescent
    </v-icon> -->
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
  <!-- <div>
    isDark: {{ isDark }}
    <v-btn @click="isDark = !isDark">
      Is Dark: {{ isDark }}
    </v-btn>
    {{ colorMode }}
    <button @click="colorMode = 'dark'">
      Dark Mode
    </button>
    <button @click="colorMode = 'light'">
      Light Mode
    </button>
    <button @click="colorMode = 'dim'">
      Dim Mode
    </button>
    <button @click="colorMode = 'cafe'">
      Cafe Mode
    </button>
  </div> -->

  <!-- <div class="">
    <div class="bg-primary on-primary">
      background color with appropriate text color contrast
    </div>

    <div class="bg-error on-error">
      error background color with appropriate text color contrast
    </div>

    <div class="text-primary">
      text color primary
    </div>

    <div class="text-primary-lighten-1">
      text-primary-lighten-1
    </div>

    <div class="text-primary-darken-1">
      text-primary-darken-1
    </div>

    <div class="text-primary-darken-2">
      text-primary-darken-2
    </div>

    <div class="text-secondary">
      text color secondary
    </div>

    <div class="text-error">
      text error
    </div>

    <div
      class="border-primary"
      style="border: 5px solid rgba(var(--v-theme-primary), 1);"
    >
      border color
    </div>
    <div class="custom-class">
      custom
    </div>
  </div> -->
  <!-- {{ settingsStore.lang }}  -->
  <!-- <v-btn
    size="x-small"
    @click="tbdClicked"
  >
    TBD
  </v-btn> -->
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
