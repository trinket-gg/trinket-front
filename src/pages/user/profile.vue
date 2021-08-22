<template>
  <div class="flex flex-col pt-20">
    <div class="flex items-center">
      <img class="h-26 w-26 rounded-full" :src="'https://ddragon.leagueoflegends.com/cdn/' + $store.state.versionDddragonLol + '/img/profileicon/' + user.riot_summoner.profileIconId + '.png'"/>
      <h1 class="text-5xl text-white font-semibold ml-8 mr-4">{{ user.riot_summoner.name }}</h1>
      <SvgIcon v-if="user.riotAccountValidate" class="text-green-500 h-9 w-9" name="check-circle" />
      <SvgIcon v-else class="text-red-500 h-9 w-9" name="close-circle" />
    </div>
    <form class="flex flex-col" @submit.prevent="onSubmit">
      <div class="flex">
        <div class="flex flex-col mt-4 w-1/2 mr-4">
          <label for="email" class="text-tkt-text-primary">{{ $t('form.email.label') }}</label>
          <input class="form-input text-input" v-model="email" autocomplete="email"
                 type="text" :placeholder="$t('form.email.placeholder')" >
          <span v-if="emailError" class="mt-2 text-red-600">
            {{ $t(`form.errors.${emailError.key}`, emailError.values) }}
          </span>
        </div>
        <div class="flex flex-col mt-4 w-1/2">
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
    <div v-if="!user.riotAccountValidate" class="flex flex-col mt-12">
      <h1 class="text-xl text-tkt-text-primary mb-4">Veuillez verifier votre compte league of legends :</h1>
      <div class="flex justify-center items-center w-max px-20 py-6 bg-tkt-black rounded-xl text-white">
        {{ randomString }}
      </div>
      <span v-if="verifyCodeError" class="mt-2 text-red-600">
        {{ $t(`form.errors.${verifyCodeError}`) }}
      </span>
      <button :class="verifyCodeError ? 'mt-2' : 'mt-6'" class="btn btn-primary w-max p-3 text-xl" @click="verifyRiotCode">
        {{ $t('profile.verifyCode') }}
      </button>
    </div>
  </div>
</template>

<script setup>

import { computed, inject, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { object, string, date } from 'yup'

const store = useStore()
const axios = inject('axios')
const user = computed(() => store.getters['auth/getUser'])

// Code riot verification
const verifyCodeError = ref(null)
const randomString = Math.random().toString(36).substring(2, 15);

const verifyRiotCode = async () => {
  try {
    await axios.post(`/users/verifyRiotCode/${user.value._id}`, { generatedCode: randomString })
    await store.dispatch('initApp')
  } catch (e) {
    if (e.response.data) verifyCodeError.value = e.response.data
  }
}

// Signup
const loading = ref(false)
const signupError = ref(null)

const schemaSignup = object({
  email: string().required().email(),
  birthdate: date().required()
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
const { value: birthdate, errorMessage: birthdateError } = useField('birthdate', [], { initialValue: user.value.birthdate.split('T')[0] })

</script>