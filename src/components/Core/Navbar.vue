<template>
  <div class="flex justify-between items-center h-14" bg="tkt-black">
    <div class="ml-16">
      <router-link to="/">
        <img class="w-28 h-4.5" src="/trinket-logo.png">
      </router-link>
    </div>
    <div class="mr-16">
      <select v-model="languageSelected" @change="changeLocaleLanguage()" class="form-input select-input w-18">
        <option v-for="language in availableLocales" :key="language">
          {{ language }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>

import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n/index'
import { useLocalStorage } from '@vueuse/core'

onMounted(() => changeLocaleLanguage())

const { locale, availableLocales } = useI18n({ useScope: 'global' })
const navigatorLanguage = navigator.language.split('-')[0]
const defaultLanguage = availableLocales.some(lang => lang === navigatorLanguage) ? navigatorLanguage : locale.value
const languageSelected = useLocalStorage('trinket_language', defaultLanguage)

const changeLocaleLanguage = () => locale.value = languageSelected.value

</script>