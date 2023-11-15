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
 * @typedef {Object} NotificationsState
 * @property {Notification[]} notifications - An array of notifications.
 * @property {boolean} visible - Indicates whether the notifications are visible (TODO: temporary here, probably should be a local variable in the notifications component).
 * @property {boolean} expanded - Indicates whether the notifications are expanded  (TODO: temporary here, probably should be a local variable in the notifications component).
 */
export default class NotificationsState {
    /**
     * @param {Notification[]} notifications - An array of notifications.
     * @param {boolean} visible - Indicates whether the notifications are visible
     * @param {boolean} expanded - Indicates whether the notifications are expanded
     */
    constructor(notifications, visible, expanded) {
        this.notifications = notifications;
        // TODO: temporary here, probably should be a local variable in the notifications component
        this.visible = visible;
        // TODO: temporary here, probably should be a local variable in the notifications component
        this.expanded = expanded;
    }
  }