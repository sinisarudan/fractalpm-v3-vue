import { defineStore } from 'pinia';
import { UserService } from '@/services/UserService';
import type { Person } from '@/models/users/users-vos';

import { useNotificationsStore } from '@/stores/notifications';
import { ENotifLevel } from '@/models/notifications/notifications-vos';

interface UsersState {
  user: Person | undefined
}

export const useUsersStore = defineStore('Users', {
  state: (): UsersState => {
    return { user: undefined }
  },

  actions: {
    async login(user: Person): Promise<Person | undefined> {
      try {
        const serverUser: Person = await UserService.login(user);
        this.user = serverUser;
        return this.user;
      } catch (error) {
        console.error('Login error:', error);
        const notificationsStore = useNotificationsStore();
        notificationsStore.add({ title: "Login error", level: ENotifLevel.ERROR });
        return undefined;
      }
    },
    async register(user: Person): Promise<Person | undefined> {
      try {
        const serverUser: Person = await UserService.register(user);
        this.user = serverUser;
        return this.user;
      } catch (error) {
        console.error('Register error:', error);
        const notificationsStore = useNotificationsStore();
        notificationsStore.add({ title: "Register error", level: ENotifLevel.ERROR });
        return undefined;
      }
    },
  }
})
