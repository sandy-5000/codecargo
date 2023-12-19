<template>
  <Head>
    <Title>Darkube Compiler | {{ title || 'Home' }}</Title>
    <Meta name="description" content="Welcome to DARKUBE Compiler - Your Ultimate Coding Hub!" />
  </Head>

  <body class="font-sans antialiased bg-gray-900">
    <div class="min-h-screen">
      <compiler-nav-bar :page="page"></compiler-nav-bar>
      <slot />
      <footer class="mt-auto w-full h-[65px] v-center bg-gray-800">
        <div class="mx-5 md:mx-16 lg:mx-32">
          <span class="text-slate-100 text-sm">Copyright © 2023 Darkube Complier. All rights reserved.</span>
        </div>
      </footer>
    </div>
  </body>
</template>
<script setup>
const props = defineProps({
  page: String,
  title: String,
})
</script>