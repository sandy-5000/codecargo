<template>
  <NuxtLayout :name="layout" page="home" header="Home" title="Home">
    <div style="height: calc(100vh - 130px)" class="pb-2">
      <div class="h-[65px] px-3 py-2">
        <div
          class="h-full bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-md v-center"
        >
          <div class="flex px-5">
            <div class="mr-auto">
              <h1
                class="text-md font-normal text-gray-100 text-center cursor-pointer"
              >
                Darkube Chat
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div
        ref="messageContainer"
        style="height: calc(100% - 125px)"
        class="px-3 py-1 rounded-xl overflow-y-scroll"
      >
        <chatroom-message mtype="receive"
          >Hello guys, this is Darkube chat!</chatroom-message
        >
        <chatroom-message
          :mtype="msg.id === id ? 'sender' : 'receive'"
          v-for="msg of messages"
          >{{ msg.content }}</chatroom-message
        >
      </div>
      <form @submit.prevent="handleChatSubmit">
        <div class="h-[65px] py-2 px-3 relative">
          <input
            v-model="messageBox"
            class="outline-none border-2 border-gray-700 focus:border-indigo-600 px-3 pr-[100px] rounded-lg w-full h-full text-gray-100 bg-slate-800"
          />
          <div
            class="absolute h-full top-0 right-0 py-3 pr-4 flex flex-col justify-center"
          >
            <button
              type="submit"
              class="outline-none bg-gray-900 text-gray-100 border-2 border-gray-700 hover:border-indigo-600 focus:border-indigo-600 rounded-lg h-full px-3"
            >
              <font-awesome-icon icon="fa-solid fa-paper-plane" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>
<script setup>
import io from 'socket.io-client'

const layout = 'chatroom'

const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`

const socket = io({
  path: '/api/socket.io/',
})

const messageBox = ref('')
const messageContainer = ref('')
const messages = useState('messages', () => [])

const scrollToBottom = () => {
  nextTick(() => {
    const container = messageContainer.value
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

const addMessage = ({ uid, content }) => {
  while (messages.value.length >= 200) {
    messages.value.shift()
  }
  messages.value.push({ id: uid, content })
  if (id === uid) {
    scrollToBottom()
  }
}

socket.on('chat-broadcast', (data) => {
  addMessage(data)
})

const handleChatSubmit = () => {
  socket.emit('chat-message', {
    uid: id,
    content: messageBox.value,
  })
  messageBox.value = ''
}
</script>
