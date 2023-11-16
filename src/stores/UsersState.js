/**
 * Represents the Pinia state of users.
 * @class
 */
class UsersState {
    /**
     * The user information or undefined if not available.
     * @type {Person | undefined}
     */
    user;
  
   /**
   * @param {Person | undefined} user - The user information or undefined if not available.
   */
  constructor(user) {
    this.user = user;
  }
}