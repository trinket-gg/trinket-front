<template>
  <div class="flex justify-between items-center h-14" bg="tkt-black">
    <div class="ml-16">
      <router-link to="/">
        <img class="w-28 h-4.5" src="/trinket-logo.png">
      </router-link>
    </div>
    <div class="mr-16">
      <Menu as="div" class="relative">
        <MenuButton class="text-white focus:outline-none">
          {{ $t('navbar.language') }}
        </MenuButton>
        <MenuItems class="absolute p-2 w-24 mt-2 bg-white right-0 rounded">
          <MenuItem v-for="language in availableLocales" :key="language">
            <div class="px-2 py-1 not-first:mt-1 rounded cursor-pointer hover:(bg-tkt-black-bg-hover bg-opacity-10)"
                 @click="changeLocaleLanguage(language)">
              {{ languages[language] }}
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useI18n } from 'vue-i18n/index'
import { useLocalStorage } from '@vueuse/core'

const languages = { en: 'English', fr: 'Français' }
const { locale, availableLocales } = useI18n({ useScope: 'global' })
const navigatorLanguage = navigator.language.split('-')[0]
const defaultLanguage = availableLocales.some(lang => lang === navigatorLanguage) ? navigatorLanguage : locale.value
const selectedLanguage = useLocalStorage('trinket_language', defaultLanguage)

const changeLocaleLanguage = (language) => {
  locale.value = language
  selectedLanguage.value = language
}

</script>