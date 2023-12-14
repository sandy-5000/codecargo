<template>
  <nav class="w-full bg-gray-800 border-b border-gray-700">
    <div class="m-container flex">
      <div class="v-center mr-10">
        <LogoGlow class="w-[55px]"></LogoGlow>
      </div>
      <div class="space-x-4 flex">
        <NavLink :to="'/home'" :active="location.href == '/home'">Home</NavLink>
        <NavLink :to="'/dashboard'" :active="location.href == '/dashboard'">Dashboard</NavLink>
      </div>
      <div class="ml-auto v-center">
        <div class="hidden sm:flex sm:items-center sm:ms-6">
          <button
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-400 bg-gray-800 hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
            <a href="#"
              class="font-semibold text-gray-400 hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Log
              in</a>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>