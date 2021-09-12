<template>
  <div class="flex justify-between items-center bg-tkt-black">
    <div class="ml-16">
      <router-link to="/">
        <img class="w-28 h-4.5" src="/trinket-logo.png">
      </router-link>
    </div>
    <div class="flex items-center mr-16">
      <template v-if="userIsAuthenticated">
        <router-link to="/" class="text-white text-sm font-medium">
          {{ $t('navbar.home') }}
        </router-link>
        <router-link to="/dashboard" class="text-white text-sm font-medium ml-6">
          {{ $t('navbar.dashboard') }}
        </router-link>
      </template>
      <Menu as="div" class="relative ml-6">
        <MenuButton class="flex items-center bg-tkt-black-bg-light rounded-full p-2 focus:outline-none">
          <SvgIcon class="text-white h-4 w-4" name="language" />
        </MenuButton>
        <MenuItems class="absolute p-2 mt-3 right-0 bg-white rounded">
          <MenuItem v-for="language in availableLocales" :key="language">
            <div :class="[language === locale ? 'bg-tkt-primary bg-opacity-45' : 'hover:(bg-tkt-black-bg-hover bg-opacity-10)']"
                class="flex items-center px-2 py-1 not-first:mt-1 rounded cursor-pointer select-none"
                @click="changeLocaleLanguage(language)">
              {{ languages[language] }}
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
      <Menu v-if="userIsAuthenticated" as="div" class="relative ml-6">
        <MenuButton class="flex items-center text-white focus:outline-none">
          <img class="h-10 w-10 rounded-full" :src="userProfileIcon" />
        </MenuButton>
        <MenuItems class="absolute p-2 mt-2 bg-white right-0 rounded">
          <MenuItem as="div" class="flex" >
            <router-link to="/user/profile" 
                        class="w-full px-2 py-1 not-first:mt-1 rounded cursor-pointer select-none hover:(bg-tkt-black-bg-hover bg-opacity-10)">
              {{ $t('navbar.profile') }}
            </router-link>
          </MenuItem>
          <MenuItem as="div" class="px-2 py-1 not-first:mt-1 rounded cursor-pointer select-none hover:(bg-tkt-black-bg-hover bg-opacity-10)"
                    @click="userLogout()">
            {{ $t('navbar.logout') }}
          </MenuItem>
        </MenuItems>
      </Menu>
      <div v-if="!userIsAuthenticated" class="flex items-center ml-6">
        <router-link to="/signin">
          <button class="btn btn-secondary px-5 py-1.5" type="submit">{{ $t('navbar.signin') }}</button>
        </router-link>
        <router-link to="/signup">
          <button class="btn btn-primary px-5 py-2 ml-6" type="submit">{{ $t('navbar.signup') }}</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useLocalStorage } from '@vueuse/core'

// User
const store = useStore()
const userIsAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const userProfileIcon = computed(() => store.getters['getProfileIcon'])
const userLogout = () => store.dispatch('auth/logout')

// Languages
onMounted( async () => locale.value = selectedLanguage.value)
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