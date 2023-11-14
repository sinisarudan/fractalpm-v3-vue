import 'vuetify/styles' // Global CSS has to be imported //according to https://next.vuetifyjs.com/en/getting-started/installation/
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import { createPinia } from 'pinia'

loadFonts()

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives
  // theme: {
  // 	defaultTheme: "light", //"dark",
  // },
})

const pinia = createPinia()

app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')