<script setup>
import { Organization } from '@/models/organizations/Organization';
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

const limitString = (input, maxLength = 150) => {
  if (!input || input.length <= maxLength) {
    return input;
  } else {
    return input.substring(0, maxLength - 3) + '...';
  }
};

</script>

<template>
  <v-card class="organization">
    <v-card-title class="bg-secondary">
      <v-icon>mdi-package theme</v-icon>{{ props.organization.name }}
    </v-card-title>
    <v-card-subtitle>{{ props.organization.code }}</v-card-subtitle>

    <v-divider />

    <v-card-text>{{ limitString(props.organization.description) }}</v-card-text>

    <v-divider />
  </v-card>
</template>

<style lang="scss" scoped>
.organization {
  // margin: 2px;
  // padding: 5px;
  // border: 1px black solid;
}
</style>
