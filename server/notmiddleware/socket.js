// import WebSocket, { WebSocketServer } from 'ws'

// let wss = undefined
// let clients = []

// export default defineEventHandler((event) => {
//     if (wss) {
//         return
//     }
//     wss = new WebSocketServer({ server: event.node.res.socket?.server })
//     wss.on("connection", function (socket) {
//         socket.send("connected")
//         socket.on("message", function (message) {
//             console.log(message.toString())
//         })
//     })
// })