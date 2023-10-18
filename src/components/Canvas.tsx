"use client";

import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useStore } from "../lib/ZustandStore";
import { toast } from "sonner";
import { downloadImage } from "@/lib/utils";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const Canvas = () => {
  const {
    socket,
    setJoinedUser,
    setCanvasRef,
    strokeWidth,
    eraserWidth,
    strokeColor,
    bgColor,
    setBgColor,
    bgImageUrl,
    setBgImageUrl,
    eraser,
    saveJpegNumber,
    savePngNumber,
    saveSvgNumber,
    roomId,
    userName,
  } = useStore();

  const canvasRef = useRef<any>(null);

  useEffect(() => {
    toast.success("Room created");
    socket.on("connect", () => console.log("connected"));
    socket.on(
      "received-drawing",
      ({ userName, path }: { userName: string; path: any }) => {
        // console.log(userName , path)
        canvasRef.current.loadPaths([path]);
      }
    );

    socket.on(
      "user-joined",
      ({ userName, id }: { userName: string; id: number }) => {
        setJoinedUser(userName, id);
        console.log("received", userName, id);
      }
    );

    socket.on(
      "undo-or-clear",
      ({ type, userName }: { type: string; userName: string }) => {
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
      }
    );

    socket.on(
      "received-bg-color",
      ({ color, userName }: { color: string; userName: string }) => {
        setBgColor(color, "", "", false);
      }
    );
    socket.on(
      "received-bg-url",
      ({ url, userName }: { url: string; userName: string }) => {
        setBgImageUrl(url, "", "", false);
      }
    );

    function dcSocket() {
      socket.off("received-drawing");
      socket.off("undo-or-clear");
      socket.disconnect();
    }

    return () => {
      // dcSocket();
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

      toast.success("copied SVG to clipboard");

      return;
    }

    const img = await canvasRef.current.exportImage(type);
    try {
      downloadImage(img, fileName);
      toast.success("downloading");
    } catch (err) {
      toast.error("download failed");
    }
  }

  function handleOnStroke(currentPath: any) {
    if (currentPath.length === 0) return;

    //create an deep copy of currentpath as shallow one was giving erroes
    const lastPath = JSON.parse(JSON.stringify(currentPath));

    socket.emit("drawing", {
      roomId: roomId,
      userName: userName,
      path: lastPath,
    });
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
