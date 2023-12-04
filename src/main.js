import { createApp } from 'vue';
import { useDark } from '@vueuse/core';
import './style.scss';
import App from './App.vue';

// Vuetify
import 'vuetify/styles'; // importing Global vuetify CSS
import { createVuetify } from 'vuetify';

// imported automatically by `vite-plugin-vuetify` for treeshaking reasons: https://vuetifyjs.com/en/features/treeshaking/
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';

import router from './router';
import { loadFonts } from './plugins/webfontloader';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader

import { createI18n } from 'vue-i18n';
import en from '@/assets/locale/en.json';
import ur from '@/assets/locale/ur.json';

import { createPinia } from 'pinia';

loadFonts();

/**
 * @type {import('vue').Ref<boolean>}
 */
const isDark = useDark();

console.log('[main.js] isDark', isDark.value);

/**
 * @type {import('vuetify').ThemeDefinition}
 */
const fractalPMLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    'on-background': '#4C4F51',
    'on-background-darken-1': '#111315',
    'on-background-darken-2': '#0D0D0D',
    'on-background-lighten-1': '#7E8285',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#8155FF',
    'primary-darken-1': '#613CE2',
    'primary-darken-2': '#3700B3',
    'primary-lighten-1': '#A06FFF',
    'primary-lighten-2': '#BE89FF',
    secondary: '#03DAC6',
    'secondary-darken-1': '#00BEAB',
    'secondary-lighten-1': '#47F7E2',
    'secondary-lighten-2': '#6DFFFF',
    'secondary-darken-2': '#00A290',
    'on-surface': '#000',
    'on-surface-bright': '#000',
    'on-primary': '#fff',
    'on-primary-darken-1': '#fff',
    'on-secondary': '#000',
    'on-secondary-darken-1': '#fff',
    'on-error': '#fff',
    'on-info': '#fff',
    'on-success': '#fff',
    'on-warning': '#fff',
    'on-primary-lighten-1': '#fff',
    'on-primary-lighten-2': '#fff',
    'on-primary-darken-2': '#fff',
    'on-secondary-lighten-1': '#000',
    'on-secondary-lighten-2': '#000',
    'on-secondary-darken-2': '#fff',
    'text-field-background': '#EDEAFA',
    'text-field-border': '#F5F6FF'
  }
};

/**
 * @type {import('vuetify').ThemeDefinition}
 */
const fractalPMDarkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#212121',
    'surface-bright': '#ccbfd6',
    'surface-variant': '#a3a3a3',
    'on-surface-variant': '#424242',
    primary: '#2196F3',
    'primary-darken-1': '#007CD6',
    secondary: '#54B6B2',
    'secondary-darken-1': '#359B97',
    error: '#CF6679',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'primary-lighten-1': '#51B0FF',
    'primary-darken-2': '#0064BA',
    'secondary-lighten-1': '#71D2CD',
    'secondary-darken-2': '#07817D',
    'on-background': '#fff',
    'on-background-darken-1': '#d0d0d0',
    'on-background-darken-2': '#c0c0c0',
    'on-background-lighten-1': '#fff',
    'on-surface': '#fff',
    'on-surface-bright': '#000',
    'on-primary': '#fff',
    'on-primary-darken-1': '#fff',
    'on-secondary': '#fff',
    'on-secondary-darken-1': '#fff',
    'on-error': '#fff',
    'on-info': '#fff',
    'on-success': '#fff',
    'on-warning': '#fff',
    'on-primary-lighten-1': '#fff',
    'on-primary-darken-2': '#fff',
    'on-secondary-lighten-1': '#000',
    'on-secondary-darken-2': '#fff'
  }
};

console.log('fractalPMLightTheme', fractalPMLightTheme);
console.log('fractalPMDarkTheme', fractalPMDarkTheme);

// TODO: migrate to https://vuetifyjs.com/en/features/sass-variables/ so that we can rely on SASS styling checks
/**
 * @type {import('vuetify').DefaultsOptions}
 */
const defaultsOptions = {
  VBtn: {
    variant: 'flat',
    color: 'primary',
    style: `
      border-radius: var(--v-btn-border-radius, 12px) !important; 
      font-size: 16px !important; 
      font-family: Inter !important;
      font-weight: 500 !important; 
      line-height: 24px !important;
      letter-spacing: 0px !important; 
      text-transform: none !important;
      `
    // block: true
  },
  VTextField: {
    color: 'red',
    style: `
      border-radius: var(--v-text-field-border-radius, 32px) !important; 
      //styleName: UI/Text/M/Light;
      font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
      margin-bottom: 24px;
    `
  }
};

const messages = { en, ur };

export const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'en',
  // locale: 'ur',
  fallbackLocale: 'en',
  messages
});

const app = createApp(App);
const vuetify = createVuetify({
  // components,
  // directives,
  theme: {
    defaultTheme: isDark.value ? 'fractalPMDarkTheme' : 'fractalPMLightTheme',
    themes: {
      fractalPMLightTheme,
      fractalPMDarkTheme
    },
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 2,
      darken: 2
    }
  },
  defaults: defaultsOptions,
  display: {
    mobileBreakpoint: 'sm'
  }
});

const pinia = createPinia();

app.use(vuetify);
app.use(router);
app.use(pinia);
app.use(i18n);
app.mount('#app');
