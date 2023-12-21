<style scoped>
.container {
  position: relative;
  display: block;
  width: 2rem;
  height: 1rem;
}

.background {
  position: absolute;
  inset: 0;
  background-color: #111827;
  border-radius: 20px;
  transition: all 150ms ease;
}

.circle {
  width: 1rem;
  height: 1rem;
  position: absolute;
  background-color: #334155;
  border-radius: 100%;
  outline: 1px solid #111827;
  left: 0;
  top: 0;
  transition: all 150ms ease;
}

.checkbox {
  display: none;
}

.checkbox:checked~.background {
  background-color: #4f46e5;
  border-color: #4f46e5;
  transition: all 250ms ease;
}

.checkbox:checked~.circle {
  transform: translateX(100%);
  transition: all 250ms ease;
  outline-color: #4f46e5;
  background-color: #111827;
}
</style>
<template>
  <NuxtLayout :name="layout" title="login">
    <form @submit.prevent="loginSubmit">
      <!-- Email Address -->
      <div>
        <ui-input-label for="email" :value="__('Username')" />
        <ui-text-input :value="body.username" @update:value="(x) => changeValue('username', x)" id="username"
          className="block mt-1 w-full" type="text" name="email" :required="true" autofocus="true" />
        <ui-input-error :messages="errors.username" className="mt-2" />
      </div>

      <!-- Password -->
      <div class="mt-4">
        <ui-input-label for="password" :value="__('Password')" />
        <ui-text-input :value="body.passwd" @update:value="(x) => changeValue('passwd', x)" id="password"
          className="block mt-1 w-full" type="password" name="password" :required="true" />
        <ui-input-error :messages="errors.passwd" className="mt-2" />
      </div>

      <!-- Remember Me -->
      <div class="mt-4 flex justify-between">
        <label for="remember_me" class="inline-flex items-center">
          <label for="remember_me" class="container">
            <input class="checkbox" id="remember_me" type="checkbox" />
            <div class="background"></div>
            <div class="circle"></div>
          </label>
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

        <ui-button-primary v-if="!loading" class="ms-3" type="submit">
          Log in
        </ui-button-primary>
        <ui-button-loading v-if="loading" class="ms-3">
          Logging in...
        </ui-button-loading>
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

const errors = useState('errors', () => {
  return {
    username: null,
    passwd: null,
  }
})

const loading = useState('loading', () => false)

const changeValue = (key, value) => {
  body.value[key] = value
}

const loginSubmit = async () => {
  const { username, passwd } = body.value
  body.value = { username: '', passwd: '' }
  if (session.value?._id) {
    await remove()
  }
  loading.value = true
  try {
    const response = await $fetch('/api/user/login', {
      method: 'POST',
      body: {
        username, passwd
      }
    })
    if (response.error) {
      errors.value.username = response.error
      setTimeout(() => {
        errors.value.username = null
      }, 3000)
      return
    }
    await overwrite(response)
    if (redirect) {
      navigateTo(redirect)
    } else {
      navigateTo('/home')
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>