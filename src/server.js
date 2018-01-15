/*
    How the server operates:
        1. A client sends an action to the server
        2. The server hands the action to the Redux Store
        3. The Store calls the reducer and the reducers executes the logic related to the action
        4. The Store updates its state based on the return value of the reducer
        5. The Store executes the listener function subscribed by the server
        6. The serveremits a 'state' event
        7. All connected clients - including the one that initiated the original action - receive
           the new state
*/

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
        socket.on('action', store.dispatch.bind(store))
    })
}
