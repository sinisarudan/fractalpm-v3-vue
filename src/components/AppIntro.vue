<script setup>
</script>

<template>
  <div class="intro">
    <!-- <div>
        <img class="intro-image" src="/assets/app-intro-image.jpg" alt="Organize all your projects in an easy way." />
    </div> -->
    <div class="welcome">
      <h1>Organize all your projects in an easy way.</h1>
      <div class="description">
        Start managing your projects the right way.
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro {
    min-width: 879px;
    min-height: 1000px;
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
