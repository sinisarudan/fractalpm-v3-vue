<template>
  <div class="about">
    <h1>FractalPM</h1>
    <div>
      Organize all your projects in an easy way.
    </div>
    <div>
      Start managing your projects the right way.
    </div>
  </div>
</template>

<style lang="scss">
$mobile_breakpoint: 1024px;

@media (max-width: #{$mobile_breakpoint}) {
  .about {
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column; /* Stack items vertically */
    gap: 20px; /* Set the desired padding between items */
    align-items: center;
  }
}
</style>
