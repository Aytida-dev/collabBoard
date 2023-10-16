"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { users } from "../lib/testData";
import { getAnnotionsByName } from "@/lib/utils";
export default function Navbar() {
  return (
    <div className=" h-16 m-auto bg-black flex md:w-10/12 justify-between items-center px-6 md:rounded-xl md:mt-4 ">
      <div className="logo">logo</div>
      {/* mobile view */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <RxHamburgerMenu />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col justify-between h-full">
              <SheetHeader>
                <div className="flex justify-between items-center">
                  <Button>
                    <AiOutlineUserAdd />
                  </Button>
                  <Badge variant={"secondary"}>
                    <span>12323em23ioj29342</span>
                    <BiCopy className=" opacity-70 mx-3" />
                  </Badge>
                </div>
              </SheetHeader>
              <SheetDescription>
                <div className="grid grid-cols-3 gap-9">
                  {users.map(({ name, img, id, color }) => (
                    <div
                      key={id}
                      className={`w-11 border-2 rounded-full`}
                      style={{
                        borderColor: color,
                      }}
                    >
                      <Avatar>
                        <AvatarImage src={img} className="rounded-full" />
                        <AvatarFallback className="rounded-full h-9">
                          {getAnnotionsByName(name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
              </SheetDescription>

              <SheetFooter>
                <div className="flex justify-between items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button variant={"destructive"}>leave Room</Button>
                </div>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className=" hidden md:flex justify-between items-center gap-5">
        <div className="room" onClick={() => console.log("hii")}>
          <Badge variant={"secondary"}>
            <span>12323em23ioj29342</span>
            <BiCopy className=" opacity-70 mx-3" />
          </Badge>
        </div>

        <Button>
          <AiOutlineUserAdd />
        </Button>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
