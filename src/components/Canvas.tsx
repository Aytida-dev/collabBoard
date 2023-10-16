"use client";
"use strict";
import { useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import { io } from "socket.io-client";

const socket = io("http://192.168.152.44:5000");

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const Canvas = () => {
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("received-drawing", (paths: any) => {
      canvasRef.current.loadPaths([paths]);
    });

    return () => {
      socket.off("received-drawing");
    };
  }, []);

  function handleOnStroke(currentPath: any) {
    if (currentPath.length === 0) return;

    //create an deep copy of currentpath as shallow one was giving erroes
    const lastPath = JSON.parse(JSON.stringify(currentPath));
    console.log(lastPath);
    socket.emit("drawing", lastPath);
  }

  return (
    <>
      <ReactSketchCanvas
        id="1"
        style={styles}
        strokeWidth={4}
        strokeColor="black"
        ref={canvasRef}
        onStroke={handleOnStroke}
      />
    </>
  );
};

export default Canvas;
