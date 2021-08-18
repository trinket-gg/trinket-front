<template>
  <div class="flex flex-col lg:flex-row justify-center items-center">
    <div class="flex justify-center items-center w-2/3 lg:w-1/2 relative">
      <img src="/group-images-create-account.svg">
    </div>
    <div class="flex flex-col lg:px-15 xl:px-25 w-2/3 lg:w-1/2 my-12 lg:my-0">
      <h1 class="text-3xl text-white font-bold">{{ $t('signup.main-title') }}</h1>
      <form class="flex flex-col" @submit.prevent="onSubmit">
        <div class="flex flex-col mt-4">
          <label for="email" class="text-tkt-text-primary">{{ $t('form.email.label') }}</label>
          <input class="form-input text-input" v-model="email" autocomplete="email"
                 type="text" :placeholder="$t('form.email.placeholder')" >
          <span v-if="emailError" class="mt-2 text-red-600">
            {{ $t(`form.errors.${emailError.key}`, emailError.values) }}
          </span>
        </div>
        <div class="flex flex-col mt-4">
          <label for="username_lol" class="text-tkt-text-primary">{{ $t('form.username.label') }} (League of Legends)</label>
          <input class="form-input text-input" v-model="username_riot" 
                 type="text" :placeholder="$t('form.username.placeholder')" >
          <span v-if="usernameRiotError" class="mt-2 text-red-600">
            {{ $t(`form.errors.${usernameRiotError.key}`, usernameRiotError.values) }}
          </span>
        </div>
        <div class="flex flex-col mt-4">
          <label for="birthday" class="text-tkt-text-primary">{{ $t('form.birthdate.label') }}</label>
          <input class="form-input text-input" v-model="birthdate" type="date" >
          <span v-if="birthdateError" class="mt-2 text-red-600">
            {{ $t(`form.errors.${birthdateError.key}`, birthdateError.values) }}
          </span>
        </div>
        <div class="flex flex-col 2xl:flex-row mt-4">
          <div class="flex flex-col">
            <label for="pwd" class="text-tkt-text-primary">{{ $t('form.password.label') }}</label>
            <input class="form-input text-input 2xl:w-19/20" v-model="password" 
                   type="password" :placeholder="$t('form.password.placeholder')" >
            <span v-if="passwordError" class="mt-2 text-red-600">
              {{ $t(`form.errors.${passwordError.key}`, passwordError.values) }}
            </span>
          </div>
          <div class="flex flex-col 2xl:ml-auto mt-4 2xl:mt-0 2xl:w-1/2">
            <label for="pwd_confirm" class="text-tkt-text-primary">{{ $t('form.password_confirm.label') }}</label>
            <input class="form-input text-input" v-model="passswordConfirm" 
                   type="password" :placeholder="$t('form.password_confirm.placeholder')" >
            <span v-if="passswordConfirmError" class="mt-2 text-red-600">
              {{ $t(`form.errors.${passswordConfirmError.key ?? passswordConfirmError}`, passswordConfirmError.values) }}
            </span>
          </div>
        </div>
        <div class="mt-6">
          <span v-if="signupError" class="flex mb-2 text-red-600">
            {{ $t(`form.errors.${signupError}`) }}
          </span>
          <button class="btn btn-primary p-3 text-xl flex justify-center w-full" type="submit">
            <template v-if="!loading">
              {{ $t('signup.submit') }}
            </template>
            <template v-else>
              <SvgIcon class="animate-spin h-5 w-5 my-1 text-black" name="loader"/>
            </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>

import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { object, string, date, ref } from 'yup'

const axios = inject('axios')
const router = useRouter()
const loading = ref(false)
const signupError = ref(null)

const schemaSignup = object({
  email: string().required().email(),
  username_riot: string().required(),
  birthdate: date().required(),
  password: string().required().min(8),
  passswordConfirm: string().required().oneOf([ref('password')], 'matchPwds')
})

const { handleSubmit } = useForm({ validationSchema: schemaSignup })

const onSubmit = handleSubmit( async (values) => {
  loading.value = true
  try {
    await axios.post('/users', values)
    router.push({ path: '/' })
  } catch (e) {
    signupError.value = e.response.data
  }
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: username_riot, errorMessage: usernameRiotError } = useField('username_riot')
const { value: birthdate, errorMessage: birthdateError } = useField('birthdate')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: passswordConfirm, errorMessage: passswordConfirmError } = useField('passswordConfirm')

</script>