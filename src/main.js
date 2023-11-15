import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles' // importing Global CSS
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import router from './router'
import { loadFonts } from './plugins/webfontloader'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// import { createPinia } from 'pinia'

loadFonts()

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives
  // theme: {
  // 	defaultTheme: "light", //"dark",
  // },
})

// const pinia = createPinia()

app.use(vuetify)
app.use(router)
// app.use(pinia)
app.mount('#app')
