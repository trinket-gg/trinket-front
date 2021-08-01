<template>
  <h1>Message dynamique : {{ msg }}</h1>
</template>

<script setup>

defineProps({ msg: String })

</script>