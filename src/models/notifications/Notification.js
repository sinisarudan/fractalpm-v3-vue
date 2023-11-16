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
 * @class
 */
export default class Notification {
  /**
   * The title of the notification.
   * @type {string}
   */
  title;

  /**
   * The notification level.
   * @type {ENotifLevel}
   */
  level;

  /**
   * The unique identifier for the notification.
   * @type {number | undefined}
   */
  id;

  /**
   * Creates a new instance of the Notification class.
   * @param {string} title - The title of the notification.
   * @param {ENotifLevel} level - The notification level.
   * @param {number | undefined} [id] - (Optional) The unique identifier for the notification.
   */
  constructor(title, level, id = undefined) {
    this.title = title;
    this.level = level;
    this.id = id;
  }
}