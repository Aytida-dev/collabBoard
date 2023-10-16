import { stat } from "fs";
import { create } from "zustand";

type Store = {
  canvasRef: React.RefObject<HTMLCanvasElement> | null;
  eraser: boolean;
  eraserWidth: number;
  strokeWidth: number;
  strokeColor: string; //rgba
  bgColor: string; //rgba

  bgImageUrl: string;
};

type StoreActions = {
  setCanvasRef: (canvasRef: Store["canvasRef"]) => void;
  setEraser: () => void;
  setEraserWidth: (eraserWidth: number) => void;
  setStrokeWidth: (strokeWidth: number) => void;
  setStrokeColor: (strokeColor: string) => void;
  setBgColor: (bgColor: string) => void;
  setBgImageUrl: (bgImageUrl: string) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  exportAsImage: (type: string) => void;
  exportSvg: () => void;
};

export const useStore = create<Store & StoreActions>((set) => ({
  canvasRef: null,
  eraser: false,
  eraserWidth: 8,
  strokeWidth: 4,
  strokeColor: "rgba(0,0,0,1)",
  bgColor: "rgba(255,255,255,1)",
  undo: () => {},
  redo: () => {},
  clear: () => {},
  bgImageUrl: "",
  exportAsImage: (type) => {
    console.log(type);
  },
  exportSvg: () => {
    console.log(" svg");
  },

  setEraser: () => set((state) => ({ eraser: !state.eraser })),
  setCanvasRef: (canvasRef) => set({ canvasRef: canvasRef }),
  setEraserWidth: (eraserWidth) => set({ eraserWidth: eraserWidth }),
  setStrokeWidth: (strokeWidth) => set({ strokeWidth: strokeWidth }),
  setStrokeColor: (strokeColor) => set({ strokeColor: strokeColor }),
  setBgColor: (bgColor) => set({ bgColor: bgColor }),
  setBgImageUrl: (bgImageUrl) => set({ bgImageUrl: bgImageUrl }),
}));
