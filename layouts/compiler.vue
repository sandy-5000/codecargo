<template>
  <Head>
    <Title>Darkube Compiler</Title>
    <Meta name="description" content="Welcome to DARKUBE Compiler - Your Ultimate Coding Hub!" />
  </Head>

  <body class="font-sans antialiased bg-gray-900">
    <div class="min-h-screen">
      <compiler-nav-bar :page="page"></compiler-nav-bar>
      <slot />
    </div>
  </body>
</template>
<script setup>
const props = defineProps({
  page: String,
})
</script>