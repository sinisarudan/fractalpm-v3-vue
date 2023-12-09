<script setup>
import ProjectOverview from '@/components/projects/ProjectOverview.vue';
import { onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';
import { useProjectsStore } from '@/stores/projects';
import { useRouter } from 'vue-router';
import Notification from '@/models/notifications/Notification';
import { useNotificationsStore } from '@/stores/notifications';
import { NotifLevel } from '@/models/notifications/NotifLevel';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const projectsStore = useProjectsStore();
const usersStore = useUsersStore();
const notificationsStore = useNotificationsStore();

const createProject = () => {

};

onMounted(() => {
  if (usersStore.user) {
    projectsStore.getProjectsForUser(usersStore.user.entity_id);
  }
});

</script>

<template>
  <div class="projects">
    <div><h2>{{ $t('user.userAccount') }}</h2></div>
    <div
      v-if="usersStore.user"
      class="project-info"
    >
      <h1>{{ $t('user.nameAccount', { name: usersStore.user?.first_name}) }}</h1>
      <div class="info-field">
        projectsStore.projects: {{ projectsStore.projects }}
        <v-row>
          <v-col
            v-for="project in projectsStore.projects"
            :key="project.entity_id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <ProjectOverview :project="project" />
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
    <div class="app-actions">
      <v-btn
        v-if="usersStore.user"
        class="primary-button"
        variant="flat"
        @click="createProject"
      >
        Create a Project <!-- {{ $t('common.logout') }} -->
      </v-btn>
    </div>
  </div>
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
.projects {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 15px;
  padding: 15px;
  min-width: 400px;
  .project-info {
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
