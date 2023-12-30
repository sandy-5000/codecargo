import { Server } from 'socket.io'

export default defineEventHandler(event => {
    if (globalThis.io) {
        return
    }

    const server = event.node.res.socket?.server
    const io = new Server(server, {
        path: '/api/socket.io/',
        cors: {
            origin: "*",
        },
    })

    globalThis.io = io
    globalThis.clients = new Map()

    io.on('connection', (socket) => {
        console.log(socket.id + ' : connection')

        socket.on('connect-channel', ({ channel_id, user_id }) => {
            const id = globalThis.clients.get(socket.id)
            if (id) {
                socket.leave(id)
            }
            if (!channel_id || !user_id) {
                return
            }
            socket.join(channel_id)
            globalThis.clients.set(socket.id, channel_id)

        })

        socket.on('code-change', ({ user_id, channel_id, language, files }) => {
            if (!channel_id || !user_id) {
                return
            }
            socket.to(channel_id).emit('multicast', { sender_id: user_id, channel_id, language, files })
        })

        socket.on("disconnect", () => {
            const id = globalThis.clients.get(socket.id)
            if (id) {
                socket.leave(id)
                globalThis.clients.delete(socket.id)
            }
            console.log(socket.id + " : disconnected")
        })
    })
})