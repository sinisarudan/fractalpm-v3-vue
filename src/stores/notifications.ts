import { defineStore } from 'pinia'

export enum ENotifLevel {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}
export interface INotification {
  title: string
  level: ENotifLevel
  id?: number
}

interface NotificationsState {
  notifications: INotification[]
  visible: boolean
  expanded: boolean
}

let notifMaxId: number = 0

export const useNotificationsStore = defineStore('Notifications', {
  state: (): NotificationsState => {
    return {
      notifications: [],
      /** temporary here, probably should be a local variable in the notifications component */
      visible: true,
      /** temporary here, probably should be a local variable in the notifications component */
      expanded: true
    }
  },
  getters: {
    count: (state): number => (state.notifications ? state.notifications.length : 0)
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // increment() {
    //   this.count++
    // },
    add(notif: INotification): number | undefined {
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
    remove(notifId: number | undefined): void {
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
