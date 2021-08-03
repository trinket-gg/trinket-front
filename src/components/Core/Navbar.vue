<template>
  <div class="flex justify-between items-center h-14" bg="tkt-black">
    <div class="ml-16">
      <img class="w-28 h-4.5" src="/trinket-logo.png">
    </div>
    <div class="mr-16">
      <select v-model="languageSelected" class="form-input select-input w-18">
        <option v-for="language in languages" :key="language">
          {{ language }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>

import { useI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'

const { locale } = useI18n({ useScope: 'global' })
const languages = ['fr', 'en']
const languageSelected = useLocalStorage('trinket_language', locale)

</script>