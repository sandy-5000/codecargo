<template>
  <NuxtLayout :name="layout" page="editor" header="Home" title="Editor">
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
      <div class="w-full px-3 pb-5" style="height: calc(100vh - 50px);">
        <div class="h-full">
          <iframe title="compiler" id="oc-editor" class="h-full w-full rounded-lg"
            src="https://onecompiler.com/embed?hideTitle=true&codeChangeEvent=true&listenToEvents=true&hideNew=true&hideLanguageSelection=true"></iframe>
        </div>
      </div>
      <div v-if="true">
        <div class="pb-5 px-5 flex flex-col-reverse md:flex-row justify-between">
          <div class="px-4 mt-3 md:mt-0">
            <ui-input-label value="Channel ID" />
            <div class="relative">
              <div v-if="!!channelId" class="absolute right-0 top-0 h-full aspect-square p-1">
                <div @click="copyChannel(channelId)"
                  class="h-full bg-gray-800 cursor-pointer border-2 border-indigo-400 rounded-md a-center p-1">
                  <font-awesome-icon style="color: #f1f5f9" class="text-sm" icon="fa-solid fa-clone" />
                </div>
              </div>
              <ui-text-input className="block mt-1 w-full" :value="inputChannelId" @update:value="(x) => inputChannelId = x" :disabled="!!channelId" />
            </div>
            <span v-if="copied" class="text-gray-200 text-xs">Copied to clipboard.</span>
            <div class="mt-1 flex justify-end md:justify-start">
              <ui-button-primary @click="joinChannel()" v-if="!loading.join && !channelId" class="mt-1">
                Join Channel
              </ui-button-primary>
              <ui-button-danger @click="leaveChannel()" v-if="!loading.join && !!channelId" class="mt-1">
                Leave Channel
              </ui-button-danger>
            </div>
          </div>
          <div class="flex justify-end md:block">
            <ui-switch id="sync_code" :value="codeSync" @update:checked="(x) => codeSync = x"
              prompt="Synchronize code"></ui-switch>
          </div>
        </div>
        <div class="a-center my-5">
          <Button @click="createChannel()" :disabled="loading.create || !!channelId"
            class="border-2 border-indigo-600 rounded-lg z-[1] py-4 px-10 bg-gray-800 text-slate-100 a-center">
            <font-awesome-icon fill="#f1f5f9" class="mr-3" icon="fa-solid fa-plus" />
            <span class="font-normal">Create Channel</span>
          </Button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { validate } from 'uuid'

const layout = 'compiler'

const modal = useState('modal', () => false)
const selected = useState('selected', () => 'Java')
const codeSync = useState('codeSync', () => false)
const blur = useState('blur', () => false)
const channelId = useState('channelId', () => '')
const inputChannelId = useState('inputChannelId', () => '')
const copied = useState('copied', () => false)

const loading = useState('loading', () => {
  return {
    create: false,
    join: false,
  }
})

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

const copyChannel = (channel_id) => {
  navigator.clipboard.writeText(channel_id)
    .then(() => {
      console.log('copied')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 1000)
    })
    .catch(err => {
      console.log(err)
    })
}

const createChannel = async () => {
  if (loading.value.create) {
    return
  }
  loading.value.create = true
  try {
    const response = await $fetch('/api/channel/create', {
      method: 'POST',
      body: {
        _id: 'sandy-blaze'
      }
    })
    console.log(response)
    if (response.channel_id) {
      if (!validate(response.channel_id)) {
        return
      }
      copyChannel(response.channel_id)
      localStorage.setItem('channel_id', response.channel_id)
      channelId.value = response.channel_id
      inputChannelId.value = response.channel_id
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value.create = false
  }
}

const joinChannel = async () => {
  const channel_id = inputChannelId.value || localStorage.getItem('channel_id')
  if (loading.value.join || !channel_id) {
    return
  }
  if (!validate(channel_id)) {
    alert('Invalid channel')
    return
  }
  loading.value.join = true
  try {
    const response = await $fetch('/api/channel/join', {
      method: 'POST',
      body: {
        _id: 'sandy-blaze',
        channel_id: channel_id,
      }
    })
    console.log(response)
    if (response.channel_id) {
      if (!validate(response.channel_id)) {
        return
      }
      localStorage.setItem('channel_id', response.channel_id)
      channelId.value = response.channel_id
      inputChannelId.value = response.channel_id
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value.join = false
  }
}

const leaveChannel = () => {
  channelId.value = ''
  console.log('Leave Channel')
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