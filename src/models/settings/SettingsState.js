/*
TS-original:
export interface SettingsState {
    theme: (string | undefined),
    lang: (string | undefined)
}
*/

/**
 * @typedef {Object} SettingsState
 * @property {(string | undefined)} theme - The theme setting.
 * @property {(string | undefined)} lang - The language setting.
 */
export default class SettingsState {
  /**
     * @param {(string | undefined)} theme - The theme setting.
     * @param {(string | undefined)} lang - The language setting.
     */
  constructor (theme, lang) {
    /**
       * The theme setting.
       * @type {(string | undefined)}
       */
    this.theme = theme;

    /**
       * The language setting.
       * @type {(string | undefined)}
       */
    this.lang = lang;
  }
}
