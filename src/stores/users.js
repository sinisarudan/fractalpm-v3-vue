import { defineStore } from 'pinia';
import { UserService, ServerResponseUserServiceCode } from '@/services/UserService';
import { ServerResponse } from '@/services/ServerResponse';
import Person from '@/models/users/Person';
import { UsersState } from './UsersState';

export const useUsersStore = defineStore('Users', {
  /**
   * Returns a new instance of the UsersState class with default values.
   * @function
   * @name state
   * @returns {UsersState} A new instance of UsersState.
   * @description Returns a new `UsersState` with default values.
   */
  state: () => {
    return { user: undefined };
  },

  actions: {
    /**
   * @function
   * @name login
   * @param {Person} user - The user to log in.
   * @returns {(Promise<Person | undefined>)} A promise that resolves to the logged-in user or `undefined` if login fails.
   * @description Asynchronously logs in a user and returns a promise that resolves to the logged-in user or `undefined` if login fails.
   */
    async login (user) {
      try {
        const serverUser = await UserService.login(user);
        if (serverUser) {
          this.user = serverUser;
        }
        return serverUser;
      } catch (error) {
        console.error('Login error:', error);
        return undefined;
      }
    },

    /**
     * @function
     * @name signup
     * @param {Person} user - The user to signup.
     * @param {boolean} [sendConfirmationEmail = true] - if true, the confirmation email is created (default: true).
     * @returns {(Promise<Person | string>)} A promise that resolves to the registered user or error code (from `ServerResponseUserServiceCode`) if registration fails.
     * @description Asynchronously registers a new user and returns a promise that resolves to the registered user or undefined if registration fails.
     */
    async signup (user, sendConfirmationEmail = true) {
      /**
       * @type {ServerResponse}
       */
      const response = await UserService.signup(user, sendConfirmationEmail);
      if (response.status) {
        this.user = response.data;
        return this.user;
      } else {
        if (response.code === ServerResponseUserServiceCode.EMAIL_EXISTS) {
          return response.code;
        }
        return ServerResponseUserServiceCode.SIGNUP_ERROR;
      }
    },
    /**
     * Sends an OTP code to the specified email address.
     *
     * @param {string} phoneEmail - The phone number or email address to which the OTP code will be sent.
     * @returns {Promise<boolean>} A promise that resolves to `true` if the OTP code is successfully sent, otherwise `false`.
     */
    async sendOTPCode (phoneEmail) {
      console.log('[usersStore::sendOTPCode]', phoneEmail);
      if (phoneEmail) {
        // TODO: to be done
        return true;
      }
      return false;
    },
    /**
   * checks the validity of a code for a given phone number or email address.
   *
   * @param {string} code - The code to be validated.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the code is valid, otherwise `false`.
   */
    async checkCodeValidity (code) {
      console.log('[checkCodeValidity]', code);
      if (code) {
        // TODO: to be done ... To be paired with saved `phoneEmail` etc
        return code === '1234';
      }
      return false;
    },
    /**
   * checks the validity of a code for a given phone number or email address.
   *
   * @param {string} uid - user uid
   * @param {string} token - The token to be validated.
   * @param {string} [password = undefined] - optional - if provided confirmation will also set password.
   * @returns {Promise<Person | undefined>} A promise that resolves to `Person` whose token is checked, otherwise to `undefined`.
   */
    async confirmEmail (uid, token, password = undefined) {
      console.log('[users/Store::confirmEmail]', uid, token, password);
      /**
       * @type {ServerResponse}
       */
      const response = await UserService.confirmEmail(uid, token, password);
      if (response.status) {
        this.user = response.data;
      } else {
        this.user = undefined;
      }
      return this.user;
    }
  }
});
