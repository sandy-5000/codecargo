<template>
  <NuxtLayout :name="layout">
    <form method="POST" action="#">
      <!-- Email Address -->
      <div>
        <ui-input-label for="email" :value="__('Email')" />
        <ui-text-input id="email" className="block mt-1 w-full" inputType="email" name="email" :required="true"
          autofocus="true" />
        <ui-input-error :messages="null" className="mt-2" />
      </div>

      <!-- Password -->
      <div class="mt-4">
        <ui-input-label for="password" :value="__('Password')" />
        <ui-text-input id="password" className="block mt-1 w-full" inputType="password" name="password" :required="true" />
        <ui-input-error :messages="null" className="mt-2" />
      </div>

      <!-- Remember Me -->
      <div class="mt-4 flex justify-between">
        <label for="remember_me" class="inline-flex items-center">
          <input id="remember_me" type="checkbox"
            class="rounded bg-gray-900 border-gray-700 outline-none text-indigo-600 shadow-sm focus:ring-indigo-600 focus:ring-offset-gray-800"
            name="remember">
          <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ __('Remember me') }}</span>
        </label>
        <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          href="#">
          {{ __('Forgot your password?') }}
        </a>
      </div>

      <div class="flex items-center justify-end mt-4">
        <a style="margin-right: auto;"
          class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          href="#">
          {{ __('Not registered?') }}
        </a>

        <ui-button-primary class="ms-3">
          {{ __('Log in') }}
        </ui-button-primary>
      </div>
    </form>
  </NuxtLayout>
</template>
<script setup>
const layout = 'auth'
</script>