// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

// Styles
import '@mdi/font/css/materialdesignicons.css';
// import 'vuetify/styles';
import '@/styles/main.scss';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// const fractalPMDarkTheme = {
//   dark: true,
//   colors: {
//     background: '#15202b',
//     surface: '#15202b',
//     primary: '#3f51b5',
//     secondary: '#03dac6',
//     error: '#044336',
//     info: '#2196F3',
//     success: '#4caf50',
//     warning: '#fb8c00'
//   }
// };

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
    // theme: {
    //   defaultTheme: 'fractalPMDarkTheme',
    //   themes: {
    //     fractalPMDarkTheme
    //   }
    // }
  }
});
