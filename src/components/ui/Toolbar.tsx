"use client";

import { useState } from "react";
import { Button } from "./button";
import { Toggle } from "./toggle";
import {
  BiPencil,
  BiEraser,
  BiUndo,
  BiSave,
  BiImageAdd,
  BiSolidColorFill,
} from "react-icons/bi";
import { MdOutlineClear } from "react-icons/md";
import { RxWidth } from "react-icons/rx";
import { RgbaStringColorPicker } from "react-colorful";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Slider } from "./slider";
import { Input } from "./input";

export default function Toolbar() {
  const [toogle, setToogle] = useState(false);
  const [penWidth, setPenWidth] = useState(10);
  const [eraserWidth, setEraserWidth] = useState(10);
  const [penColor, setPenColor] = useState("rgba(0,0,0,1)");
  const [bgColor, setBgColor] = useState("rgba(255,255,255,1)");
  return (
    <div className=" w-16 h-5/6 bg-black my-auto rounded-r-xl flex flex-col justify-between items-center py-6 pr-2">
      <Toggle
        variant={"outline"}
        size={"lg"}
        className="rounded-full"
        onClick={() => setToogle((prev) => !prev)}
      >
        {toogle ? (
          <BiPencil className="text-xl" />
        ) : (
          <BiEraser className="text-xl" />
        )}
      </Toggle>

      {/* width slider */}
      <Popover modal={true}>
        <PopoverTrigger>
          <div className=" w-10 flex justify-center">
            <RxWidth className="text-xl" />
          </div>
        </PopoverTrigger>
        <PopoverContent side="right">
          <div className="flex flex-col justify-between items-center gap-10">
            <span>Set width</span>
            <div className="flex justify-between items-center gap-4 w-full">
              <BiPencil className="text-2xl" />
              <Slider
                max={100}
                step={1}
                min={1}
                value={[penWidth]}
                onValueChange={(value) => setPenWidth(value[0])}
                // onValueCommit={() => console.log("commit")} // use for the store
              />
              <Input
                className="w-20"
                type="number"
                value={penWidth}
                onChange={(e) => setPenWidth(e.target.valueAsNumber)}
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
      <Popover modal={true}>
        <PopoverTrigger>
          <div className=" w-10 flex justify-center">
            <BiSolidColorFill className="text-xl" />
          </div>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-fit">
          <div className="flex  justify-between items-center gap-10">
            <div className="flex flex-col gap-4 justify-between items-center">
              <span>Stroke Color</span>
              <RgbaStringColorPicker
                color={penColor}
                onChange={(color) => setPenColor(color)}
              />
              <Input
                className=""
                type="text"
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
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

      <Button>
        <BiUndo className="text-xl" />
      </Button>
      <Button>
        <MdOutlineClear className="text-xl" />
      </Button>
      <Button>
        <BiImageAdd className="text-xl" />
      </Button>
      <Button>
        <BiSave className="text-xl" />
      </Button>
    </div>
  );
}
