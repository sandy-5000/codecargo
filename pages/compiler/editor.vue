<template>
  <NuxtLayout :name="layout" page="editor" header="Home">
    <div class="editor w-full">
      <div class="py-4 px-3 flex justify-end md:justify-start">
        <ui-button-secondary>
          <span class="select-btn">Java</span>
        </ui-button-secondary>
      </div>
      <div class="w-full h-screen px-3">
        <div style="height: calc(100% - 60px);">
          <iframe title="compiler" id="oc-editor" class="h-full w-full rounded-lg"
            src="https://onecompiler.com/embed?hideTitle=true&codeChangeEvent=true&listenToEvents=true&hideNew=true&hideLanguageSelection=true"></iframe>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
const layout = 'compiler'
</script>