import { io } from "socket.io-client";

const SOCKET_URL = "https://connectoo-hhu6.onrender.com";
export const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  autoConnect: true,
});
