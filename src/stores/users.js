import { defineStore } from 'pinia';
import { UserService, ServerResponseUserServiceCode } from '@/services/UserService';
import { ServerResponse } from '@/services/ServerResponse';
import Person from '@/models/users/Person';
import { UsersState } from './UsersState';

import { useNotificationsStore } from '@/stores/notifications';
import { NotifLevel } from '@/models/notifications/NotifLevel';

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
        const notificationsStore = useNotificationsStore();
        notificationsStore.add({ title: 'Login error', level: NotifLevel.ERROR });
        return undefined;
      }
    },

    /**
     * @function
     * @name signup
     * @param {Person} user - The user to signup.
     * @param {boolean} [sendConfirmationEmail = true] - if true, the confirmation email is created (default: true).
     * @returns {(Promise<Person | undefined>)} A promise that resolves to the registered user or undefined if registration fails.
     * @description Asynchronously registers a new user and returns a promise that resolves to the registered user or undefined if registration fails.
     */
    async signup (user, sendConfirmationEmail = true) {
      const notificationsStore = useNotificationsStore();
      /**
       * @type {ServerResponse}
       */
      const response = await UserService.signup(user, sendConfirmationEmail);
      if (response.status) {
        this.user = response.data;
      } else {
        let title = 'Signup error';
        if (response.code === ServerResponseUserServiceCode.EMAIL_EXISTS) {
          title = 'Email already exists.';
        }
        notificationsStore.add({ title, level: NotifLevel.ERROR });
      }
      return this.user;
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
      const notificationsStore = useNotificationsStore();
      /**
       * @type {ServerResponse}
       */
      const response = await UserService.confirmEmail(uid, token, password);
      if (response.status) {
        this.user = response.data;
      } else {
        const title = 'Confirm Email Error';
        // if (response.code === ServerResponseUserServiceCode.EMAIL_EXISTS) {
        //   title = 'Email already exists.';
        // }
        notificationsStore.add({ title, level: NotifLevel.ERROR });
        this.user = undefined;
      }
      return this.user;
    }
  }
});
