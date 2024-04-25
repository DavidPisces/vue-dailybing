<script setup>

import { ref } from 'vue';
import BingWallpaper from './components/BingWallpaper.vue';


</script>

<template>
  <header>
    <button class="glowButton">关于 DailyBing</button>
  </header>
  <main>
    <BingWallpaper :idx="idx" id="wallpaper" />
  </main>
</template>


<style scoped>
#wallpaper {
  width: 100%;
  /* height: 100vh; */
  opacity: 1;
  transition: 0.5s;
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  width: 100%;
  height: fit-content;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
