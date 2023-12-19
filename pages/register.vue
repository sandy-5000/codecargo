<template>
  <NuxtLayout :name="layout">
    <form method="POST" action="#">
        <!-- Name -->
        <div>
            <ui-input-label for="name" :value="__('Name')" />
            <ui-text-input id="name" className="block mt-1 w-full" type="text" name="name" required autofocus autocomplete="name" />
            <ui-input-error :messages="null" className="mt-2" />
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <ui-input-label for="email" :value="__('Email')" />
            <ui-text-input id="email" className="block mt-1 w-full" type="email" name="email" required autocomplete="username" />
            <ui-input-error :messages="null" className="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <ui-input-label for="password" :value="__('Password')" />
            <ui-text-input id="password" className="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="new-password" />
            <ui-input-error :messages="null" className="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <ui-input-label for="password_confirmation" :value="__('Confirm Password')" />
            <ui-text-input id="password_confirmation" className="block mt-1 w-full"
                            type="password"
                            name="password_confirmation" required autocomplete="new-password" />
            <ui-input-error :messages="null" className="mt-2" />
        </div>

        <div class="flex items-center justify-between mt-4">
            <NuxtLink to="/login" class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                {{ __('Already registered?') }}
            </NuxtLink>
            <ui-button-primary class="ms-4">
                {{ __('Register') }}
            </ui-button-primary>
        </div>
    </form>
  </NuxtLayout>
</template>
<script setup>
const layout = 'auth'
</script>