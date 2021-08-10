<template>
  <Navbar class="h-16" />
  <div v-if="loading" class="flex bg-tkt-black-bg" style="min-height: calc(100% - 4rem);">
    <router-view class="container mx-auto" style="min-height: inherit;" />
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const loading = ref(false)
onMounted( async () => {
  await store.dispatch('initApp')
  loading.value = true
})

</script>