<script setup>
import Organization from '@/models/organizations/Organization';
import { useNotificationsStore } from '@/stores/notifications';
import { onMounted } from 'vue';

const notifications = useNotificationsStore();

const props = defineProps({
  organization: {
    type: Organization,
    default: Organization.OrganizationInit
  }
});

onMounted(() => {
  // notifications.add({title: "NotifTitleWARNING", level: NotifLevel.WARNING});
  // notifications.add({title: "NotifTitleSUCCESS", level: NotifLevel.SUCCESS});
  // notifications.expanded = false;
});

</script>

<template>
  <v-card class="organization">
    <v-card-title><v-icon>mdi-package theme</v-icon>{{ props.organization.name }}</v-card-title>
    <v-card-subtitle>{{ props.organization.code }}</v-card-subtitle>

    <v-divider />

    <v-card-text>{{ props.organization.description }}</v-card-text>

    <v-divider />

    <v-list density="compact">
      <v-list-group>
        <v-list v-for="phase in props.organization.phases" :key="phase.entity_id">
          <v-list-title>{{ phase.name }}</v-list-title>
          <v-list-subtitle>{{ phase.description }}</v-list-subtitle>
        </v-list>
      </v-list-group>
    </v-list>

    <v-divider />

    <v-list density="compact">
      <v-list-group>
        <v-list v-for="attachment in props.organization.attachments" :key="attachment.entity_id">
          <v-list-title>{{ attachment.name }}</v-list-title>
          <v-list-subtitle>{{ attachment.type }}</v-list-subtitle>
        </v-list>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<style lang="scss" scoped>
.organization {
  // margin: 2px;
  // padding: 5px;
  // border: 1px black solid;
}
</style>
