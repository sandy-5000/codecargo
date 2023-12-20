<template>
  <NuxtLayout :name="layout">
    <form @submit.prevent="loginSubmit">
      <!-- Email Address -->
      <div>
        <ui-input-label for="email" :value="__('Username')" />
        <ui-text-input :value="body.username" @update:value="(x) => body.username = x" id="username"
          className="block mt-1 w-full" type="text" name="email" :required="true" autofocus="true" />
        <ui-input-error :messages="null" className="mt-2" />
      </div>

      <!-- Password -->
      <div class="mt-4">
        <ui-input-label for="password" :value="__('Password')" />
        <ui-text-input :value="body.passwd" @update:value="(x) => body.passwd = x" id="password"
          className="block mt-1 w-full" type="password" name="password" :required="true" />
        <ui-input-error :messages="null" className="mt-2" />
      </div>

      <!-- Remember Me -->
      <div class="mt-4 flex justify-between">
        <label for="remember_me" class="inline-flex items-center">
          <input id="remember_me" type="checkbox"
            class="rounded bg-gray-900 border-gray-700 outline-none text-indigo-600 shadow-sm focus:ring-indigo-600 focus:ring-offset-gray-800"
            name="remember">
          <span class="ms-2 text-sm text-gray-400">{{ __('Remember me') }}</span>
        </label>
        <NuxtLink to="/auth/forgot-password"
          class="underline text-sm text-gray-400 hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800">
          {{ __('Forgot your password?') }}
        </NuxtLink>
      </div>

      <div class="flex items-center justify-end mt-4">
        <NuxtLink to="/register" style="margin-right: auto;"
          class="underline text-sm text-gray-400 hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800">
          {{ __('Not registered?') }}
        </NuxtLink>

        <ui-button-primary class="ms-3" type="submit">
          {{ __('Log in') }}
        </ui-button-primary>
      </div>
    </form>
  </NuxtLayout>
</template>
<script setup>
const layout = 'auth'
const {
  session,
  remove,
  overwrite
} = await useSession()
const route = useRoute()
const { redirect } = route.query
if (session.value?._id) {
  navigateTo('/home')
}

const body = useState('body', () => {
  return {
    username: '',
    passwd: '',
  }
})

const loginSubmit = async () => {
  const { username, passwd } = body.value
  body.value = { username: '', passwd: '' }
  if (session.value?._id) {
    await remove()
  }
  try {
    const response = await $fetch('/api/user/login', {
      method: 'POST',
      body: {
        username, passwd
      }
    })
    await overwrite(response)
    console.log(session.value)
    if (redirect) {
      navigateTo(redirect)
    } else {
      navigateTo('/home')
    }
  } catch (e) {
    console.log(e)
  }
}
</script>