<script setup>
import { useUsersStore } from '@/stores/users';
import { useRouter } from 'vue-router';
import Notification from '@/models/notifications/Notification';
import { useNotificationsStore } from '@/stores/notifications';
import { NotifLevel } from '@/models/notifications/NotifLevel';

const usersStore = useUsersStore();
const notificationsStore = useNotificationsStore();
const router = useRouter();

const logout = () => {
  let firstName = usersStore.user.firstName;
  if (!firstName) {
    try {
      firstName = JSON.parse(JSON.parse(localStorage.loggedInUser)).firstName;
    } catch (ex) {
      firstName = 'Dear user';
    }
  }

  usersStore.user = undefined;
  localStorage.loggedInUser = null;
  notificationsStore.add(new Notification(`${firstName}, you have Successfully Logged Out.`, NotifLevel.SUCCESS));
  router.push({ name: 'home' });
};
</script>

<template>
  <div class="user-account">
    <div><h2>User Account Page</h2></div>
    <v-card class="user-account">
    <div v-if="usersStore.user">
      <h1>{{ usersStore.user?.firstName }}'s account</h1>
      <div>
        <span>E-mail: </span><span>{{ usersStore.user?.email }}</span>
      </div>
      <div>
        <span>First Name: </span><span>{{ usersStore.user?.firstName }}</span>
      </div>
      <div>
        <span>Last Name: </span><span>{{ usersStore.user?.lastName }}</span>
      </div>
    </div>
  </v-card>
    <div class="app-actions">
      <router-link to="/">
        <v-btn variant="outlined">Home</v-btn>
      </router-link>
      <v-btn color="#8155FF" variant="flat" @click="logout">Logout</v-btn>
    </div>
  </div>
</template>

<style scoped>
.app-actions{
  display: flex;
  gap: 20px;
}
.user-account {
  margin: 15px;
  padding: 15px;
}
</style>
