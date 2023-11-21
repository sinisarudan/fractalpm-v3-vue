<script setup>
import AppLayoutWithIntro from '@/components/AppLayoutWithIntro.vue';
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
  <AppLayoutWithIntro>
    <div class="user-account">
      <div><h2>User Account Page</h2></div>
      <div
        v-if="usersStore.user"
        class="info"
      >
        <h1>{{ usersStore.user?.firstName }}'s account</h1>
        <div class="info-field">
          <span>E-mail: </span><span>{{ usersStore.user?.email }}</span>
        </div>
        <div class="info-field">
          <span>First Name: </span><span>{{ usersStore.user?.firstName }}</span>
        </div>
        <div class="info-field">
          <span>Last Name: </span><span>{{ usersStore.user?.lastName }}</span>
        </div>
      </div>
      <div
        v-else
        class="info-field"
      >
        You are not logged in.
      </div>
      <div class="app-actions">
        <router-link to="/">
          <v-btn
            class="primary-button"
            variant="outlined"
          >
            Home
          </v-btn>
        </router-link>
        <v-btn
          v-if="usersStore.user"
          class="primary-button"
          variant="flat"
          @click="logout"
        >
          Logout
        </v-btn>
      </div>
    </div>
  </AppLayoutWithIntro>
</template>

<style lang="scss" scoped>
@import "../variables";
h1 {
    //styleName: Hero/S;
    font-family: Manrope;
    font-size: 32px;
    font-weight: 800;
    line-height: 48px;
    letter-spacing: 0.30000001192092896px;
    text-align: left;
    color: $main-color;
  }
  h2 {
    //styleName: UI/Text/M/Regular;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: $secondary-color;
  }
.app-actions{
  display: flex;
  gap: 20px;
}
.user-account {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 15px;
  padding: 15px;
  min-width: 400px;
  .info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    justify-content: space-evenly;
    .info-field {
      background-color: lightblue;
      padding: 10px;
      border-radius: 12px;
      width: 100%;
    }
  }
}
</style>
