import NotificationsState from '@/stores/NotificationsState';
import { defineStore } from 'pinia'

/**
 * @type {number}
 * @description Maximum ID for notifications.
 */
let notifMaxId = 0

export const useNotificationsStore = defineStore('Notifications', {
  
  /**
  * @function
  * @name state
  * @returns {NotificationsState} A new instance of NotificationsState.
  * @description Returns a new `NotificationsState` with default values.
  */
  state: () => {
    return {
      notifications: [],
      visible: true,
      expanded: true
    }
  },
  getters: {
    /**
     * @param {NotificationsState} state
     * @return {*}  {number}
     */
    count: (state) => (state.notifications ? state.notifications.length : 0)
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // increment() {
    //   this.count++
    // },

    /**
     * @param {INotification} notif
     * @return {*}  {(number | undefined)}
     */
    add(notif) {
      console.log('[notif::actions::show] called')
      if (notif) {
        notif.id = notifMaxId++
        this.notifications.push(notif)
        console.log('[notif::actions::show]', notif)
        // dispatch({
        //     type: ENotifActions.SHOW,
        //     payload: notif,
        // }
        return notif.id
      } else {
        return undefined
      }
    },
    /**
     * @param {(number | undefined)} notifId
     * * @return {*}  {void}
     */
    remove(notifId) {
      if (!notifId) {
        return
      }
      const index = this.notifications.findIndex((notif) => notif.id === notifId)

      if (index !== -1) {
        this.notifications.splice(index, 1)
      }
    },
    clearNotifications() {
      this.$patch({ notifications: [] }) // Use $patch to empty the notifications array
    }
  }
})
