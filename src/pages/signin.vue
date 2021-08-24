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
          <span v-if="showLoginError" class="flex mb-2 text-red-600">
            {{ $t('form.errors.login') }}
          </span>
          <button class="btn btn-primary p-3 text-xl flex justify-center w-full" type="submit">
            <template v-if="!loading">
              {{ $t('signin.submit') }}
            </template>
            <template v-else>
              <SvgIcon class="animate-spin h-5 w-5 my-1" name="loader"/>
            </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>

import { object, string } from 'yup'

const store = useStore()
const router = useRouter()
const loading = ref(false)
const showLoginError = ref(false)

const schemaSignup = object({
  email: string().required().email(),
  password: string().required().min(8),
})

const { handleSubmit } = useForm({ validationSchema: schemaSignup })

const onSubmit = handleSubmit( async (values) => {
  loading.value = true
  try {
    await store.dispatch('auth/login', values)
    router.push('/')
  } catch (e) {
    showLoginError.value = true
    loading.value = false
  }
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
  
</script>