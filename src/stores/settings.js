import SettingsState from '@/models/settings/SettingsState';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('Settings', {
  /**
 * @function
 * @name state
 * @returns {SettingsState} A new instance of SettingsState.
 * @description Returns a new `SettingsState` with default values.
 */
  state: () => {
    return { theme: 'LIGHT', lang: 'EN' };
  },

  actions: {
    // increment() {
    //   this.count++
    // },
  }
});
