import NotificationsState from '@/stores/NotificationsState';
import Notification from '@/models/notifications/Notification';
import { defineStore } from 'pinia';
import { NotifLevel } from '@/models/notifications/NotifLevel';

/**
 * @type {number}
 * @description Maximum ID for notifications.
 */
let notifMaxId = 0;

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
    };
  },
  getters: {
    /**
     * @param {NotificationsState} state
     * @returns {number} number of notifications
     */
    count: (state) => { return (state.notifications ? state.notifications.length : 0); }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // increment() {
    //   this.count++
    // },

    /**
     * @param {Notification} notif
     * @returns {(number | undefined)}
     */
    add (notif) {
      console.log('[notif::actions::show] called');
      if (notif) {
        notif.id = notifMaxId++;
        this.notifications.push(notif);
        console.log('[notif::actions::show]', notif);
        // dispatch({
        //     type: ENotifActions.SHOW,
        //     payload: notif,
        // }
        return notif.id;
      } else {
        return undefined;
      }
    },

    /**
     * @param {(number | undefined)} notifId
     * @returns {void}
     */
    remove (notifId) {
      if (!notifId) {
        return;
      }
      const index = this.notifications.findIndex((notif) => notif.id === notifId);

      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
    clearNotifications () {
      this.$patch({ notifications: [] }); // Use $patch to empty the notifications array
    },

    /**
     * @param { NotifLevel } notifLevel
     * @returns {number} timeout in **milliseconds** for the provided `NotifLevel` (`-1` means **endless**)
     */
    timeout: (notifLevel) => {
      switch (notifLevel) {
        case NotifLevel.SUCCESS:
          return 3000;
        case NotifLevel.INFO:
          return 5000;
        case NotifLevel.WARNING:
          return -1;
        case NotifLevel.ERROR:
        default:
          return -1;
      }
    }
  }
});
