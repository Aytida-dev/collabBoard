"use client";
import { useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const Sketch = ({ socket }: any) => {
  const canvasRef = useRef<any>(null);

  //   useEffect(() => {
  //     socket.on("received-drawing", (paths: any) => {
  //       canvasRef.current.loadPaths([paths]);
  //     });

  //     return () => {
  //       socket.off("received-drawing");
  //     };
  //   }, []);

  function handleOnStroke(currentPath: any) {
    console.log(currentPath);
    if (currentPath.length === 0) return;

    //create an deep copy of currentpath as shallow one was giving erroes
    const lastPath = JSON.parse(JSON.stringify(currentPath));

    // socket.emit("drawing", lastPath);
  }

  return (
    <>
      <ReactSketchCanvas
        id="1"
        style={styles}
        width="600"
        height="600"
        strokeWidth={4}
        strokeColor="black"
        ref={canvasRef}
        onStroke={handleOnStroke}
      />
    </>
  );
};

export default Sketch;
