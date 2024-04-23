<script setup>
import ProjectOverview from '@/components/projects/ProjectOverview.vue';
import { onMounted, isProxy, toRaw, ref, computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useUsersStore } from '@/stores/users';
import { useProjectsStore } from '@/stores/projects';
import { useRouter } from 'vue-router';
import Notification from '@/models/notifications/Notification';
import { useNotificationsStore } from '@/stores/notifications';
import { NotifLevel } from '@/models/notifications/NotifLevel';
import { useI18n } from 'vue-i18n';
import Project from '@/models/projects/Project';
import ProjectDetailed from '@/components/projects/ProjectDetailed.vue';

const { mobile } = useDisplay();

const i18n = useI18n();

const projectsStore = useProjectsStore();
const usersStore = useUsersStore();
const notificationsStore = useNotificationsStore();

/**
 * @type {import('vue').Ref<Project>}
 */
const projectDetailed = ref();

const projectDetailedShow = computed({
  get: () => !!projectDetailed.value,

  /**
   * @type {import('vue').Ref<boolean>}
   */
  set: (val) => {
    projectDetailed.value = (val ? val : undefined);
  }
});

const createProject = () => {
  notificationsStore.add({ title: 'Projects creation is not supported yet', level: NotifLevel.INFO });
};


onMounted(async () => {
  getProjectsForUser();
  if (usersStore.user) {
    await projectsStore.getProjectsForUser(usersStore.user.entity_id);
  }
});

const getProjectsForUser = async () => {
  if (usersStore.user) {
    const response = await projectsStore.getProjectsForUser(usersStore.user.entity_id); ;
    // const { responseToRef } = toRef(response);
    const responseRaw = isProxy(response) ? toRaw(response) : response;
    // if (response && response instanceof Project[]) {
    if (typeof responseRaw !== 'string') {
      // const projects = response;
    } else { // ERROR
      // we could also check if the `response` is one of the `ServerResponseUserServiceCode` codes by `if(Object.values(ServerResponseUserServiceCode).includes(response))`
      const title = i18n.t('Error in retrieving projects');
      notificationsStore.add({ title, level: NotifLevel.ERROR });
    }
  }
};

/**
 * @function
 * @name showProject
 * @param {Project} project
 */
const showProject = (project) => {
  console.log(`[showProject] ${project.name}`, project);
  projectDetailed.value = project;
};

const hideProjectDetailed = () => {
  projectDetailed.value = undefined;
};

</script>

<template>
  <div class="projects">
    <div
      v-if="usersStore.user"
      class="project-info"
    >
      <div class="fpm-title on-background-darken-1">
        <h1> {{ $t('projects.myProjects', { name: usersStore.user?.first_name}) }}</h1>
        <div class="subtitle">
          {{ $t("projects.all") }}
        </div>
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
      <div class="projects-list">
        <!-- projectsStore.projects: {{ projectsStore.projects }} -->
        <v-row>
          <v-col
            v-for="project in projectsStore.projects"
            :key="project.entity_id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="project-col"
          >
            <ProjectOverview :project="project" @click="showProject(project)" />
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
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="projectDetailedShow"
          :fullscreen="mobile"
          :max-width="mobile ? 'none' : '1000px'"
          data-testid="login-details-show-dialog"
        >
          <ProjectDetailed :project="projectDetailed" />
          <v-btn
            size="xs"
            color="transparent"
            variant="flat"
            icon
            class="close-button"
            @click="hideProjectDetailed"
          >
            <v-icon color="white">
              mdi-close
            </v-icon>
          </v-btn>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "../variables";
.project-col {
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
.projects {
  gap: 20px;
  margin: 15px;
  padding: 15px;
  .projects-list {
    margin-top: 15px;
    // padding-top: 15px;
  }
}
</style>
