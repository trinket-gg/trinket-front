<template>
  <div class="flex flex-col lg:flex-row justify-center items-center min-h-full my-auto">
    <div class="flex justify-center items-center w-2/3 lg:w-1/2 relative">
      <img src="/group-images-create-account.svg">
    </div>
    <div class="flex flex-col lg:px-15 xl:px-25 w-2/3 lg:w-1/2 my-12 lg:my-0">
      <h1 class="text-3xl text-white font-bold">{{ $t('signin.main-title') }}</h1>
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
          <label for="pwd" class="text-tkt-text-primary">{{ $t('form.password.label') }}</label>
          <input class="form-input text-input" v-model="password" 
                  type="password" :placeholder="$t('form.password.placeholder')" >
          <span v-if="passwordError" class="mt-2 text-red-600">
            {{ $t(`form.errors.${passwordError.key}`, passwordError.values) }}
          </span>
        </div>
        <div class="mt-6">
          <button class="btn btn-primary p-3 text-xl flex justify-center w-full" type="submit">
            <template v-if="!loading">
              {{ $t('signin.submit') }}
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

import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup';

const axios = inject('axios')
const router = useRouter()
const loading = ref(false)

const schemaSignup = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
})

const { handleSubmit } = useForm({ validationSchema: schemaSignup })

const onSubmit = handleSubmit( async (values) => {
  loading.value = true
  try {
    const response = await axios.post('/users/login', values)
    console.log(response)
    router.push({ path: '/' })
  } catch (e) {
    console.log(e)
  }
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
  
</script>