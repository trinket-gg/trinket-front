<template>
  <Navbar :class="'h-' + heightNavbar" />
  <div class="bg-tkt-black-bg" :style="'min-height: calc(100% - ' + heightNavbar / 4 + 'rem);'">
    <router-view class="container mx-auto" />
  </div>
</template>

<script setup>
const heightNavbar = 16
</script>