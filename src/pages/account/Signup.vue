<template>
  <div class="flex flex-col lg:flex-row justify-center items-center pt-12 lg:pt-36">
    <div class="flex justify-center items-center w-2/3 lg:w-1/2 relative">
      <img src="/group-images-create-account.svg">
      <!-- <div class="w-[350px] h-[222px] -mt-20 -mr-56 shadow-2xl rounded-xl bg-[#CBD5E1]" />
      <div class="w-[308px] h-[195px] -mb-56 shadow-2xl rounded-xl bg-[#CBD5E1]" />
      <div class="w-[291px] h-[185px] -ml-42 shadow-2xl rounded-xl bg-[#CBD5E1]" /> -->
    </div>
    <div class="flex flex-col lg:px-15 xl:px-25 w-2/3 lg:w-1/2 my-12 lg:my-0">
      <h1 class="text-3xl text-white font-bold">{{ $t('signup.main-title') }}</h1>
      <form class="flex flex-col" @submit.prevent="onSubmit">
        <div class="flex flex-col mt-4">
          <label for="email" class="text-tkt-text-primary">{{ $t('form.email.label') }}</label>
          <input class="form-input text-input" v-model="email" 
                 type="text" :placeholder="$t('form.email.placeholder')" >
          <span v-if="emailError" class="mt-2 text-red-600">{{ $t(`form.errors.${emailError.key}`, emailError.values) }}</span>
        </div>
        <div class="flex flex-col mt-4">
          <label for="username_lol" class="text-tkt-text-primary">{{ $t('form.username.label') }} (League of Legends)</label>
          <input class="form-input text-input" v-model="username_riot" 
                 type="text" :placeholder="$t('form.username.placeholder')" >
          <span v-if="usernameRiotError" class="mt-2 text-red-600">{{ $t(`form.errors.${usernameRiotError.key}`, usernameRiotError.values) }}</span>
        </div>
        <div class="flex flex-col mt-4">
          <label for="birthday" class="text-tkt-text-primary">{{ $t('form.birthdate.label') }}</label>
          <input class="form-input text-input" v-model="birthdate" type="date" >
          <span v-if="birthdateError" class="mt-2 text-red-600">{{ $t(`form.errors.${birthdateError.key}`, birthdateError.values) }}</span>
        </div>
        <div class="flex flex-col 2xl:flex-row mt-4">
          <div class="flex flex-col">
            <label for="pwd" class="text-tkt-text-primary">{{ $t('form.password.label') }}</label>
            <input class="form-input text-input 2xl:w-19/20" v-model="password" 
                   type="password" :placeholder="$t('form.password.placeholder')" >
            <span v-if="passwordError" class="mt-2 text-red-600">{{ $t(`form.errors.${passwordError.key}`, passwordError.values) }}</span>
          </div>
          <div class="flex flex-col 2xl:ml-auto mt-4 2xl:mt-0">
            <label for="pwd_confirm" class="text-tkt-text-primary">{{ $t('form.password_confirm.label') }}</label>
            <input class="form-input text-input" v-model="passswordConfirm" 
                   type="password" :placeholder="$t('form.password_confirm.placeholder')" >
            <span v-if="passswordConfirmError" class="mt-2 text-red-600">{{ $t(`form.errors.${passswordConfirmError.key ?? passswordConfirmError}`, passswordConfirmError.values) }}</span>
          </div>
        </div>
        <div class="flex flex-col mt-5">
          <label class="flex items-center">
            <input class="form-input check-input h-5 w-5 text-tkt-primary" type="checkbox" name="birthday">
            <span class="text-tkt-text-primary cursor-pointer select-none ml-2">I agree The Designership design system is lit.</span>
          </label>
        </div>
        <div class="mt-6">
          <button class="btn btn-primary flex justify-center w-full" type="submit">
            <template v-if="!loading">
              {{ $t('signup.submit') }}
            </template>
            <template v-else>
              <svg class="animate-spin h-5 w-5 my-1 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>

import { ref, reactive, watch, toRefs, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup';

const axios = inject('axios')
const router = useRouter()
const loading = ref(false)

const schemaSignup = yup.object({
  email: yup.string().required().email(),
  username_riot: yup.string().required(),
  birthdate: yup.date().required(),
  password: yup.string().required().min(8),
  passswordConfirm: yup.string().required().oneOf([yup.ref('password')], 'matchPwds')
})

const { handleSubmit } = useForm({ validationSchema: schemaSignup })

const onSubmit = handleSubmit( async (values, yes) => {
  loading.value = true

  console.log(yes)

  try {
    const response = await axios.post('/users', values)
    router.push({ path: '/' })
  } catch (e) {
    console.log(e)
  }
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: username_riot, errorMessage: usernameRiotError } = useField('username_riot')
const { value: birthdate, errorMessage: birthdateError } = useField('birthdate')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: passswordConfirm, errorMessage: passswordConfirmError } = useField('passswordConfirm')

</script>