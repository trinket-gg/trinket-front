<template>
  <div class="flex flex-col pt-20">
    <div class="flex items-center">
      <img class="h-26 w-26 rounded-full" :src="'https://ddragon.leagueoflegends.com/cdn/' + $store.state.versionDddragonLol + '/img/profileicon/' + user.riot_summoner.profileIconId + '.png'"/>
      <h1 class="text-5xl text-white font-semibold ml-8">{{ user.riot_summoner.name }}</h1>
    </div>
    <form class="flex flex-col" @submit.prevent="onSubmit">
      <div class="flex">
        <div class="flex flex-col mt-4 w-1/2">
          <label for="email" class="text-tkt-text-primary">{{ $t('form.email.label') }}</label>
          <input class="form-input text-input" v-model="email" autocomplete="email"
                 type="text" :placeholder="$t('form.email.placeholder')" >
          <span v-if="emailError" class="mt-2 text-red-600">
            {{ $t(`form.errors.${emailError.key}`, emailError.values) }}
          </span>
        </div>
        <div class="flex flex-col mt-4 w-1/2 ml-4">
          <label for="username_lol" class="text-tkt-text-primary">{{ $t('form.username.label') }} (League of Legends)</label>
          <input class="form-input text-input" v-model="username_riot" 
                 type="text" :placeholder="$t('form.username.placeholder')" >
          <span v-if="usernameRiotError" class="mt-2 text-red-600">
            {{ $t(`form.errors.${usernameRiotError.key}`, usernameRiotError.values) }}
          </span>
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col w-1/4 mt-4">
          <label for="birthday" class="text-tkt-text-primary">{{ $t('form.birthdate.label') }}</label>
          <input class="form-input text-input" v-model="birthdate" type="date" >
          <span v-if="birthdateError" class="mt-2 text-red-600">
            {{ $t(`form.errors.${birthdateError.key}`, birthdateError.values) }}
          </span>
        </div>
      </div>
      <div class="flex w-full mt-6">
        <span v-if="signupError" class="self-end mb-2 text-red-600">
          {{ $t('form.errors.login') }}
        </span>
        <button class="btn btn-primary p-3 text-xl justify-self-end" type="submit">
          <template v-if="!loading">
            {{ $t('profile.submit') }}
          </template>
          <template v-else>
            <SvgIcon class="animate-spin h-5 w-5 my-1" name="loader"/>
          </template>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>

import { computed, inject, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import * as yup from 'yup';

const store = useStore()
const user = computed(() => store.getters['auth/getUser'])
const axios = inject('axios')
const router = useRouter()
const loading = ref(false)
const signupError = ref(null)

const schemaSignup = yup.object({
  email: yup.string().required().email(),
  username_riot: yup.string().required(),
  birthdate: yup.date().required()
})

const { handleSubmit } = useForm({ validationSchema: schemaSignup })

const onSubmit = handleSubmit( async (values) => {
  loading.value = true
  try {
    await axios.patch(`/users/${user.value._id}`, values)
    await store.dispatch('initApp')
    username_riot.value = user.value.riot_summoner.name
  } catch (e) {
    signupError.value = e.response.data
  }
  loading.value = false
})

const { value: email, errorMessage: emailError } = useField('email', [], { initialValue: user.value.email })
const { value: username_riot, errorMessage: usernameRiotError } = useField('username_riot', [], { initialValue: user.value.riot_summoner.name })
const { value: birthdate, errorMessage: birthdateError } = useField('birthdate', [], { initialValue: user.value.birthdate.split('T')[0] })

</script>