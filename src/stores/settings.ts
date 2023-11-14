import type { SettingsState } from '@/models/settings/settings-vos'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('Settings', {
  state: (): SettingsState => {
    return { theme: "LIGHT", lang: "EN" }
  },

  actions: {
    // increment() {
    //   this.count++
    // },
  }
})
