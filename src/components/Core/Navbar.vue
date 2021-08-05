<template>
  <div class="flex justify-between items-center bg-tkt-black">
    <div class="ml-16">
      <router-link to="/">
        <img class="w-28 h-4.5" src="/trinket-logo.png">
      </router-link>
    </div>
    <div class="flex items-center mr-16">
      <Menu v-if="userIsAuthenticated" as="div" class="relative ml-12">
        <MenuButton class="text-white focus:outline-none">
          {{ user.username_riot }}
        </MenuButton>
        <MenuItems class="absolute p-2 mt-2 bg-white right-0 rounded">
          <MenuItem>
            <router-link to="/profile" custom v-slot="{ navigate }">
              <div role="link" class="w-full px-2 py-1 not-first:mt-1 rounded cursor-pointer select-none hover:(bg-tkt-black-bg-hover bg-opacity-10)" 
                   @click="navigate">
                {{ $t('navbar.profile') }}
              </div>
            </router-link>
          </MenuItem>
          <MenuItem>
            <div class="px-2 py-1 not-first:mt-1 rounded cursor-pointer select-none hover:(bg-tkt-black-bg-hover bg-opacity-10)"
                 @click="userLogout()">
              {{ $t('navbar.logout') }}
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
      <div v-if="!userIsAuthenticated" class="flex items-center">
        <router-link to="/signin">
          <button class="btn btn-secondary px-5 py-1.5" type="submit">{{ $t('navbar.signin') }}</button>
        </router-link>
        <router-link to="/signup">
          <button class="btn btn-primary px-5 py-2 ml-7.5" type="submit">{{ $t('navbar.signup') }}</button>
        </router-link>
      </div>
      <Menu as="div" class="relative ml-12">
        <MenuButton class="text-white focus:outline-none">
          {{ $t('navbar.language') }}
        </MenuButton>
        <MenuItems class="absolute p-2 w-24 mt-2 bg-white right-0 rounded">
          <MenuItem v-for="language in availableLocales" :key="language">
            <div class="px-2 py-1 not-first:mt-1 rounded cursor-pointer select-none hover:(bg-tkt-black-bg-hover bg-opacity-10)"
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
import { useStore } from 'vuex'
import { computed } from 'vue'

// User
const store = useStore()
const userIsAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const user = computed(() => store.state.auth.user)
const userLogout = () => store.dispatch('auth/logout')

// Languages
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