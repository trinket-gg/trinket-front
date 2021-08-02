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
          <input class="form-input text-input" type="text" v-model="usernameLol" placeholder="Enter your summoner name" />
          <span v-show="usernameLolError" class="mt-2 text-red-600">{{ usernameLolError }}</span>
        </div>
        <div class="flex flex-col mt-4">
          <label for="birthday" class="text-tkt-text-primary">Birthday</label>
          <input class="form-input text-input" type="date" v-model="birthday" placeholder="Enter your birthday" />
          <span v-show="birthdayError" class="mt-2 text-red-600">{{ birthdayError }}</span>
        </div>
        <div class="flex flex-col 2xl:flex-row mt-4">
          <div class="flex flex-col">
            <label for="pwd" class="text-tkt-text-primary">Password</label>
            <input class="form-input text-input 2xl:w-19/20" v-model="pwd" placeholder="Enter your password" />
            <span v-show="pwdError" class="mt-2 text-red-600">{{ pwdError }}</span>
          </div>
          <div class="flex flex-col 2xl:ml-auto mt-4 2xl:mt-0">
            <label for="pwd_confirm" class="text-tkt-text-primary">Confirm password</label>
            <input class="form-input text-input" type="text" v-model="pwdConfirm" placeholder="Confirm your password" />
            <span v-show="pwdConfirmError" class="mt-2 text-red-600">{{ pwdConfirmError }}</span>
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

import { ref, reactive, watch, toRefs } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup';

const loading = ref(false)

const schemaSignup = yup.object({
  email: yup.string().required().email(),
  usernameLol: yup.string().required(),
  birthday: yup.date().required(),
  pwd: yup.string().required().min(8),
  pwdConfirm: yup.string().required().min(8)
});

const { handleSubmit, errors } = useForm({ validationSchema: schemaSignup })

const onSubmit = handleSubmit((values) => {
  loading.value = true
  console.log(JSON.stringify(values, null, 2));
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: usernameLol, errorMessage: usernameLolError } = useField('usernameLol')
const { value: birthday, errorMessage: birthdayError } = useField('birthday')
const { value: pwd, errorMessage: pwdError } = useField('pwd')
const { value: pwdConfirm, errorMessage: pwdConfirmError } = useField('pwdConfirm')

</script>