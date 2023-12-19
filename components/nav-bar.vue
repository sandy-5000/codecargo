<template>
  <nav class="w-full bg-gray-800 border-b border-gray-700">
    <div class="m-container flex">
      <div class="v-center mr-10">
        <ui-logo-glow class="w-[55px]"></ui-logo-glow>
      </div>
      <div class="space-x-4 flex">
        <ui-nav-link :to="'/home'" :active="page === 'home'">Home</ui-nav-link>
        <ui-nav-link :to="'/dashboard'" :active="page === 'dashboard'">Dashboard</ui-nav-link>
      </div>
      <div class="ml-auto v-center">
        <div v-if="user.loggedIn" class="flex items-center">
          <div class="relative w-36 md:w-48">
            <div class="flex justify-end">
              <button @click="toggleOptions"
                class="a-center inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-400 bg-gray-800 hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                <span
                  class="font-semibold text-gray-400 hover:text-white focus:outline focus:outline-2 focus:rounded-sm">{{
                    user.name }}</span>
                    <font-awesome-icon class="ml-1 mt-[2px] text-xs" icon="fa-solid fa-angle-down" />
              </button>
            </div>
            <div v-if="options" class="absolute top-full left-0 w-full rounded-md bg-gray-700 py-1 min-w-16">
              <span class="block py-2 px-4 text-sm cursor-pointer hover:bg-gray-800 text-slate-300">Profile</span>
              <span class="block py-2 px-4 text-sm cursor-pointer hover:bg-gray-800 text-slate-300"
                @click="toggleLogin">Log Out</span>
            </div>
          </div>
        </div>
        <div v-if="!user.loggedIn" @click="toggleLogin" class="flex items-center">
          <button
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-400 bg-gray-800 hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
            <NuxtLink to="/login"
              class="font-semibold text-gray-400 hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Log
              in</NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
const props = defineProps({
  page: String,
})
const options = useState('options', () => false)

const user = useState('user', () => {
  return {
    name: 'Cassi',
    loggedIn: true
  }
})

const toggleLogin = () => {
  user.value.loggedIn = !user.value.loggedIn
  options.value = false
}

const toggleOptions = () => {
  options.value = !options.value
}
</script>
