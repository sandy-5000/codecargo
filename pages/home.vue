<template>
  <NuxtLayout :name="layout" page="home" header="Home">
    <div>
      <h1 class="pt-10 text-2xl text-center">Hello</h1>
      <h1 class="pt-10 text-2xl text-center">
        <NuxtLink to="/framework">Framework</NuxtLink>
      </h1>
    </div>
  </NuxtLayout>
</template>
<script setup>
const layout = 'app'
</script>
