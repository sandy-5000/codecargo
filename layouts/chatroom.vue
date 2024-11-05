<template>
  <Head>
    <Title>CodeCargo Chatroom | {{ title || 'Home' }}</Title>
    <Meta
      name="description"
      content="Welcome to CodeCargo Chatroom - Your Ultimate Coding Hub!"
    />
  </Head>
  <body class="font-sans antialiased bg-gray-900">
    <div class="min-h-screen">
      <chatroom-nav-bar :page="page"></chatroom-nav-bar>
      <slot />
      <site-footer></site-footer>
    </div>
  </body>
</template>

<script setup>
const props = defineProps({
  page: String,
  title: String,
})
</script>
