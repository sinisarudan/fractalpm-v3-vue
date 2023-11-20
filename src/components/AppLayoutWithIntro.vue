<script setup>
import AppIntro from '@/components/AppIntro.vue';
</script>

<template>
   <div class="container vertical-center">
    <div class="app-intro">
      <AppIntro />
    </div>
    <div class="right-component">
      <slot />
      </div>
    </div>
</template>

<style lang="scss">

.container {
  display: flex;
  flex-direction: row;
  flex: 1;
  .right-component {
    margin-left: 80px;
    margin-right: 20px;
    width: 438px !important;
    padding: 0px, 0px, 17px, 0px;
  }
}
.app-intro {
  @media (max-width: 1024px) {
    display: none;
  }
}
</style>
<style lang="scss" scoped></style>
