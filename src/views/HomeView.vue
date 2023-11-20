<script setup>
import AppLayoutWithIntro from '@/components/AppLayoutWithIntro.vue';
// console.log("HomeView");
</script>

<template>
    <AppLayoutWithIntro>
      <div class="home"></div>
    </AppLayoutWithIntro>
</template>

<style lang="scss">
$mobile_breakpoint: 1024px;
.home {
    text-align: left;
  }

@media (max-width: #{$mobile_breakpoint}) {
  .home {
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column; /* Stack items vertically */
    gap: 20px; /* Set the desired padding between items */
    align-items: center;
  }
}
</style>
