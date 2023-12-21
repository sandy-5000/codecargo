<template>
  <div class="bg-gray-800 min-h-screen">
    <h1 class="pt-10 text-gray-100 text-center">Socket</h1>
  </div>
</template>
<script setup>
const { $socket } = useNuxtApp()

const runOnMount = () => {
  $socket.onopen = () => {
    localStorage.setItem(`connection-${uid}`, uid)
    $socket.send(uid)
  }

  $socket.onmessage = ({ data }) => {
    console.log("data", data)
    message.value = data
  }

  $socket.onclose = function () {
    console.log("disconnected")
  }
}

const sendMessage = () => {
  fetch("/api/sendmessage", {
    method: "POST",
    body: JSON.stringify({ message: Math.random(), sender: localStorage.getItem(`connection-${uid}`) }),
  }).then(res => res.json()).then(data => {
    console.log("sent")
  })
}

onMounted(runOnMount)
</script>