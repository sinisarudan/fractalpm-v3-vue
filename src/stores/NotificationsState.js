/* 
TS-original:
export interface NotificationsState {
    notifications: Notification[]
    visible: boolean
    expanded: boolean
}

// Example usage
  const initialState = new NotificationsState([], true, false);
  
  console.log(initialState.notifications); // []
  console.log(initialState.visible);       // true
  console.log(initialState.expanded);      // false
  
*/

/**
 * Class representing the Pinia state of notifications.
 * @class
 */
export default class NotificationsState { 
  /**
   * An array of notifications.
   * @type {Notification[]}
   */
  notifications;

  // TODO: temporary here, probably should be a local variable in the notifications component
  /**
   * Indicates whether the notifications panel is visible.
   * @type {boolean}
   */
  visible;

  // TODO: temporary here, probably should be a local variable in the notifications component
  /**
   * Indicates whether the notifications panel is expanded.
   * @type {boolean}
   */
  expanded;

    /**
     * @param {Notification[]} notifications - An array of notifications.
     * @param {boolean} visible - Indicates whether the notifications panel is visible
     * @param {boolean} expanded - Indicates whether the notifications panel is expanded
     */
    constructor(notifications, visible, expanded) {
        this.notifications = notifications;
        this.visible = visible;
        this.expanded = expanded;
    }
  }