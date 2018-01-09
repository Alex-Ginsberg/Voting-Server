import Server from 'socket.io'

/*
    Creates a Socket.io server and an HTTP server
*/
export default function startServer() {
    const io = new Server().attach(8090)
}