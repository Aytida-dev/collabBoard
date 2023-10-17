"use client";

import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import {
  BiPencil,
  BiEraser,
  BiUndo,
  BiRedo,
  BiSave,
  BiImageAdd,
  BiSolidColorFill,
} from "react-icons/bi";
import { MdOutlineClear } from "react-icons/md";
import { RxWidth } from "react-icons/rx";
import { RgbaStringColorPicker } from "react-colorful";
import { LiaToolsSolid } from "react-icons/lia";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { useStore } from "../lib/ZustandStore";
import { useState } from "react";

export default function Toolbar() {
  const {
    canvasRef,
    exportAsImage,
    setStrokeWidth,
    strokeWidth,
    eraserWidth,
    setEraserWidth,
    bgColor,
    setBgColor,
    strokeColor,
    setStrokeColor,
    undo,
    clear,

    setBgImageUrl,
    setEraser,
    eraser,
    bgImageUrl,
    exportSvg,
  } = useStore();

  const [bgImageUrlState, setBgImageUrlState] = useState(bgImageUrl);

  function undoRedoAndClear(type: string) {
    switch (type) {
      case "undo":
        undo(canvasRef);
        break;

      case "clear":
        clear(canvasRef);
        break;
    }
  }

  function handleExportType(type: string) {
    switch (type) {
      case "jpeg":
        exportAsImage(canvasRef, "jpeg");
        break;
      case "png":
        exportAsImage(canvasRef, "png");
        break;
      case "svg":
        exportSvg(canvasRef);
        break;
    }
  }

  function Tools(mobile = false) {
    return (
      <>
        <Toggle
          size={"lg"}
          className="rounded-full"
          onClick={() => setEraser(canvasRef, eraser)}
        >
          {eraser ? (
            <BiEraser className="text-xl" />
          ) : (
            <BiPencil className="text-xl" />
          )}
        </Toggle>

        {/* width slider */}
        <Popover>
          <PopoverTrigger>
            <div className=" w-10 flex justify-center ">
              <RxWidth className="text-xl" />
            </div>
          </PopoverTrigger>
          <PopoverContent side={`${mobile ? "top" : "right"}`}>
            <div className="flex flex-col justify-between items-center gap-10">
              <span>Set width</span>
              <div className="flex justify-between items-center gap-4 w-full">
                <BiPencil className="text-2xl" />
                <Slider
                  max={100}
                  step={1}
                  min={1}
                  value={[strokeWidth]}
                  onValueChange={(value) => setStrokeWidth(value[0])}
                  // onValueCommit={(value) => setStrokeWidth(value[0])}
                />
                <Input
                  className="w-20"
                  type="number"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(e.target.valueAsNumber)}
                />
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <BiEraser className="text-2xl" />
                <Slider
                  max={100}
                  step={1}
                  min={1}
                  value={[eraserWidth]}
                  onValueChange={(value) => setEraserWidth(value[0])}
                  // onValueCommit={() => console.log("commit")} // use for the store
                />
                <Input
                  className="w-20"
                  type="number"
                  value={eraserWidth}
                  onChange={(e) => setEraserWidth(e.target.valueAsNumber)}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* color picker */}
        <Popover>
          <PopoverTrigger>
            <div className=" w-10 flex justify-center">
              <BiSolidColorFill className="text-xl" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            side={`${mobile ? "top" : "right"}`}
            className="w-fit"
          >
            <div className="flex  flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex flex-col gap-4 justify-between items-center">
                <span>Stroke Color</span>
                <RgbaStringColorPicker
                  color={strokeColor}
                  onChange={(color) => setStrokeColor(color)}
                />
                <Input
                  className=""
                  type="text"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-4 justify-between items-center">
                <span>Background Color</span>
                <RgbaStringColorPicker
                  color={bgColor}
                  onChange={(color) => setBgColor(color)}
                />
                <Input
                  className=""
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button variant={"ghost"} onClick={() => undoRedoAndClear("undo")}>
          <BiUndo className="text-xl" />
        </Button>

        <Button variant={"ghost"} onClick={() => undoRedoAndClear("clear")}>
          <MdOutlineClear className="text-xl" />
        </Button>

        <Popover>
          <PopoverTrigger>
            <div className=" w-10 flex justify-center">
              <BiImageAdd className="text-xl" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            side={`${mobile ? "top" : "right"}`}
            className="w-fit"
          >
            <div className="flex flex-col justify-between items-center gap-4">
              <span>Enter Img URL</span>
              <div className="flex justify-between items-center gap-4 w-full">
                <Input
                  type="string"
                  placeholder="image url"
                  value={bgImageUrlState}
                  onChange={(e) => setBgImageUrlState(e.target.value)}
                />
                <Button onClick={() => setBgImageUrl(bgImageUrlState)}>
                  Apply
                </Button>
              </div>
              <span className=" text-blue-500 text-center">
                leave empty, <br />
                If you want to remove the current background image
              </span>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <div className=" w-10 flex justify-center">
              <BiSave className="text-xl" />
            </div>
          </PopoverTrigger>
          <PopoverContent side={`${mobile ? "top" : "right"}`}>
            <div className="flex flex-col justify-between items-center gap-4">
              <Button onClick={() => handleExportType("jpeg")}>
                Export as jpeg
              </Button>
              <Button onClick={() => handleExportType("png")}>
                Export as png
              </Button>
              <Button onClick={() => handleExportType("svg")}>
                Export as SVG
              </Button>
              <Button>Export stroke paths in a file</Button>
            </div>
          </PopoverContent>
        </Popover>
      </>
    );
  }
  return (
    <>
      <div className=" hidden w-16 h-full bg-black my-auto rounded-r-xl md:flex flex-col justify-between items-center py-10 pr-2">
        {Tools()}
      </div>

      {/* mobile view */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <div className="bg-black rounded-full h-10 w-10 flex justify-center items-center absolute bottom-5 right-5">
              <LiaToolsSolid className="text-2xl" />
            </div>
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <div className="flex">{Tools(true)}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
