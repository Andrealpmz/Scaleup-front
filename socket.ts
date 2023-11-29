import { reactive, Ref } from "vue";
import { io, Socket } from "socket.io-client";

interface EventData {
  // Define the structure of your event data here
}

interface AppState {
  connected: boolean;
  fooEvents: EventData[];
  barEvents: EventData[];
}

const state: AppState = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

function initializeSocket(): Socket {
  const isProduction: boolean = process.env.NODE_ENV === "production";
  const URL: string = isProduction ? "" : import.meta.env.VITE_MICRO_BACKEND_LNK;

  const socket: Socket = io(URL, {
    extraHeaders: {
      "Access-Control-Allow-Origin": "http://localhost:5173", // Allow requests from this origin
    },
  });

  socket.on("connect", () => {
    state.connected = true;
  });

  socket.on("disconnect", () => {
    state.connected = false;
  });

  socket.on("foo", (...args: EventData[]) => {
    state.fooEvents.push(...args);
  });

  socket.on("bar", (...args: EventData[]) => {
    state.barEvents.push(...args);
  });

  return socket;
}

const socket: Socket = initializeSocket();

export { state, socket };
