<script setup>
import OrganizationOverview from '@/components/organizations/OrganizationOverview.vue';
import { onMounted, isProxy, toRaw } from 'vue';
import { useUsersStore } from '@/stores/users';
import { useOrganizationsStore } from '@/stores/organizations';
import { useRouter } from 'vue-router';
import Notification from '@/models/notifications/Notification';
import { useNotificationsStore } from '@/stores/notifications';
import { NotifLevel } from '@/models/notifications/NotifLevel';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const organizationsStore = useOrganizationsStore();
const usersStore = useUsersStore();
const notificationsStore = useNotificationsStore();

const createOrganization = () => {

};

onMounted(async () => {
  getOrganizationsForUser();
  if (usersStore.user) {
    organizationsStore.getOrganizationsForUser(usersStore.user.entity_id);
  }
});

const getOrganizationsForUser = async() => {
  if (usersStore.user) {
    const response = await organizationsStore.getOrganizationsForUser(usersStore.user.entity_id);;
    // const { responseToRef } = toRef(response);
    const responseRaw = isProxy(response) ? toRaw(response) : response;
    // if (response && response instanceof Organization[]) {
    if (typeof responseRaw !== 'string') {
      // const organizations = response;
    } else { // ERROR
      // we could also check if the `response` is one of the `ServerResponseUserServiceCode` codes by `if(Object.values(ServerResponseUserServiceCode).includes(response))`
      const title = i18n.t('Error in retrieving organizations');
      notificationsStore.add({ title, level: NotifLevel.ERROR });
    }
  }
}

</script>

<template>
  <div class="organizations">
    <div
      v-if="usersStore.user"
      class="organization-info"
    >
      <div class="fpm-title on-background-darken-1">
        <h1> {{ $t('organizations.myOrganizations', { name: usersStore.user?.first_name}) }}</h1>
        <div class="subtitle">
          {{ $t("organizations.all") }}
        </div>
      </div>
      <div class="app-actions">
        <v-btn
          v-if="usersStore.user"
          class="primary-button"
          variant="flat"
          @click="createOrganization"
        >
          Create a Organization <!-- {{ $t('common.logout') }} -->
        </v-btn>
      </div>
      <div class="organizations-list">
        <!-- organizationsStore.organizations: {{ organizationsStore.organizations }} -->
        <v-row>
          <v-col
            v-for="organization in organizationsStore.organizations"
            :key="organization.entity_id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="organization-col"
          >
            <OrganizationOverview :organization="organization" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div
      v-else
      class="info-field"
    >
      {{ $t('login.notLoggedIn') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../variables";
.organization-col {
  min-width: 300px;
}
h1 {
    //styleName: Hero/S;
    font-family: Manrope;
    font-size: 32px;
    font-weight: 800;
    line-height: 48px;
    letter-spacing: 0.30000001192092896px;
    text-align: left;
    // color: $main-color;
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
.organizations {
  gap: 20px;
  margin: 15px;
  padding: 15px;
  .organizations-list {
    margin-top: 15px;
    // padding-top: 15px;
  }
}
</style>
