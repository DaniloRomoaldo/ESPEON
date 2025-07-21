export function connectQueryWebSocket(onEvent){
    const socket = new WebSocket('ws://localhost:3001')

    socket.addEventListener('open', () => {
        console.log('webSocket conectado')
    });

    socket.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data)
        onEvent(msg, socket)
    });

    socket.addEventListener('close', (e) => {
        console.log('WebSocket desconectado:', e.code, e.reason);
    });

    return socket;
}