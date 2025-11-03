/* eslint-disable no-unused-vars */
export function connectQueryWebSocket(onEvent) {
// Isso constrói o protocolo (ws: ou wss:)
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  
  // Isso pega o host e porta da página (ex: 192.168.0.172:5173)
  const host = window.location.host; 

  // Constrói a URL completa para o proxy do Vite
  // Ex: ws://192.168.0.172:5173/ws
  const socket = new WebSocket(`${protocol}//${host}/ws`);
  socket.addEventListener("open", () => {
    
  });

  socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    onEvent(msg, socket);
  });

  socket.addEventListener("close", (e) => {
    
  });

  return socket;
}
