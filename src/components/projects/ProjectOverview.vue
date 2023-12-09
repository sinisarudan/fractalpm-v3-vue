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
  <div class="project">
    {{ props.project.name }}
  </div>
</template>

<style lang="scss" scoped>
.project {
  margin: 2px;
  border: 1px black solid;
}
</style>
