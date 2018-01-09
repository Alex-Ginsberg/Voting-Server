import Server from 'socket.io'

/*
    Creates a Socket.io server and an HTTP server
*/
export default function startServer(store) {
    const io = new Server().attach(8090)

    // Whenever something in the store changes, emits it on the socket server
    // Publishes the whole state to everybody when a change occurs
    // It is possible to only send what is changed, but this is convenient 
    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    )

    // connection event can be listend for, occurs when a client connects
    // Emits the current state when a client connects
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS())
    })
}
