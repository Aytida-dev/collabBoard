import { create } from "zustand";

type Store = {
  canvasRef: any | null;
  eraser: boolean;
  eraserWidth: number;
  strokeWidth: number;
  strokeColor: string; //rgba
  bgColor: string; //rgba

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
  exportAsImage: (canvasRef: Store["canvasRef"], type: string) => void;
  exportSvg: (canvasRef: Store["canvasRef"]) => void;
};

export const useStore = create<Store & StoreActions>((set) => ({
  canvasRef: null,
  eraser: false,
  eraserWidth: 8,
  strokeWidth: 4,
  strokeColor: "rgba(0,0,0,1)",
  bgColor: "rgba(255,255,255,1)",
  undo: (canvasRef) => {
    canvasRef.undo();
  },

  clear: (canvasRef) => {
    canvasRef.clear();
  },
  bgImageUrl: "",
  exportAsImage: (canvasRef, type) => {
    console.log(type);
  },
  exportSvg: (canvasRef) => {
    console.log(" svg");
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
