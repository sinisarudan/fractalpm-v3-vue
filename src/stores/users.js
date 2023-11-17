import { defineStore } from 'pinia';
import { UserService } from '@/services/UserService';
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
     * @name register
     * @param {Person} user - The user to register.
     * @returns {(Promise<Person | undefined>)} A promise that resolves to the registered user or undefined if registration fails.
     * @description Asynchronously registers a new user and returns a promise that resolves to the registered user or undefined if registration fails.
     */
    async register (user) {
      try {
        const serverUser = await UserService.register(user);
        if (serverUser) {
          this.user = serverUser;
        }
        return serverUser;
      } catch (error) {
        console.error('Register error:', error);
        const notificationsStore = useNotificationsStore();
        notificationsStore.add({ title: 'Register error', level: NotifLevel.ERROR });
        return undefined;
      }
    }
  }
});
