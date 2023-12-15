<template>
  <NuxtLayout :name="layout" page="editor" header="Home">
    <compiler-language v-if="modal" :selectLanguage="(id, language) => {
      selected = language
      closeModal()
      swiftLanguage(id)
    }"></compiler-language>
    <div :class="{ 'editor w-full': true, 'blur-md': blur }">
      <div class="py-4 px-3 flex justify-end md:justify-start">
        <ui-button-secondary @click="openModal">
          <span class="select-btn">{{ selected }}</span>
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
import snippets from "~/data/state.js"

const layout = 'compiler'

const modal = useState('modal', () => false)
const selected = useState('selected', () => 'Java')
const blur = useState('blur', () => false)

const openModal = () => {
  modal.value = true
  blur.value = true
}

const closeModal = () => {
  modal.value = false
  blur.value = false
}

const swiftLanguage = (lang) => {
  let x = snippets[lang]
  let data = localStorage.getItem(lang)
  if (data) {
    x = JSON.parse(data)
  }
  editor.contentWindow.postMessage({
    eventType: 'populateCode',
    language: x.language,
    files: x.files,
  }, "*")
}

const handleData = (e) => {
  if (e.data && e.data.language) {
    const { language, files } = e.data
    localStorage.setItem(e.data.language, JSON.stringify({ language, files }))
  }
}

let editor = undefined

const runOnMount = () => {
  editor = document.getElementById('oc-editor')
  selected.value = 'Java'
  if (editor) {
    window.addEventListener('message', handleData)
  }
}

onMounted(runOnMount)
</script>