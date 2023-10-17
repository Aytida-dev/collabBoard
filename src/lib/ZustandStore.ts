import { create } from "zustand";
import { io } from "socket.io-client";

const socket = io("localhost:5000");

type Store = {
  socket: any;
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
  setEraser: (canvasRef: Store["canvasRef"], eraser: boolean) => void;
  setEraserWidth: (eraserWidth: number) => void;
  setStrokeWidth: (strokeWidth: number) => void;
  setStrokeColor: (strokeColor: string) => void;
  setBgColor: (bgColor: string) => void;
  setBgImageUrl: (bgImageUrl: string) => void;
  undo: (canvasRef: Store["canvasRef"]) => void;

  clear: (canvasRef: Store["canvasRef"]) => void;
  exportAsImage: (type: string) => void;
};

export const useStore = create<Store & StoreActions>((set) => ({
  socket: socket,
  canvasRef: null,
  eraser: false,
  saveJpegNumber: 0,
  savePngNumber: 0,
  saveSvgNumber: 0,
  eraserWidth: 8,
  strokeWidth: 4,
  strokeColor: "rgba(0,0,0,1)",
  bgColor: "rgba(255,255,255,1)",
  undo: (canvasRef) => {
    socket.emit("undo-or-clear", { type: "undo" });
    canvasRef.undo();
  },

  clear: (canvasRef) => {
    socket.emit("undo-or-clear", { type: "clear" });

    canvasRef.clearCanvas();
  },
  bgImageUrl: "",

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
  setBgColor: (bgColor) => set({ bgColor: bgColor }),
  setBgImageUrl: (bgImageUrl) => set({ bgImageUrl: bgImageUrl }),
}));
