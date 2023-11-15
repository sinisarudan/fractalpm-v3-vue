/*
TS-original:
export interface INotification {
    title: string
    level: ENotifLevel
    id?: number
}

// Example usage
const myNotification = new Notification("New Message", "info", 1);

console.log(myNotification.title); // New Message
console.log(myNotification.level); // info
console.log(myNotification.id);    // 1
*/

/**
 * @typedef {Object} Notification
 * @property {string} title - The title of the notification.
 * @property {string} level - The notification level.
 * @property {number} [id] - (Optional) The unique identifier for the notification.
 */
export default class Notification {
    /**
     * @param {string} title - The title of the notification.
     * @param {string} level - The notification level.
     * @param {number} [id] - (Optional) The unique identifier for the notification.
     */
    constructor(title, level, id) {
      this.title = title;
      this.level = level;
      this.id = id;
    }
  }