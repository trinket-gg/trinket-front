<template>
  <div class="flex flex-col lg:flex-row justify-center items-center pt-12 lg:pt-36">
    <div class="flex w-1/2 relative">
      <div class="w-80 h-56 rounded-xl bg-tkt-black-bg-hover" />
      <div class="w-72 h-52 rounded-xl bg-tkt-black-bg-hover" />
      <div class="w-64 h-48 rounded-xl bg-tkt-black-bg-hover" />
    </div>
    <div class="flex flex-col lg:px-15 xl:px-25 w-2/3 lg:w-1/2 my-12 lg:my-0">
      <h1 class="text-3xl text-white font-bold">Create account</h1>
      <form class="flex flex-col">
        <div class="flex flex-col mt-4">
          <label for="email" class="text-tkt-text-primary">Email</label>
          <input class="form-input text-input" type="text" name="email" placeholder="Enter your email" />
        </div>
        <div class="flex flex-col mt-4">
          <label for="username_lol" class="text-tkt-text-primary">Username (League of Legends)</label>
          <input class="form-input text-input" type="text" name="username_lol" placeholder="Enter your summoner name" />
        </div>
        <div class="flex flex-col mt-4">
          <label for="birthday" class="text-tkt-text-primary">Birthday</label>
          <input class="form-input text-input" type="date" name="birthday" placeholder="Enter your birthday" />
        </div>
        <div class="flex flex-col 2xl:flex-row mt-4">
          <div class="flex flex-col">
            <label for="pwd" class="text-tkt-text-primary">Password</label>
            <input class="form-input text-input 2xl:w-19/20" type="password" name="pwd" placeholder="Enter your password" />
          </div>
          <div class="flex flex-col 2xl:ml-auto mt-4 2xl:mt-0">
            <label for="pwd_confirm" class="text-tkt-text-primary">Confirm password</label>
            <input class="form-input text-input" type="text" name="pwd_confirm" placeholder="Confirm your password" />
          </div>
        </div>
        <div class="flex flex-col mt-4">
          <label class="flex items-center">
            <input class="form-input check-input h-5 w-5 text-tkt-primary" type="checkbox" name="birthday">
            <span class="text-tkt-text-primary select-none ml-2">I agree The Designership design system is lit.</span>
          </label>
        </div>
        <div class="mt-7">
          <button class="btn btn-primary w-full" type="submit">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>