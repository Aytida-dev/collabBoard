import { create } from "zustand";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_URL);

type Store = {
  socket: any;
  userName: string;
  joinedUser: any;
  roomId: string;
  canvasRef: any | null;
  eraser: boolean;
  eraserWidth: number;
  strokeWidth: number;
  strokeColor: string; //rgba
  bgColor: string; //rgba
  saveJpegNumber: number;
  savePngNumber: number;
  saveSvgNumber: number;
  bgImageUrl: string;
};

type StoreActions = {
  setCanvasRef: (canvasRef: Store["canvasRef"]) => void;
  setUserName: (userName: Store["userName"]) => void;
  setJoinedUser: (userName: string, id: number) => void;
  setRoomId: (roomId: Store["roomId"]) => void;
  setEraser: (canvasRef: Store["canvasRef"], eraser: boolean) => void;
  setEraserWidth: (eraserWidth: number) => void;
  setStrokeWidth: (strokeWidth: number) => void;
  setStrokeColor: (strokeColor: string) => void;
  setBgColor: (
    bgColor: string,
    userName: string,
    roomId: string,
    toSocket: boolean
  ) => void;
  setBgImageUrl: (
    bgImageUrl: string,
    userName: string,
    roomId: string,
    toSocket: boolean
  ) => void;
  undo: (
    canvasRef: Store["canvasRef"],
    userName: string,
    roomId: string
  ) => void;

  clear: (
    canvasRef: Store["canvasRef"],
    userName: string,
    roomId: string
  ) => void;
  exportAsImage: (type: string) => void;
};

export const useStore = create<Store & StoreActions>((set) => ({
  socket: socket,
  canvasRef: null,
  userName: "",
  roomId: "",
  joinedUser: [
    {
      userName: "cd",
      id: 0,
    },
  ],
  eraser: false,
  saveJpegNumber: 0,
  savePngNumber: 0,
  saveSvgNumber: 0,
  eraserWidth: 8,
  strokeWidth: 4,
  strokeColor: "rgba(0,0,0,1)",
  bgColor: "rgba(255,255,255,1)",
  bgImageUrl: "",

  setUserName: (userName) => set({ userName: userName }),

  setRoomId: (roomId) => set({ roomId: roomId }),

  setJoinedUser: (userName, id) =>
    set((state) => ({
      joinedUser: [...state.joinedUser, { userName: userName, id: id }],
    })),

  undo: (canvasRef, roomId, userName) => {
    socket.emit("undo-or-clear", {
      type: "undo",
      roomId: roomId,
      userName: userName,
    });
    canvasRef.undo();
  },

  clear: (canvasRef, roomId, userName) => {
    socket.emit("undo-or-clear", {
      type: "clear",
      roomId: roomId,
      userName: userName,
    });

    canvasRef.clearCanvas();
  },

  exportAsImage: (type) => {
    switch (type) {
      case "jpeg":
        set({ saveJpegNumber: Math.random() });

        break;
      case "png":
        set({ savePngNumber: Math.random() });

        break;
      case "svg":
        set({ saveSvgNumber: Math.random() });

        break;

      default:
        break;
    }
  },

  setEraser: (canvasRef, eraser) => {
    canvasRef.eraseMode(!eraser);
    set((state) => ({ eraser: !state.eraser }));
  },

  setCanvasRef: (canvasRef) => set({ canvasRef: canvasRef }),
  setEraserWidth: (eraserWidth) => set({ eraserWidth: eraserWidth }),
  setStrokeWidth: (strokeWidth) => set({ strokeWidth: strokeWidth }),
  setStrokeColor: (strokeColor) => set({ strokeColor: strokeColor }),
  setBgColor: (bgColor, roomId, userName, toSocket) => {
    if (toSocket) {
      socket.emit("change-bg-color", {
        bgColor: bgColor,
        roomId: roomId,
        userName: userName,
      });
    }
    set({ bgColor: bgColor });
  },
  setBgImageUrl: (bgImageUrl, roomId, userName, toSocket) => {
    if (toSocket) {
      socket.emit("change-bg-image", {
        bgImageUrl: bgImageUrl,
        roomId: roomId,
        userName: userName,
      });
    }
    set({ bgImageUrl: bgImageUrl });
  },
}));
