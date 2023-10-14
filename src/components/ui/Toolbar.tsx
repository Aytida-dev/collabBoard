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

export default function Toolbar() {
  const [toogle, setToogle] = useState(false);
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

      <Button>
        <RxWidth className="text-xl" />
      </Button>
      <Button>
        <BiSolidColorFill className="text-xl" />
      </Button>
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
