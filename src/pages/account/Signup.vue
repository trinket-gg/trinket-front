<template>
  <div class="flex flex-col lg:flex-row justify-center items-center pt-12 lg:pt-36">
    <div class="flex justify-center items-center w-2/3 lg:w-1/2 relative">
      <img src="/group-images-create-account.svg">
      <!-- <div class="w-[350px] h-[222px] -mt-20 -mr-56 shadow-2xl rounded-xl bg-[#CBD5E1]" />
      <div class="w-[308px] h-[195px] -mb-56 shadow-2xl rounded-xl bg-[#CBD5E1]" />
      <div class="w-[291px] h-[185px] -ml-42 shadow-2xl rounded-xl bg-[#CBD5E1]" /> -->
    </div>
    <div class="flex flex-col lg:px-15 xl:px-25 w-2/3 lg:w-1/2 my-12 lg:my-0">
      <h1 class="text-3xl text-white font-bold">Create account</h1>
      <form class="flex flex-col" @submit.prevent="onSubmit">
        <div class="flex flex-col mt-4">
          <label for="email" class="text-tkt-text-primary">Email</label>
          <input class="form-input text-input" type="text" v-model="email" placeholder="Enter your email" />
          <span v-show="emailError" class="mt-2 text-red-600">{{ emailError }}</span>
        </div>
        <div class="flex flex-col mt-4">
          <label for="username_lol" class="text-tkt-text-primary">Username (League of Legends)</label>
          <input class="form-input text-input" type="text" v-model="username_riot" placeholder="Enter your summoner name" />
          <span v-show="usernameRiotError" class="mt-2 text-red-600">{{ usernameRiotError }}</span>
        </div>
        <div class="flex flex-col mt-4">
          <label for="birthday" class="text-tkt-text-primary">Birthday</label>
          <input class="form-input text-input" type="date" v-model="birthdate" placeholder="Enter your birthday" />
          <span v-show="birthdateError" class="mt-2 text-red-600">{{ birthdateError }}</span>
        </div>
        <div class="flex flex-col 2xl:flex-row mt-4">
          <div class="flex flex-col">
            <label for="pwd" class="text-tkt-text-primary">Password</label>
            <input class="form-input text-input 2xl:w-19/20" type="password" v-model="password" placeholder="Enter your password" />
            <span v-show="passwordError" class="mt-2 text-red-600">{{ passwordError }}</span>
          </div>
          <div class="flex flex-col 2xl:ml-auto mt-4 2xl:mt-0">
            <label for="pwd_confirm" class="text-tkt-text-primary">Confirm password</label>
            <input class="form-input text-input" type="password" v-model="passswordConfirm" placeholder="Confirm your password" />
            <span v-show="passswordConfirmError" class="mt-2 text-red-600">{{ passswordConfirmError }}</span>
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
              Create
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

// import { setLocale } from 'yup'
// import fr from '@vee-validate/i18n/dist/locale/fr.json';

// setLocale({
//   mixed: {
//     min: ({ min }) => ({ key: 'vue_i18n_min_field', values: { min } }),
//   }
// })

import { ref, reactive, watch, toRefs, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup';

const axios = inject('axios')
const router = useRouter()
const loading = ref(false)

const schemaSignup = yup.object({
  email: yup.string().required().email(),
  username_riot: yup.string().required(),
  birthdate: yup.date().required(),
  password: yup.string().required().min(8),
  passswordConfirm: yup.string().required().min(8).oneOf([yup.ref('password'), null], 'Passwords must match')
});

const { handleSubmit } = useForm({ validationSchema: schemaSignup })

const onSubmit = handleSubmit( async (values) => {
  loading.value = true
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