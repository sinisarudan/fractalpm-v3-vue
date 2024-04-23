<script setup>
import Project from '@/models/projects/Project';
import { useNotificationsStore } from '@/stores/notifications';
import { onMounted } from 'vue';

const notifications = useNotificationsStore();

const props = defineProps({
  project: {
    type: Project,
    default: Project.ProjectInit
  }
});

onMounted(() => {
  // notifications.add({title: "NotifTitleWARNING", level: NotifLevel.WARNING});
  // notifications.add({title: "NotifTitleSUCCESS", level: NotifLevel.SUCCESS});
  // notifications.expanded = false;
});

</script>

<template>
  <v-card class="project">
    <div class="bg-secondary on-bg-secondary">
      <v-card-title><v-icon>mdi-package theme</v-icon>{{ props.project.name }}</v-card-title>
      <v-card-subtitle>code: {{ props.project.code }}</v-card-subtitle>
    </div>

    <v-divider />

    <v-card-text>
      {{ props.project.description }}

      <v-divider />
      <div class="section-title">
        Phases:
      </div>
      <v-list v-if="props.project.phases && props.project.phases.length>0">
        <v-list-group>
          <v-list v-for="phase in props.project.phases" :key="phase.entity_id">
            <v-list-item-title>{{ phase.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ phase.description }}</v-list-item-subtitle>
          </v-list>
        </v-list-group>
      </v-list>
      <div v-else>
        {{ $t('The project has no added phases') }}
      </div>

      <v-divider />
      <div class="section-title">
        Attachments:
      </div>
      <v-list v-if="props.project.attachments && props.project.attachments.length>0">
        <v-list-group>
          <v-list v-for="attachment in props.project.attachments" :key="attachment.entity_id">
            <v-list-item-title>{{ attachment.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ attachment.type }}</v-list-item-subtitle>
          </v-list>
        </v-list-group>
      </v-list>
      <div v-else>
        {{ $t('The project has no added attachments') }}
      </div>
    </v-card-text>

    <v-divider />

    <v-divider />
  </v-card>
</template>

<style lang="scss" scoped>
.project {
  // margin: 2px;
  // padding: 5px;
  // border: 1px black solid;
  .section-title {
    margin-top: 10px;
    font-weight: bolder;
    font-size: 18px;
  }
}
</style>
