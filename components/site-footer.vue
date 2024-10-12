<template>
  <footer class="mt-auto w-full h-[80px] md:h-[65px] v-center bg-gray-800">
    <div class="mx-5 md:mx-16 lg:mx-32 md:flex justify-between">
      <span class="text-slate-100 text-sm"
        >Copyright © {{ year }} Darkube. All rights reserved.</span
      >
      <span
        class="block md:inline-flex font-semibold text-slate-100 text-xs uppercase my-2 md:my-0"
      >
        <NuxtLink to="/_____">
          <span>Developed by</span>
        </NuxtLink>
      </span>
    </div>
  </footer>
</template>

<script setup>
const date = new Date()
const year = date.getFullYear()
</script>
