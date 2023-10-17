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
