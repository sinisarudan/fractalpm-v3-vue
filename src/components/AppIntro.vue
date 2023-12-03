<script setup>
// import { useTheme } from 'vuetify';
// const theme = useTheme();
import { useDark } from '@vueuse/core';
const isDark = useDark();
</script>

<template>
  <div :class="{intro: true, 'dark-intro': isDark}">
    <!-- <div>
        <img class="intro-image" src="/assets/app-intro-image.jpg" alt="Organize all your projects in an easy way." />
    </div> -->
    <div class="welcome on-background-darken-1">
      <h1>{{ $t("application.organizeProjects") }}</h1>
      <div class="description">
        {{ $t("login.submessage") }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dark-intro {
  background-image: url('/assets/app-intro-image-dark.png') !important;
  background-size: 748px 704px !important;
}
.intro {
    min-width: 879px;
    min-height: 1000px;
    // background-image: url(isDark ? '/assets/app-intro-image-dark.jpg' : '/assets/app-intro-image.jpg');
    background-image: url('/assets/app-intro-image.jpg');
    background-size: 879px 677px;
    background-position: bottom right;
    // background-attachment: fixed;
    // border: 1px solid black;
    .welcome {
        margin-left: 96px;
        padding-top: 150px;
        text-align: left;
        width: 472px;
        h1 {
            font-family: Manrope;
            font-size: 40px;
            font-weight: 800;
            line-height: 56px;
            letter-spacing: 0.20000000298023224px;
            text-align: left;
        }
        .description {
            //styleName: UI/Text/M/Regular;
            font-family: Inter;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: 0px;
            text-align: left;
        }
    }
}
</style>
