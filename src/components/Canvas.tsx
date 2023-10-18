"use client";

import { useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useStore } from "../lib/ZustandStore";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const Canvas = () => {
  const {
    socket,
    setCanvasRef,
    strokeWidth,
    eraserWidth,
    strokeColor,
    bgColor,
    bgImageUrl,
    eraser,
    saveJpegNumber,
    savePngNumber,
    saveSvgNumber,
  } = useStore();

  const canvasRef = useRef<any>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("received-drawing", (paths: any) => {
      canvasRef.current.loadPaths([paths]);
    });

    socket.on("undo-or-clear", ({ type }: { type: string }) => {
      switch (type) {
        case "undo":
          canvasRef.current.undo();
          break;

        case "clear":
          canvasRef.current.clearCanvas();
          break;

        default:
          break;
      }
      console.log("undo");
    });

    return () => {
      socket.off("received-drawing");
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    setCanvasRef(canvasRef.current);
  }, [canvasRef]);

  useEffect(() => {
    if (saveJpegNumber === 0) return;

    handleOnSave("jpeg", "ad");
  }, [saveJpegNumber]);

  useEffect(() => {
    if (savePngNumber === 0) return;

    handleOnSave("png", "ad");
  }, [savePngNumber]);

  useEffect(() => {
    if (saveSvgNumber === 0) return;

    handleOnSave("svg", "ad");
  }, [saveSvgNumber]);

  async function handleOnSave(type: string, fileName: string) {
    if (type === "svg") {
      const svg = await canvasRef.current.exportSvg();
      //copy to clipboard
      navigator.clipboard.writeText(svg);
      console.log("copied");
      return;
    }

    const img = await canvasRef.current.exportImage(type);

    // downloadImage(img, fileName);
  }

  function handleOnStroke(currentPath: any) {
    if (currentPath.length === 0) return;

    //create an deep copy of currentpath as shallow one was giving erroes
    const lastPath = JSON.parse(JSON.stringify(currentPath));

    socket.emit("drawing", lastPath);
  }

  return (
    <div
      className="w-full h-full"
      style={{
        cursor: `${eraser ? "cell" : "crosshair"}`,
      }}
    >
      <ReactSketchCanvas
        id="1"
        style={styles}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
        canvasColor={bgColor}
        ref={canvasRef}
        eraserWidth={eraserWidth}
        onStroke={handleOnStroke}
        backgroundImage={bgImageUrl}
        exportWithBackgroundImage={true}
      />
    </div>
  );
};

export default Canvas;
